# Insight Spellcraft

Make your own spells from the story you lived. Every run produces techniques no other player found, because no other player lived the same history.

## The Pipeline

Five stages turn lived experience into combat abilities.

### 1. Event

Something meaningful happens. Survived an ambush, spared an enemy, founded a company, meditated in a ruin. The game logs it as a structured event via `write_event`.

### 2. Insight

The game distills the experience into a named insight. Not every event produces one -- only moments with emotional or narrative weight. A routine bandit fight does not generate an insight. Surviving a coordinated pack ambush alone, outnumbered, reading animal movement to stay alive -- that does.

### 3. Proposal

The LLM builds a technique from the insight: name, story logic, mechanical shape. The name and effect derive from what actually happened, not from a loot table.

> You survived the ash wolves by reading their pack movement. Technique: **Ash Wolf Step**.

The proposal includes a narrative justification (why this experience produces this ability), a mechanical sketch (what it does in combat), and a thematic tag linking it to the player's history.

### 4. Validation

Deterministic tools compile the proposal into legal mechanics using a vocabulary of primitives (dash, shield, mark, fear, morale buff, etc.). The validator checks:

- **Balance** -- cost, cooldown, and power within tier bounds
- **World rules** -- no mechanics that contradict established lore or physics
- **Primitive coverage** -- every effect maps to a known mechanical primitive
- **Slot fit** -- the technique fits the hotbar system (V1)

If validation fails, the proposal is rejected or narrowed. The LLM can retry with a revised proposal. Techniques that pass validation are mechanically sound by construction.

### 5. Legend

The technique enters the player's ability list and their story. In V1, it slots into the 4-slot hotbar for real-time combat. The technique's origin event stays linked -- NPCs may recognize the technique, reference its origin, or react to its use.

## Examples

| Source event | Technique | Validated mechanics |
|---|---|---|
| Survived ash wolf ambush | Ash Wolf Step | Dash, afterimage, flanking bonus |
| Spared a Red Sash bandit after taking the mill | Red Sash Binding | Mark enemy, fear check, surrender pressure |
| Founded a company under a burned banner | Oath-Flame Standard | Ally morale buff, formation aura, reputation tag |
| Meditated in ruined shrine after betrayal | Shrine-Breath Vow | Shield, focus recovery, oath-triggered penalty |

Every technique tells the player's story. Two players who both fight ash wolves but survive differently get different techniques.

## Mechanical Primitives

Techniques assemble from a fixed vocabulary of composable primitives:

`dash` `damage` `push` `pull` `shield` `bind` `mark` `reveal` `summon` `terrain change` `morale buff` `fear pressure` `reputation shift` `faction aura` `dialogue unlock` `oath condition` `cooldown` `range` `cost` `tier` `escalation risk`

The LLM proposes creative combinations. The tools validate balance before a technique becomes real. A technique is always a subset of this vocabulary -- no freeform effects, no unvalidated mechanics.

## Why This Works

The LLM handles creative naming, narrative connections, and thematic resonance -- things it is good at. The deterministic tools handle balance, legality, and mechanical compilation -- things that need rules. Neither side does the other's job.

| Responsibility | Handled by | Why |
|---|---|---|
| Naming and flavor | LLM | Creative, contextual, unrepeatable |
| Narrative justification | LLM | Requires reading the player's full history |
| Mechanical compilation | Tools | Deterministic, auditable, balanced by construction |
| Balance validation | Tools | Rules do not drift, hallucinate, or play favorites |

This split means the system can produce thousands of unique techniques without any of them breaking the game. The creative surface is infinite. The mechanical surface is bounded.

## Further Reading

- [Game Vision](#game-vision) -- world, era model, combat, progression
- [How It Works](#how-it-works) -- the LLM agent loop architecture
- [World Generation](#world-generation) -- how the world bootstraps from nothing
- [Roadmap](#roadmap) -- what we are building and when
