interface ControlMessage {
  text: string;
  number: number;
}

/**
 * Process the control message.
 */
function processMessage(message: ControlMessage): void {
  console.log(`Accepted Control message, Text: ${message.text}, Number: ${message.number}`);
}

const port = 3060;
const hostname = "localhost";
console.log(`Server is started at http://${hostname}:${port}`);

/**
 * Bun's built-in HTTP server (no external dependencies).
 * Start with: bun main.bun.ts
 */
Bun.serve({
  port,
  hostname,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/admin" && req.method === "POST") {
      const params = new URLSearchParams(await req.text());
      const text = params.get("text");
      const numberStr = params.get("number");
      const number = Number(numberStr);

      if (!text || !numberStr || isNaN(number)) {
        return new Response("Bad Request", { status: 400 });
      }

      const message: ControlMessage = { text, number };
      processMessage(message);
      return new Response(
        `OK, Accepted Control message, Text: ${text}, Number: ${number}`,
        { status: 200 },
      );
    }

    return new Response(`OK: It's a GET method or url not in "/admin"`, { status: 200 });
  },
});
