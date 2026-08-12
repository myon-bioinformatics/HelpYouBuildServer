import { createServer } from "node:http";

/**
 * ControlMessage helper
 * @param {string} text
 * @param {number} number
 */
function processMessage(text, number) {
  console.log(`Accepted Control message, Text: ${text}, Number: ${number}`);
}

const PORT = 3050;
const HOSTNAME = "localhost";
console.log(`Server is started at http://${HOSTNAME}:${PORT}`);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOSTNAME}:${PORT}`);

  if (url.pathname === "/admin" && req.method === "POST") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString();
    const params = new URLSearchParams(body);
    const text = params.get("text");
    const numberStr = params.get("number");
    const number = Number(numberStr);

    if (!text || !numberStr || isNaN(number)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    processMessage(text, number);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`OK, Accepted Control message, Text: ${text}, Number: ${number}`);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`OK: It's a GET method or url not in "/admin"`);
});

server.listen(PORT, HOSTNAME);
