import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const aliases: Record<string, string> = {
  groq_api_key: "GROQ_API_KEY",
  groq_model: "GROQ_MODEL",
};

for (const name of [".env.local", ".env"]) {
  const path = resolve(name);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const rawKey = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    const key = aliases[rawKey.toLowerCase()] ?? rawKey;
    if (key && value && process.env[key] === undefined) process.env[key] = value;
  }
}
