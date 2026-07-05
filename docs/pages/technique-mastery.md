# Technique Mastery

Techniques are learned, practiced, mastered, and then changed.

The system is not: meaningful event happens, the game grants an insight, the insight becomes a spell.

The system is: the player learns a form, gains proficiency through use and practice, then chooses when to evolve it. When evolution happens, the player can bring references — another technique, a manual, a strange book, a shrine, a memory, or a line they write themselves. The LLM reads those references alongside the player's history and proposes new forms.

## 1. Learn a Form

Techniques enter the world through concrete sources:

- manuals and martial texts
- teachers and rivals
- enemies whose moves can be studied
- relics, shrines, statues, and ruins
- experiments with existing skills

At first, a technique is not personal. It is a learned form.

> Wolf Step — basic evasive footwork from a hunter's manual.

## 2. Gain Proficiency

Training is simple. Proficiency rises when the player uses the technique, practices it, drills it, studies its manual, or receives instruction.

Proficiency levels can stay familiar:

| Level | Meaning |
|---|---|
| Untrained | The player knows of the form but cannot use it reliably |
| Novice | Usable, but clumsy or costly |
| Competent | Reliable under ordinary pressure |
| Expert | Strong enough to shape tactics around |
| Master | Flexible enough to evolve |

The LLM does not need to invent a new power every time training happens. Most training is ordinary progress.

## 3. Make It Your Own

At mastery thresholds, the player can evolve or combine techniques.

The player chooses what to bring into the evolution:

- another known technique
- a passage from a manual
- a book found in the world
- a shrine, statue, oath, or relic
- a remembered event
- a written idea from the player
- a combat pattern from their history

The LLM reads the chosen reference plus the player's history and proposes evolved techniques. The output should feel authored by the player's run, not handed out by a loot table.

Example:

```text
Base technique: Wolf Step
Reference: Fire Palm
Player note: "move after they commit"
History: often dodged arrows, circled beasts, and closed distance on fleeing enemies

Possible evolution:
Cinder Wolf Step — shift one position and leave a brief ember afterimage.
If an enemy attacks the afterimage, the player's next fire technique gains advantage.
```

## 4. Validate the Result

The LLM proposes names, story logic, visuals, and tactical shape. Tools decide what becomes real.

Validation checks:

- every effect maps to a known combat primitive
- cost, cooldown, position rules, and target rules fit the technique tier
- the evolution does not duplicate an existing ability
- the result fits the player's current path and shrine breakthroughs
- any weird effect is allowed by the player's current weirdness ceiling

## 5. Break Through at Shrines

Shrines, statues, and altars change the player's deeper path. They are not the normal training loop.

A breakthrough can upgrade:

- base level or rank
- element or affinity
- technique budget
- passive bonuses
- vows, curses, or drawbacks
- the kinds of strange evolutions allowed later

Early breakthroughs can be simple: more mana, stronger body, fire-aligned techniques. Later breakthroughs can get stranger: rain strengthens oath techniques, spared enemies carry a mark, shadows remember the player's last movement, or a shrine changes how fear spreads through a party.

## Why This Works

The player controls when to evolve a technique and what references to bring. The LLM handles interpretation and creative synthesis. The deterministic layer keeps the combat system playable.

History matters, but it is context — not an automatic reward trigger.