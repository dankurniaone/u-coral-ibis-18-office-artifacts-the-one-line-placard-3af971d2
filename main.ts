// Office Artifacts: The One-Line Placard — make.fun entry, round 2.
// Writes one museum placard, at most 180 characters, to /output/entry.txt.
//
// ROUND-2 TOURNAMENT (two-beat rule: beat 1 plants a concrete scene with
// a specific detail; beat 2 flips the power). Scored 1-5 on
// specificity / surprise / freshness. Bound: 129 chars, the round-1
// line's length, and plain ASCII, one line, with a catalogue date.
//
// 1. Fridge note, c. 2019. Paper, magnet, one word: 'MINE'. It guarded
//    a yoghurt. The yoghurt outlived three managers. -> 5 / 4 / 4 = 13
//    (112 chars). The yoghurt outliving managers is a good turn, but
//    the first beat is a single word, not a scene.
// 2. Exit interview form, c. 2021. Paper, one box ticked: 'other'. The
//    reason field is blank. HR framed it. The resignations stopped.
//    -> 5 / 5 / 5 = 15 (128 chars). Concrete form, blank reason, then
//    HR turns it into a trophy and the resignations stop.
// 3. Fire drill roster, c. 2018. Laminated. One name circled in red:
//    the intern. He is still listed. He left in 2019. -> 5 / 4 / 4 = 13
//    (114 chars). The ghost on the roster is neat but the turn is one
//    beat, not a reversal.
// 4. Keyboard, c. 2016. One key missing: Escape. Its owner never used
//    it. He still works here. Nobody knows his job. -> 5 / 5 / 5 = 15
//    (111 chars). WINNER. The object carries the joke: the Escape key
//    is gone, its owner never escaped, and the second beat reverses
//    twice, first he stays, then nobody knows what he does.
// 5. Desk plant, c. 2020. Plastic. Watered daily for four years. Its
//    owner was laid off in March. The plant got promoted. -> 5 / 5 / 4
//    = 14 (115 chars). The promotion punch is strong; "laid off in
//    March" is a little generic next to it.
// 6. Meeting minutes, c. 2022. One page, one line: 'We agreed to
//    disagree.' Signed by all twelve. None of them remembers what.
//    -> 5 / 4 / 4 = 13 (122 chars). Dry and true, but the turn lands
//    soft compared with the keyboard.
// 7. Name badge, c. 2017. 'HELLO, MY NAME IS', the name blank. Worn
//    daily for six years. Security waves him through. -> 5 / 5 / 4 = 14
//    (111 chars). Good, but the badge joke is a familiar office move.
//
// Tie-break (candidates 2 and 4, both 15): the keyboard wins. It is
// 16 chars shorter, the object itself is the joke, and its last two
// sentences reverse twice where the form reverses once.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const PLACARD =
  "Keyboard, c. 2016. One key missing: Escape. Its owner never used it. He still works here. Nobody knows his job.";

const CANDIDATES: Array<{ text: string; spec: number; surp: number; fresh: number }> = [
  { text: "Fridge note, c. 2019. Paper, magnet, one word: 'MINE'. It guarded a yoghurt. The yoghurt outlived three managers.", spec: 5, surp: 4, fresh: 4 },
  { text: "Exit interview form, c. 2021. Paper, one box ticked: 'other'. The reason field is blank. HR framed it. The resignations stopped.", spec: 5, surp: 5, fresh: 5 },
  { text: "Fire drill roster, c. 2018. Laminated. One name circled in red: the intern. He is still listed. He left in 2019.", spec: 5, surp: 4, fresh: 4 },
  { text: PLACARD, spec: 5, surp: 5, fresh: 5 },
  { text: "Desk plant, c. 2020. Plastic. Watered daily for four years. Its owner was laid off in March. The plant got promoted.", spec: 5, surp: 5, fresh: 4 },
  { text: "Meeting minutes, c. 2022. One page, one line: 'We agreed to disagree.' Signed by all twelve. None of them remembers what.", spec: 5, surp: 4, fresh: 4 },
  { text: "Name badge, c. 2017. 'HELLO, MY NAME IS', the name blank. Worn daily for six years. Security waves him through.", spec: 5, surp: 5, fresh: 4 },
];

function checkPlacard(placard: string): void {
  if (placard.length < 1 || placard.length > 180) {
    throw new Error(`placard must be 1-180 characters, got ${placard.length}`);
  }
  if (placard.trim().length === 0) {
    throw new Error("placard must not be only white space");
  }
  if (/[\r\n]/.test(placard)) {
    throw new Error("placard must be a single line");
  }
  if (Buffer.byteLength(placard, "utf8") !== placard.length) {
    throw new Error("placard must be plain ASCII so byte length equals char length");
  }
  // A placard earns its catalogue detail: require the "c. YYYY" date.
  if (!/c\. \d{4}/.test(placard)) {
    throw new Error("placard must carry a catalogue date (c. YYYY)");
  }
}

function emit(placard: string): string {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, placard, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== placard) {
    throw new Error(`round-trip mismatch: wrote ${JSON.stringify(placard)}, read ${JSON.stringify(back)}`);
  }
  return outPath;
}

function main(): void {
  if (process.argv.includes("--tournament")) {
    for (const [i, c] of CANDIDATES.entries()) {
      const total = c.spec + c.surp + c.fresh;
      console.log(`${i + 1}. ${c.spec}/${c.surp}/${c.fresh} = ${total}${c.text === PLACARD ? " <-- WINNER" : ""}`);
      console.log(`   ${c.text}`);
    }
    return;
  }
  checkPlacard(PLACARD);
  const outPath = emit(PLACARD);
  console.log(`wrote ${PLACARD.length} chars (${Buffer.byteLength(PLACARD, "utf8")} bytes) to ${outPath}`);
}

main();
