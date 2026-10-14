import { createInterface } from "node:readline";
import { hashPassword } from "../src/lib/password";

// Reads the password from a hidden prompt so it never lands in shell history.
async function readHidden(prompt: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  const write = (rl as unknown as { _writeToOutput: (text: string) => void });
  write._writeToOutput = () => {};
  process.stdout.write(prompt);
  return new Promise((resolve) =>
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    }),
  );
}

async function main() {
  const password = await readHidden("New owner password (min 12 characters): ");
  if (password.length < 12) throw new Error("Use at least 12 characters");
  const again = await readHidden("Repeat password: ");
  if (password !== again) throw new Error("Passwords do not match");
  console.info(`\nOWNER_PASSWORD_HASH=${await hashPassword(password)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
