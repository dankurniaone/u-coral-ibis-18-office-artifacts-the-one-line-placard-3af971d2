// Office Artifacts: The One-Line Placard Contest — make.fun entry
// Writes one museum placard, at most 180 characters, to /output/entry.txt.
//
// ONE-LINER CANDIDATE TOURNAMENT (ATM: judge brief in RULES.txt — a dry
// curator picks the more inventive, funnier placard; catalogue details sell
// the joke; every word must earn its place). Scored 1-5 on
// specificity / surprise / freshness:
//
// 1. Stapler, c. 1994. Iron and regret. Used in binding ceremonies, one
//    staple per grievance. Donated by Accounts, who kept the receipt.
//    -> 4 / 4 / 3 = 11. Strong, but the stapler is the first object
//    everyone reaches for.
// 2. Communal mug, glazed ceramic, c. 2011. Inscribed 'WORLD'S OKAYEST
//    BOSS' in a dead dialect. Handle cracked during the Great Restructure.
//    Do not wash. -> 4 / 3 / 2 = 9. "World's okayest boss" is a flooded
//    mug joke; the field will be full of it.
// 3. Microwave, c. 2008. Ritual heating vessel. Interior scorched by the
//    Fish Incident, after which its use was restricted to popcorn only.
//    Donor anonymous. -> 5 / 4 / 4 = 13. Specific and dry; the Fish
//    Incident is a real office memory.
// 4. Lanyard, woven nylon, c. 2019. Worn at the throat to ward off
//    strangers; its plastic clip denotes rank. Recovered from the drawer
//    of the departed. -> 4 / 3 / 4 = 11. Neat, but the turn is mild.
// 5. Sticky note, c. 2023. Paper, adhesive, one word: 'CALL DAVE', in an
//    unknown hand. Its purpose is lost. Dave was never called.
//    -> 5 / 5 / 4 = 14. WINNER. A concrete inscription, a turn nobody
//    sees coming, and deadpan to the last word: the artifact is a
//    message that was never delivered.
// 6. Swivel chair, c. 2015. Throne of the middle manager. One wheel
//    removed, deliberately, so no occupant could ever fully relax. On
//    loan from Facilities. -> 4 / 4 / 3 = 11. Good, but "throne of the
//    middle manager" is a familiar move.
// 7. Whiteboard marker, dried ink, c. 2020. Ceremonial stylus, used once
//    to write 'SYNERGY' before the tribe abandoned the practice. Cap
//    lost to time. -> 3 / 3 / 2 = 8. Synergy jokes are flooded.
//
// Winner: candidate 5. The placard below is it, word for word.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const PLACARD =
  "Sticky note, c. 2023. Paper, adhesive, one word: 'CALL DAVE', in an unknown hand. Its purpose is lost. Dave was never called.";

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 180
// characters, not only white space. The judge brief adds: one line, a
// museum placard for an ordinary office object treated as an ancient
// artifact, catalogue details included.
function validate(placard: string): void {
  if (placard.length < 1 || placard.length > 180) {
    throw new Error(`placard must be 1-180 characters, got ${placard.length}`);
  }
  if (placard.trim().length === 0) {
    throw new Error("placard must not be only white space");
  }
  if (placard.includes("\n") || placard.includes("\r")) {
    throw new Error("placard must be a single line");
  }
  if (Buffer.byteLength(placard, "utf8") !== placard.length) {
    throw new Error("placard must be plain ASCII so byte length equals char length");
  }
  // Label craft is a judged criterion (RULES.txt #5): a placard earns its
  // catalogue detail. Require the "c. YYYY" date the winning line carries,
  // so a future edit cannot silently drop the dating.
  if (!/c\. \d{4}/.test(placard)) {
    throw new Error("placard must carry a catalogue date (c. YYYY)");
  }
}

function main(): void {
  validate(PLACARD);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, PLACARD, "utf8");

  // Read back and verify the round-trip: exactly the placard, no trailing
  // newline (ties break on fewer bytes, so every byte counts).
  const back = readFileSync(outPath, "utf8");
  if (back !== PLACARD) {
    throw new Error(`round-trip mismatch: wrote ${JSON.stringify(PLACARD)}, read ${JSON.stringify(back)}`);
  }
  console.log(`wrote ${PLACARD.length} chars (${Buffer.byteLength(PLACARD, "utf8")} bytes) to ${outPath}`);
}

main();
