# How It Works

The game engine is an LLM agent loop over a structured file system. The LLM reads world state from files, writes narration as free text, and calls tools when state needs to change. Files are the world. The loop is the engine.

## The Agent Loop

```text
read world state (files + search index)
  → observe (what changed, what's nearby, what's pressured)
  → think/write (narration, dialogue, scene prose)
  → call tools (move_character, write_event, change_relationship, spread_rumor)
  → loop
```

The LLM's primary output is prose. Structured JSON is only used for state mutations via tool calls. JSON mode or constrained decoding handles format validity when structured output is needed.

The loop runs continuously during play. Each iteration reads the current world state, identifies what matters right now (proximity, pressure, unresolved tension), generates prose for the player, and fires tool calls to record what happened. The next iteration reads the updated state and continues.

This is a single architecture with four components:

1. **Files** -- world state as a structured directory of prose and data.
2. **Index** -- FTS + vector search over those files for retrieval.
3. **Tools** -- named functions for state mutations, each with built-in validation.
4. **Loop** -- the LLM agent reads, thinks, writes, calls tools, repeats.

## What a Consequence Looks Like

The player spares a raider. `write_event` records the witnesses. A rumor carrier reaches the hub. An NPC who hears the rumor reacts later, not because the model has omniscient knowledge, but because the rumor reached their area. If the player later evolves a mercy-themed binding technique, that event can be retrieved as context — but it does not automatically grant a spell.

## Agents and Skills

The game is built on the same architecture as creative-writing-skills -- a set of agents and skills that compose into a session. Agents and skills map directly from creative writing to game engine:

| Creative writing | Game engine |
|---|---|
| Muse (session lead, stance switching) | Game Director (loop, observe, dispatch) |
| Writer (prose from briefs) | Narrator (prose from world state) |
| Critic (adversarial reading) | Validator (consistency checking) |
| Character-sim (in-character conversation) | NPC agents (interactive characters) |
| KB (durable story memory) | World state (characters, factions, locations) |
| Story memory (fact extraction) | Event log (what happened) |
| Vocab / shared-dao | World lore, canonical terms |

A Game Director agent manages the loop: it reads world state, dispatches to the Narrator for prose, consults the Validator for consistency, and invokes NPC agents when characters need to act autonomously.

## World State as Files

World state lives as markdown files in a structured directory. The LLM reads them directly as context. An index layer (FTS + vector) provides search when the agent needs to find relevant content across the world.

```text
world/
  world.md
  clock.md
  areas/
  characters/
  factions/
  quests/
  rumors/
  techniques/
  shrines/
  events/
  index/
```

The file system is the world. If the LLM can read a file, it knows that thing. If no file exists, that thing has not been established. Files are prose by default. Structured data lives in fenced blocks within markdown where precision matters.

### State Mutations via Tools

State changes happen through tool calls, not by the LLM editing files directly. The LLM proposes a call; the tool validates inputs against current world state and either executes or rejects.

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

If a tool call references an invalid location, a character who is not present, a technique the player does not know, or a shrine that cannot be reached, the tool rejects it. This is how the engine enforces consistency without asking the LLM to self-police every detail.

### Index Layer

| Index type | Purpose |
|---|---|
| Full-text search | Find events, characters, techniques, or locations by name or keyword |
| Vector search | Find thematically related content: betrayal, mercy, fire, fear, oath, rivalry |

The index is a derived projection of the files. It can be rebuilt from the directory at any time. It is never the source of truth.

## NPC Agents

Named NPCs are autonomous agents, not dialogue trees. Each NPC has goals, memory, relationships, a schedule, and the ability to act. They use the character-sim pattern: the LLM speaks in character from the NPC's knowledge, voice, and emotional state.

The critical constraint: NPCs act on what *they* know, not what the player knows. A guard captain does not react to a murder she has not heard about. A merchant adjusts prices based on the supply disruption he has witnessed, not on events three areas away. Knowledge boundaries are enforced by what files the NPC agent can read.

NPCs act during wait, travel, rest, and world ticks. Their actions produce events, not atmosphere:

- Move to a new area
- Spread or suppress a rumor
- Invite or confront the player
- Recruit another NPC
- Claim credit for an outcome
- Shift faction resources or control

These actions feed back into the event log, creating new pressure that the story system surfaces as playable situations.

## Layered Simulation

Simulation detail scales with proximity to the player. Distant events tick coarsely; the player's immediate area runs at full richness.

| Layer | Granularity | Examples |
|---|---|---|
| Global | Low | Wars declared, dynasties fracture, doctrine changes |
| Regional | Medium | Refugees arrive, roads close, bandits expand |
| Town/city | Higher | Prices shift, guards crack down, rumors spread |
| Active local area | Rich | Named NPCs scheme, argue, move, confront, betray |

Global and regional events create the pressure that drives local story. A distant war produces refugees; refugees create food pressure in the starting region; food pressure makes a mill dispute matter.

## Story System

The story system generates playable situations from local pressure. There are no scripted quest chains, no trigger volumes, no dialogue flags. The LLM observes events, detects emerging patterns, and proposes story developments. Validation happens at the tool level.

### Story Pressure

Story pressure is unresolved tension attached to places, people, and factions. The system surfaces pressure that is local, timely, and connected to prior events.

Pressure accumulates from events. When enough pressure builds around a cluster of characters, locations, and factions, the story system proposes a scene: a rivalry forming, a village ready to rebel, a faction losing legitimacy after a public failure, or a rumor reaching the wrong person.

### Scene Generation with Validation

A scene begins when the system identifies actionable pressure at the player's current location:

1. Read the player's location, present characters, recent events, active pressures.
2. Identify which pressure is most ready to surface.
3. Generate a scene with narration, NPC actions, and player options.
4. Call tools to record the resulting events.

Every scene is grounded by validation checks, enforced by the tools:

| Check | What it prevents |
|---|---|
| Presence | NPC acts in a scene but is not at this location |
| Knowledge | Character reacts to information they have not received |
| Rules | Illegal state changes |
| Causality | Scene contradicts prior events or has no pressure driving it |
| Scope | Scene references events or actors too far from the player's area |

## Failure Handling

LLM output is unreliable by nature. The engine assumes failures will happen and handles them at two levels:

| Concern | Approach |
|---|---|
| JSON validity | Constrained decoding when structured output is needed |
| Semantic validation | Tool-level checks |
| Tool rejection | Retry once with the error message as context |
| Retry failure | Fall back to a template appropriate to the scene type |

The retry-then-fallback pattern means the game never crashes on a bad generation. A rejected tool call gets one retry with the rejection reason included in context. If the retry also fails, the engine uses a pre-written template and logs the failure for debugging.

## Further Reading

- [Game Vision](#game-vision) -- world, era model, combat, progression
- [Technique Mastery](#technique-mastery) -- learn, practice, evolve, and break through
- [World Generation](#world-generation) -- how the world bootstraps from nothing
- [Roadmap](#roadmap) -- what we are building and when