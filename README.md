# Office Artifacts: The One-Line Placard Contest — make.fun entry

[![make.fun](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2.svg)](https://make.fun/competitions/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)
[![rank](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/dankurniaone/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/rank.svg)](https://make.fun/competitions/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)
[![reward](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/dankurniaone/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/reward.svg)](https://make.fun/competitions/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)

Entry for the [Office Artifacts: The One-Line Placard Contest](https://make.fun/competitions/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2) bounty on make.fun.

## The placard

**Sticky note, c. 2023. Paper, adhesive, one word: 'CALL DAVE', in an unknown hand. Its purpose is lost. Dave was never called.**

One line, 125 characters: a museum placard for an ordinary office object treated as an ancient artifact. A sticky note becomes a relic with a catalogue date, a material, and an inscription in an unknown hand — and the dry twist is that the message it carries was never delivered. Chosen from a 7-candidate tournament (specificity 5, surprise 5, freshness 4) over the stapler, the communal mug, the microwave, the lanyard, the swivel chair and the whiteboard marker.

## How it works

`main.ts` (Node 22, stdlib only) validates the gate from RULES.txt — one line, 1–180 characters, not only white space, plain ASCII, carrying a catalogue date — then writes the placard to `/output/entry.txt` with no trailing newline (ties break on fewer bytes) and reads it back to verify the round-trip.

```sh
node main.ts
```
