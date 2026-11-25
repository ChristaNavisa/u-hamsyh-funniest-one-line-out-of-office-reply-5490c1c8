import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Ficus Has Seniority — one-line out-of-office reply (80 chars).
// Gate: /output/entry.txt must be UTF-8, 1-160 chars, one line, no trailing newline.
const ENTRY =
  "Out of office. Please direct all emergencies to the ficus, it has seniority now.";

// Count code points (not UTF-16 units) so every character counts once,
// and enforce the 1-160 char gate from RULES.txt before writing anything.
const length = [...ENTRY].length;
if (length < 1 || length > 160) {
  throw new Error(`entry is ${length} chars, gate needs 1-160`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
