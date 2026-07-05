# Living Story Sandbox RPG

A fantasy sandbox RPG where the entire game engine is an LLM agent loop over a file system. No scripted quests, no dialogue trees. The LLM reads world state from files, narrates, calls tools to mutate state, and loops.

**[Read the full proposal →](https://haowjy.github.io/living-rpg-public/)**

## Key ideas

- **Agent-loop-over-files** — no rigid pipeline, the LLM is the engine
- **Insight spellcraft** — players make spells from the story they lived
- **Chunk-based worldgen** — Minecraft-style generation with LLM semantic enrichment
- **V0** = agents + skills with a deterministic tool layer (terminal play) → **V1** = 2.5D Godot game

## Related repos

- [living-rpg-game](https://github.com/haowjy/living-rpg-game) — game engine, design docs, V0 agent code
- [creative-writing-skills](https://github.com/haowjy/creative-writing-skills) — Claude Code plugin for fiction writing
- [meridian-prompter](https://github.com/haowjy/meridian-prompter) — prompt engineering toolkit
