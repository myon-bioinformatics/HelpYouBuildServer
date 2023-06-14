import { serve } from "https://deno.land/std/http/server.ts";

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
 * Start the server and listen for incoming requests.
 */
const port = 3030;
const hostname = "localhost";
console.log(`Server is started at http://${hostname}:${port}`);

async function handleRequest(request: Request): Promise<Response> {
  const params = new URLSearchParams(await request.text());
  const text = params.get("text");
  const number = Number(params.get("number"));

  if (!text || isNaN(number)) {
    // Invalid request: missing text or number
    return new Response(`Bad Request`, { status: 400 });
  }

  if (request.url.indexOf("/admin") > -1 && request.method === "POST") {
    // Process valid control message
    const message: ControlMessage = { text, number };
    processMessage(message);
    return new Response(`OK, Accepted Control message, Text: ${text}, Number: ${number}`, { status: 200 });
  }

  // Requested route not found
  return new Response(`Not Found`, { status: 404 });
}

serve((_req) => handleRequest(_req), { port, hostname });
