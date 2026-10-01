import { spawn } from "node:child_process";
import { cpSync, existsSync } from "node:fs";

if (!existsSync(".next/standalone/server.js")) {
  console.error("Production build missing. Run pnpm build before browser or Lighthouse checks.");
  process.exit(1);
}
// Next.js standalone output requires these static assets alongside its server.
cpSync("public", ".next/standalone/public", { recursive: true });
cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
const server = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: {
    ...process.env,
    HOSTNAME: "127.0.0.1",
    PORT: process.argv[2] ?? "3100",
    RESEND_API_KEY: "",
    TURNSTILE_SECRET_KEY: "",
    CONTACT_TO_EMAIL: "",
    CONTACT_FROM_EMAIL: "",
  },
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.kill(signal));
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.on("exit", (code, signal) => {
  process.exitCode = signal ? 0 : (code ?? 1);
});
