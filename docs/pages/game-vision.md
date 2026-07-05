# Game Vision

A living fantasy sandbox where story is the primary attractor. Start as nobody in a collapsing world, gather power, and turn chaos into your legend.

## Era Model

The world begins as a functioning medieval society. Multiple kingdoms trade across established routes. Guilds regulate commerce. Churches provide structure. Local lords keep roads safe enough to travel. The usual political tensions exist — border disputes, succession crises, guild rivalries — but the system works. People farm, merchants trade, guards patrol.

Then it breaks. Small wars erupt between kingdoms. Bandit groups grow bolder as patrols thin out. Supply lines fracture. The normal pressures of medieval life sharpen into real instability. The player arrives at this inflection point — late enough that the cracks are visible, early enough that the collapse hasn't finished.

Think Three Kingdoms energy: micro-states, opportunistic warlords, splintering institutions, and dangerous frontiers. Chaos is the opportunity engine.

| Pressure | What it creates | Player opportunity |
|---|---|---|
| Border wars | Broken roads, refugees, mercenaries, power vacuums | Protect, raid, recruit, betray, claim |
| Famine | Mill disputes, hoarding, riots, smuggling | Control food, earn loyalty, blackmail elites |
| Monster pressure | Abandoned sites, dangerous loot, desperate villages | Gain power and reputation faster than normal |
| Institutional fracture | Church coverups, guild politics, noble legitimacy crises | Expose truth, become useful, seize narrative control |

## The Demon King

Behind the escalating chaos is a human-made existential threat. Not a dark lord sitting on a throne — more like a plague given will. A force that feeds on destabilization the way disease feeds on famine.

The Demon King scales alongside the player. As the player grows from nobody to legend, the Demon King grows from a distant rumor to an existential crisis. The personal arc and the world's deterioration arc mirror each other. The question is whether the player grows fast enough to face the threat when it arrives.

The origin — who created it, why, whether it can be reversed — is a late-game discovery that recontextualizes the early game. The player spends act one thinking the world is just politically unstable. Act two reveals something is accelerating the collapse on purpose.

## Cultivation Path

Power progression through mana cultivation — tiered ranks with breakthrough moments, driven by [insight spellcraft](#insight-spellcraft).

Insights come from lived experience, discovered manuals (technique scrolls, martial arts texts, meditation guides), and player-written reflections. Accumulate enough understanding, then face a breakthrough challenge — a trial, revelation, or crisis — to advance to the next rank. Higher rank unlocks stronger techniques and deeper mana capacity.

The progression feels like cultivation in a medieval fantasy world. The player grows by fighting, studying, and reflecting — not by filling an XP bar.

Relationships are a growth channel, not a requirement. Players who want allies, factions, and political leverage can pursue them. Players who want to solo the world as a wandering swordsman can do that too.

## Combat

### PoC (V0): Narrative DM

The proof-of-concept uses free-text combat. Describe what you do, the LLM interprets and narrates outcomes based on your stats, skills, equipment, and the situation. No hotbar, no real-time input — pure narrative resolution.

### V1: Real-Time Action

V1 moves to real-time action combat. The player controls movement and attacks directly (WASD + mouse on PC, joystick on controller). A deterministic game engine handles the base layer: hit detection, damage calculation, enemy AI behavior trees. The player fights in real time, not through text.

The LLM runs in the background and perturbs the fight. An enemy shouts a taunt referencing your history. Reinforcements arrive because a lookout escaped. The environment shifts — a bridge collapses, fire spreads. An enemy breaks and flees because they recognize you. The player feels a living fight, not a scripted encounter.

Techniques from [insight spellcraft](#insight-spellcraft) slot into a 4-slot hotbar (number keys or face buttons) and fire in real time: dashes, strikes, area effects, defensive moves. Reference: Echoes of Mystralia for the feel of a player-authored spell system inside action combat.

### Three-Layer Architecture

| Layer | Handles | Example |
|---|---|---|
| Game engine | Movement, collision, damage, enemy base AI | Bandit swings sword, player dodges, damage applies |
| LLM perturbation | Dialogue, reinforcements, environment, morale | Bandit yells "that's the Mill-Savior!" — two others flee |
| Technique system | Player abilities from insight spellcraft | "Ash Wolf Step" dash leaves afterimage, flanks enemy |

## Player Character

Standard RPG stats, use-based skill growth, and techniques born from the [insight spellcraft](#insight-spellcraft) pipeline.

### Stats

| Stat | Abbr | Role |
|---|---|---|
| Strength | STR | Melee damage, carrying capacity, physical force |
| Dexterity | DEX | Speed, evasion, ranged accuracy, stealth |
| Constitution | CON | Hit points, endurance, resistance to poison and disease |
| Intelligence | INT | Knowledge recall, arcane aptitude, crafting precision |
| Wisdom | WIS | Perception, insight checks, spiritual sensitivity |
| Charisma | CHA | Persuasion, intimidation, leadership, faction reputation effects |

HP derives from CON and level. Level increases from accumulated experience across combat, exploration, social encounters, and quest completion.

### Skills

Skills grow from use. A player who repeatedly picks locks improves at lockpicking. A player who negotiates with faction leaders improves at persuasion. The skill list is open-ended — new skills appear when the player attempts new kinds of actions.

Proficiency levels: untrained, novice, competent, expert, master.

### Equipment

Standard slots: weapon (main hand), off-hand (shield, second weapon, focus), armor (body), head, hands, feet, two accessory slots. Equipment affects stats and opens or closes options — heavy armor increases effective CON but penalizes DEX, a guild badge changes how NPCs react.

### Example Character File

```markdown
# Player Character

**Level:** 2
**HP:** 18 / 22

## Stats
STR 12 | DEX 14 | CON 11 | INT 10 | WIS 13 | CHA 15

## Skills
- Sword Fighting (novice)
- Persuasion (competent)
- Survival (novice)

## Techniques
- Ash Wolf Step — Dash + afterimage + flanking bonus

## Equipment
- Rusted longsword (main hand)
- Leather jerkin (armor)
- Traveler's boots (feet)
- Guild badge (accessory)

## Inventory
- 12 silver coins
- Rope (50 ft)
- Dried rations (3 days)
```
