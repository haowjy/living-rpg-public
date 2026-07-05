# Game Vision

A living fantasy sandbox where story is the primary attractor. Start as nobody in a volatile medieval world, learn techniques, survive pressure, and turn your history into power.

## Era Model

The world begins as a functioning medieval society. Multiple kingdoms trade across established routes. Guilds regulate commerce. Churches provide structure. Local lords keep roads safe enough to travel. The usual political tensions exist — border disputes, succession crises, guild rivalries — but the system works. People farm, merchants trade, guards patrol.

Then it breaks. Small wars erupt between kingdoms. Bandit groups grow bolder as patrols thin out. Supply lines fracture. The normal pressures of medieval life sharpen into real instability. The player arrives at this inflection point — late enough that the cracks are visible, early enough that the collapse has not finished.

Think Three Kingdoms energy: micro-states, opportunistic warlords, splintering institutions, and dangerous frontiers. Chaos is the opportunity engine.

| Pressure | What it creates | Player opportunity |
|---|---|---|
| Border wars | Broken roads, refugees, mercenaries, power vacuums | Protect, raid, recruit, betray, claim |
| Famine | Mill disputes, hoarding, riots, smuggling | Control food, earn loyalty, blackmail elites |
| Monster pressure | Abandoned sites, dangerous loot, desperate villages | Gain power and reputation faster than normal |
| Institutional fracture | Church coverups, guild politics, noble legitimacy crises | Expose truth, become useful, seize narrative control |

## Progression

Power starts with learned forms, not random spell drops.

The player finds manuals, studies under teachers, observes enemies, discovers strange books, or receives techniques from relics and shrines. A technique begins as an external form: something the player learned from somewhere else.

Proficiency is simple. Use the technique, practice it, drill it, or study the relevant manual. The form moves from unfamiliar to reliable to mastered.

At higher proficiency, the player can make the form their own. They can evolve it by referencing another technique, a manual passage, a strange book, a shrine, a memory, or a line they write themselves. The LLM reads that reference alongside the player's history and proposes evolved forms. Deterministic validation keeps the result legal.

Shrines, statues, and altars are for breakthroughs. They upgrade the player's base path: level, element, bonuses, vows, curses, and the ceiling for how strange future technique evolutions can become.

## Combat

### V0: Narrative Turns

The proof-of-concept uses text-first turn resolution. The player describes what they do, the system interprets the action against stats, skills, position, technique proficiency, party state, enemies, and scene pressure, then records the outcome.

V0 should feel like a tabletop combat scene with a strict memory layer: the narration can be flexible, but state changes still pass through tools.

### V1: Turn-Based Party Combat

V1 should move toward a turn-based RPG combat model rather than real-time action. Darkest Dungeon is the closest gameplay reference: readable turns, party composition, position, stress, injury, marks, status effects, and named abilities with clear tactical consequences.

The player chooses techniques, targets, positioning, items, retreats, and party orders. The deterministic combat layer handles turn order, hit chances, damage, status effects, cooldowns, proficiency gain, and legal targets.

The LLM runs around that layer, not instead of it. It can write enemy barks, morale breaks, unusual reinforcements, environmental complications, personalized technique evolutions, and story consequences after the fight. Combat remains legible because the rules layer owns the numbers.

### Three-Layer Architecture

| Layer | Handles | Example |
|---|---|---|
| Combat engine | Turns, positions, damage, status, legal targets | A front-rank bandit attacks the lead companion |
| LLM meaning layer | Dialogue, morale, history references, scene complications | An enemy recognizes the player from a rumor and hesitates |
| Technique system | Learned forms, proficiency, evolution, validation | A mastered step technique evolves into a smoke-feint movement action |

## Player Character

Standard RPG stats, use-based skills, learned techniques, proficiency, party relationships, equipment, reputation, and shrine breakthroughs define the character.

Relationships are a growth channel, not a requirement. Players who want allies, factions, and political leverage can pursue them. Players who want to solo the world as a wandering swordsman can do that too.

## The Demon King

Behind the escalating chaos is a human-made existential threat. Not a dark lord sitting on a throne — more like a plague given will. A force that feeds on destabilization the way disease feeds on famine.

The Demon King scales alongside the player. As the player grows from nobody to legend, the Demon King grows from a distant rumor to an existential crisis. The personal arc and the world's deterioration arc mirror each other. The question is whether the player grows fast enough to face the threat when it arrives.

The origin — who created it, why, whether it can be reversed — is a late-game discovery that recontextualizes the early game.