// The Production Database Apology — make.fun entry.
// Writes the one-line apology to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 200 characters, not only
// whitespace, so validate the line before writing it.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I deleted the production database, but on the bright side, the backups and I now have a great story for the postmortem.";

const MAX_CHARS = 200;

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`Entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Entry (${ENTRY.length} chars): ${ENTRY}`);
console.log("Wrote /output/entry.txt");
