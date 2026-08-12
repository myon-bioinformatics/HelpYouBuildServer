interface ControlMessage {
  text: string;
  number: number;
}

/**
 * Process the control message.
 * Output the accepted control message to the console.
 */
function processMessage(message: ControlMessage): void {
  console.log(`Accepted Control message, Text: ${message.text}, Number: ${message.number}`);
}

/**
 * Handle an incoming HTTP request.
 */
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/admin" && request.method === "POST") {
    const params = new URLSearchParams(await request.text());
    const text = params.get("text");
    const numberStr = params.get("number");
    const number = Number(numberStr);

    if (!text || !numberStr || isNaN(number)) {
      // Invalid request: missing text or number
      return new Response("Bad Request", { status: 400 });
    }

    // Process valid control message
    const message: ControlMessage = { text, number };
    processMessage(message);
    return new Response(
      `OK, Accepted Control message, Text: ${text}, Number: ${number}`,
      { status: 200 },
    );
  }

  // Respond to GET or any other path
  return new Response(`OK: It's a GET method or url not in "/admin"`, { status: 200 });
}

/**
 * Start the server and listen for incoming requests.
 * Deno.serve is the recommended API since Deno v1.35 / v2.x.
 */
const port = 3030;
const hostname = "localhost";
console.log(`Server is started at http://${hostname}:${port}`);

Deno.serve({ port, hostname }, handleRequest);
