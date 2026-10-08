import { createServer } from "node:http";
import { answerQuestion } from "./profile-chat.ts";

const port = 43127;

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders()).end();
    return;
  }

  if (request.method !== "POST" || request.url?.split("?")[0] !== "/api/chat") {
    response.writeHead(404, corsHeaders()).end();
    return;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(chunk as Buffer);

  let input: unknown = null;
  try {
    input = JSON.parse(Buffer.concat(chunks).toString("utf8") || "null");
  } catch {
    input = null;
  }

  const result = await answerQuestion(input, request.socket.remoteAddress || "local");
  response.writeHead(result.status, {
    ...corsHeaders(),
    "content-type": "application/json",
  });
  response.end(JSON.stringify(result.body));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Profile chat listening on http://127.0.0.1:${port}/api/chat`);
});

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}
