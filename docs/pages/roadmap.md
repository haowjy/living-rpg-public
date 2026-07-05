# Roadmap

Two versions. Same agent backend. V0 proves the engine in a terminal. V1 gives it a visual body with turn-based RPG combat.

## Two Versions

### V0 -- Agent Prototype

A set of agents and skills running on open agent runtimes / meridian-prompter, backed by a small deterministic tool layer. The creative layer is prompt architecture and agents; canonical state changes, validation, indexing, and replayable logs belong to tools.

The player types free text. The LLM interprets intent, narrates outcomes, and calls tools to mutate world state. Narrative DM mode — think a tabletop GM with inspectable files, validated state changes, and a world clock behind the screen.

V0 proves the core thesis: the agent loop, persistent world state, local story pressure, NPC knowledge boundaries, technique proficiency, and technique evolution. If it works in a terminal, the architecture is sound.

### V1 -- Visual Turn-Based RPG

Tile-based exploration with turn-based party combat, technique lists, position and status rules, chunk-based procedural generation, and anime-inspired pixel art. The same agent backend powers the world — the visual client is a rendering and input layer over the same files, tools, and agent loop that V0 uses.

Darkest Dungeon is the closest combat reference: readable turns, party state, stress, injuries, ranks, marks, status effects, and named abilities with clear tactical consequences. The LLM adds context and consequences around the deterministic combat layer; it does not replace the rules.

## V0 Vertical Slice

The vertical slice is the minimum playable proof: one starting region, enough NPCs for emergent story, enough tools for meaningful state mutation.

### Agent Stack

| Component | Description |
|---|---|
| Game Director agent | Main loop -- reads world state, observes pressure, dispatches to other agents |
| Narrator agent | Generates prose from world state and player actions |
| Validator agent | Consistency checking -- rejects contradictions before they enter state |
| NPC agents | Named characters acting from their own knowledge and goals |
| World state files | Structured directory of prose and data |
| Tool layer | Deterministic mutation, validation, projections, and index rebuilds |

### Tools

```text
move_character(character_id, destination_area)
write_event(event)
change_relationship(source_id, target_id, delta, reason)
spread_rumor(rumor_id, from_area, to_area)
claim_site(faction_id, area_id)
create_quest_thread(quest)
record_training(technique_id, context)
evolve_technique(proposal)
attempt_breakthrough(shrine_id)
```

The first implementation target is deliberately concrete: event schemas, knowledge boundaries, rumor provenance, pressure scoring, technique proficiency, evolution budgets, and shrine breakthroughs must all be inspectable in state files.

### Starting Content

The first slice should use a small, authored starting region rather than anchoring the whole design around a generic named town. It needs:

- one safe hub
- several connected roads and wilderness sites
- one shrine or statue for breakthrough testing
- one manual or teacher that grants a basic technique
- 5 named NPC agents with goals, memory, relationships, and autonomous action
- 3-5 factions or social groups with conflicting pressures

The exact names should be authored deliberately later. Placeholder names are fine in tests, but the public pitch should not depend on generic LLM-generated setting names.

### Success Criteria

After 30-60 minutes of play, the player can tell a specific story that only happened because of their choices. Not a generic adventure — a particular sequence of events with causes they can trace.

- NPCs remember what the player did and act only on what they know
- Rumors spread between areas and change NPC behavior
- Quests branch based on prior events, not scripted flags
- Factions gain or lose control of sites based on player and NPC actions
- The player learns at least one technique and gains proficiency by using or training it
- At mastery, the player can evolve a technique using a chosen reference and their history
- A shrine breakthrough can change the player's base path or future evolution rules

If the event log explains the whole story without hidden state, V0 works.

## V1 Additions

Everything in V0, plus a visual client and deterministic combat rules.

| Addition | Detail |
|---|---|
| 2.5D tile-based exploration | 32x32 tiles, three-quarter perspective |
| Turn-based party combat | Position, turn order, techniques, stress/injury/status, target rules |
| Technique list and evolution UI | Learned forms, proficiency, mastery, evolution references |
| Shrine breakthrough UI | Path, element, vows, bonuses, weirdness ceiling |
| Chunk-based procedural generation | Prefab templates assembled by biome, elevation, and faction control |
| Visual NPC interaction | Dialogue boxes, character sprites, expression shifts driven by relationship state |
| Parallax backgrounds | Painted distant terrain behind the tile grid -- mountains, sky, clouds |

## Built On

Two existing open-source projects provide the foundation.

**creative-writing-skills** -- The agent architecture pattern. The game engine is a creative-writing system where the story is interactive. Muse maps to Game Director. Writer maps to Narrator. Critic maps to Validator. Character-sim maps to NPC agents. The mapping is not a metaphor -- it is the same pattern running in a different mode.

**meridian-prompter** -- The agent/skill packaging system. V0 ships as a meridian package. The same agent definitions work across backends. Meridian handles session management, tool registration, and agent dispatch. The game does not build its own runtime first.

## How to Follow

The project is open source: **github.com/haowjy/living-rpg**

Contributions welcome -- especially around agent architecture, world state design, tool validation, and visual-client integration.

## Further Reading

- [Home](#home) -- project overview
- [Game Vision](#game-vision) -- world, era model, combat, progression
- [Technique Mastery](#technique-mastery) -- learn, practice, evolve, and break through
- [World Generation](#world-generation) -- chunk-based procedural generation