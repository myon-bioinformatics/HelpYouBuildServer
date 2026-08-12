//! Simple HTTP server in Rust using only the standard library.
//! Start with: cargo run   (from the rust/ directory)

use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

const HOST: &str = "127.0.0.1";
const PORT: u16 = 3090;

struct ControlMessage {
    text: String,
    number: u64,
}

fn process_message(msg: &ControlMessage) {
    println!(
        "Accepted Control message, Text: {}, Number: {}",
        msg.text, msg.number
    );
}

/// Decode a URL-encoded form body (key=value&key2=value2).
fn parse_form(body: &str) -> std::collections::HashMap<String, String> {
    let mut map = std::collections::HashMap::new();
    for pair in body.split('&') {
        let mut parts = pair.splitn(2, '=');
        if let (Some(k), Some(v)) = (parts.next(), parts.next()) {
            let key = urlencoding_decode(k);
            let val = urlencoding_decode(v);
            map.insert(key, val);
        }
    }
    map
}

/// Minimal URL percent-decode (replaces '+' with space and decodes %XX).
fn urlencoding_decode(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    let mut chars = s.chars().peekable();
    while let Some(c) = chars.next() {
        match c {
            '+' => out.push(' '),
            '%' => {
                let h1 = chars.next().and_then(|c| c.to_digit(16));
                let h2 = chars.next().and_then(|c| c.to_digit(16));
                if let (Some(a), Some(b)) = (h1, h2) {
                    if let Some(decoded) = char::from_u32(a * 16 + b) {
                        out.push(decoded);
                    }
                    // Skip invalid percent-encoded sequences silently
                }
            }
            _ => out.push(c),
        }
    }
    out
}

fn send_response(stream: &mut TcpStream, status: u16, body: &str) {
    let reason = if status == 200 { "OK" } else { "Bad Request" };
    let response = format!(
        "HTTP/1.1 {} {}\r\nContent-Type: text/plain\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        status,
        reason,
        body.len(),
        body
    );
    let _ = stream.write_all(response.as_bytes());
}

fn handle_client(mut stream: TcpStream) {
    let mut reader = BufReader::new(stream.try_clone().expect("clone failed"));

    // Read request line
    let mut request_line = String::new();
    reader.read_line(&mut request_line).unwrap_or(0);
    let parts: Vec<&str> = request_line.trim().splitn(3, ' ').collect();
    if parts.len() < 2 {
        return;
    }
    let method = parts[0];
    let path = parts[1];

    // Read headers
    let mut content_length: usize = 0;
    loop {
        let mut line = String::new();
        reader.read_line(&mut line).unwrap_or(0);
        let line = line.trim();
        if line.is_empty() {
            break;
        }
        if line.to_lowercase().starts_with("content-length:") {
            content_length = line
                .splitn(2, ':')
                .nth(1)
                .and_then(|v| v.trim().parse().ok())
                .unwrap_or(0);
        }
    }

    // Read body (cap at 1 MB to prevent large allocation attacks)
    const MAX_BODY: usize = 1024 * 1024;
    if content_length > MAX_BODY {
        send_response(&mut stream, 400, "Bad Request: body too large");
        return;
    }
    let mut body = vec![0u8; content_length];
    if content_length > 0 {
        use std::io::Read;
        reader.read_exact(&mut body).unwrap_or(());
    }
    let body = String::from_utf8_lossy(&body).to_string();

    if path == "/admin" && method == "POST" {
        let params = parse_form(&body);
        let text = params.get("text").cloned();
        let number: Option<u64> = params.get("number").and_then(|n| n.parse().ok());

        match (text, number) {
            (Some(t), Some(n)) => {
                let msg = ControlMessage { text: t, number: n };
                process_message(&msg);
                let resp = format!(
                    "OK, Accepted Control message, Text: {}, Number: {}",
                    msg.text, msg.number
                );
                send_response(&mut stream, 200, &resp);
            }
            _ => {
                send_response(&mut stream, 400, "Bad Request");
            }
        }
    } else {
        send_response(
            &mut stream,
            200,
            r#"OK: It's a GET method or url not in "/admin""#,
        );
    }
}

fn main() {
    let addr = format!("{}:{}", HOST, PORT);
    let listener = TcpListener::bind(&addr).expect("Failed to bind port");
    println!("Server is started at http://localhost:{}", PORT);

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(|| handle_client(stream));
            }
            Err(e) => eprintln!("Connection error: {}", e),
        }
    }
}
