# Roadmap

Two versions. Same agent backend. V0 proves the engine in a terminal. V1 gives it a body in Godot.

## Two Versions

### V0 -- Agent Prototype

A set of agents and skills running on [opencode](https://github.com/sst/opencode) / [meridian-prompter](https://github.com/haowjy/meridian-prompter). No custom code -- the entire game is prompt architecture, tool definitions, and structured world state files.

The player types free text. The LLM interprets intent, narrates outcomes, and calls tools to mutate world state. Narrative DM mode -- think a tabletop GM that never forgets, never contradicts itself, and runs a living world behind the screen.

V0 proves the core thesis: the agent loop, the story systems, insight spellcraft, persistent world state, and NPC autonomy. If it works in a terminal, the architecture is sound.

### V1 -- Full 2.5D Game (Godot)

Tile-based game with real-time action combat, technique hotbar, chunk-based procedural generation, and anime-inspired pixel art. The same agent backend powers the world -- the Godot client is a rendering and input layer over the same files, tools, and agent loop that V0 uses.

The text prototype proves the engine. The Godot client gives it a body.

## V0 Vertical Slice

The vertical slice is the minimum playable proof: one starting area, enough NPCs for emergent story, enough tools for meaningful state mutation.

### Agent Stack

| Component | Description |
|---|---|
| Game Director agent | Main loop -- reads world state, observes pressure, dispatches to other agents |
| Narrator agent | Generates prose from world state and player actions |
| Validator agent | Consistency checking -- rejects contradictions before they enter state |
| NPC agents | One agent per named character, acting from their own knowledge and goals |
| World state files | Structured directory of prose and data (see [How It Works](#how-it-works)) |

### Tools

```
move_character(character_id, destination_area)
write_event(event)
change_relationship(source_id, target_id, delta, reason)
spread_rumor(rumor_id, from_area, to_area)
claim_site(faction_id, area_id)
create_quest_thread(quest)
```

### Starting Content

**Area:** Greyford and 6-8 connected sites -- North Mill, Red Sash Camp, Abandoned Shrine, Ruined Watchtower, Church Hospital, and outlying farms and crossroads.

**NPCs:** 5 named NPC agents, each with goals, memory, relationships, and autonomous action:

| NPC | Role | Faction |
|---|---|---|
| Mara | Guild clerk, information broker | Adventurers' Guild |
| Tomas | Ambitious rival, reputation-conscious | Adventurers' Guild |
| Sister Elian | Church healer, relic-seeker | Church of the Seal |
| Captain Harren | Lordship guard, stretched thin | Vael Lordship |
| Dusk | Bandit scout, pragmatic survivor | Red Sashes |

**Factions:** Vael Lordship, Church of the Seal, Adventurers' Guild, Red Sash Bandits, Greyford Villagers. Each faction has control over sites, relationships with other factions, and pressure that escalates independently.

### Success Criteria

After 30-60 minutes of play, the player can tell a specific story that only happened because of their choices. Not a generic adventure -- a particular sequence of events with causes they can trace.

- NPCs remember what the player did and act on it
- Rumors spread between areas and change NPC behavior
- Quests branch based on prior events, not scripted flags
- Factions gain or lose control of sites based on player and NPC actions
- The player's choices have produced consequences they did not explicitly choose

If the player says "I rescued the miller's son, spared a bandit, and now the Church is warning me about the lordship" -- and every beat of that is traceable through the event log -- V0 works.

## V1 Additions

Everything in V0, plus a visual client. The agent backend does not change -- V1 adds a rendering and input layer.

| Addition | Detail |
|---|---|
| 2.5D tile-based rendering | 32x32 tiles, three-quarter perspective. Visual reference: CrossCode, Eastward |
| Real-time action combat | Direct movement and attack input (WASD + mouse). LLM perturbs fights in the background |
| 4-slot technique hotbar | Techniques from [insight spellcraft](#insight-spellcraft) fire in real time -- dashes, strikes, area effects |
| Chunk-based procedural generation | Prefab templates assembled by biome, elevation, and faction control (see [World Generation](#world-generation)) |
| Visual NPC interaction | Dialogue boxes, character sprites, expression shifts driven by relationship state |
| Parallax backgrounds | Painted distant terrain behind the tile grid -- mountains, sky, clouds |

## Built On

Two existing open-source projects provide the foundation.

**[creative-writing-skills](https://github.com/haowjy/creative-writing-skills)** -- The agent architecture pattern. The game engine is a creative-writing system where the story is interactive. Muse maps to Game Director. Writer maps to Narrator. Critic maps to Validator. Character-sim maps to NPC agents. The mapping is not a metaphor -- it is the same code running in a different mode.

**[meridian-prompter](https://github.com/haowjy/meridian-prompter)** -- The agent/skill packaging system. V0 ships as a meridian package. The same agent definitions work across backends -- Claude, opencode, local models via Ollama. Meridian handles session management, tool registration, and agent dispatch. The game does not build its own runtime.

## How to Follow

The project is open source: **[github.com/haowjy/cultivation-rpg](https://github.com/haowjy/cultivation-rpg)**

Contributions welcome -- especially around agent architecture, world state design, tool validation, and Godot integration. Open an issue or start a discussion.

For context on the design and early feedback, see the [forum post discussion](../forum_post.md).

## Further Reading

- [Home](#home) -- project overview and a session example
- [Game Vision](#game-vision) -- world, era model, combat, progression
- [How It Works](#how-it-works) -- the LLM agent loop architecture
- [World Generation](#world-generation) -- chunk-based procedural generation
- [Insight Spellcraft](#insight-spellcraft) -- the spell system that makes every run unique
