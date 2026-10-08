import { answerQuestion } from "../../server/profile-chat.ts";

const chat = async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let input: unknown = null;
  try {
    input = await request.json();
  } catch {
    input = null;
  }

  const ip = request.headers.get("x-nf-client-connection-ip") || "netlify";
  const result = await answerQuestion(input, ip);
  return Response.json(result.body, { status: result.status });
};

export default chat;

export const config = {
  path: "/api/chat",
};
