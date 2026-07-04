# World Generation

The world is procedurally generated from a seed, rendered chunk-by-chunk as the player explores. The generator places terrain and structures. The LLM writes what they mean.

## Chunk-Based Generation

A world seed generates a master map before play begins. The master map defines:

- **Biomes** -- forest, plains, mountains, swamp, coast
- **Elevation heightmap** -- valleys, hills, cliffs, plateaus
- **River and road networks** -- connecting settlements and landmarks
- **Pinned locations** -- towns, ruins, faction headquarters, shrines

The player sees a stylized overview map with fog-of-war. Pinned locations appear as icons. Terrain reads as broad brushstrokes -- forest here, mountains there. Nothing renders in tile detail until the player approaches.

## How Chunks Work

When the player enters proximity of an unloaded area, the engine generates a chunk (32x32 or 64x64 tiles) and locks it permanently. Generation reads from the master map:

1. **Biome** -- determines tile palette and prefab pool
2. **Elevation** -- selects terrain layers, cliff faces, slopes
3. **Road/river overlay** -- routes paths through the chunk
4. **Pinned structures** -- places buildings, landmarks, entrances
5. **Faction control** -- sets guard patrols, banners, territorial markers

Once locked, the chunk never regenerates. Changes after lock -- a building burns down, a camp gets established, a wall gets built -- are state mutations applied on top of the locked tile data. The generator runs once. Everything after that is the game engine modifying state.

## Prefab Templates

Chunks are assembled from hand-designed prefab templates, not built tile-by-tile from noise functions. An artist designs 50-100 prefabs covering the common terrain patterns. The procedural system selects and places the right prefab; it does not figure out elevation rendering from scratch.

This solves the elevation problem. A "hill with watchtower" prefab already knows how to use cliff-face tiles, plateaus, winding paths, and stair transitions. A "river crossing" prefab already handles bridge placement, bank slopes, and flow direction. The generator matches terrain conditions to prefabs -- it does not invent tile arrangements.

| Prefab | Tiles | Placement condition |
|---|---|---|
| Forest clearing | Open ground, tree border, log seats, campfire spot | Forest biome, flat elevation, no road |
| Road fork | Packed dirt, signpost, cart tracks, ditch edges | Road intersection, any biome |
| Hill watchtower | Cliff face, plateau, winding path, stone tower base | Elevated terrain, faction-controlled area |
| Village square | Cobblestone, well, market stalls, building facades | Pinned town location, flat terrain |
| River crossing | Bridge planks, bank slopes, shallow ford, reeds | River overlay, road intersection |
| Bandit camp | Tent clusters, firepit, log barricade, lookout tree | Forest or hill biome, hostile faction zone |
| Shrine clearing | Stone altar, overgrown path, lantern posts, offering bowl | Pinned shrine location, any biome |
| Cave entrance | Rock face, dark opening, rubble, torch sconces | Mountain or hill biome, elevated terrain |

Prefabs connect via **edge constraints**. Roads line up at chunk boundaries. Biome transitions auto-tile (forest edge fades to grassland). Elevation matches so cliffs do not appear or vanish at seams. The constraint system guarantees visual continuity without manual stitching.

## LLM Enrichment

After a chunk locks, the LLM writes the **semantic layer**: who lives here, what happened recently, what pressure exists, what rumors attach to this place. The tiles are set by the generator. The meaning is set by the LLM.

A "forest clearing" prefab is just tiles -- open ground, tree border, campfire spot. The LLM turns it into "the clearing where the Red Sashes ambushed a merchant caravan last week. Dried blood on the logs. Cart tracks leading nowhere." A "shrine clearing" becomes "a shrine to the Sealed God, maintained by Sister Elian, who has been asking travelers about a stolen relic."

The enrichment writes directly into the area's world state files (`area.md`, `recent-events.md`, `rumors.md`, `npcs-present.md`). From that point, the [story system](#how-it-works) treats the chunk like any other active area -- pressure accumulates, NPCs act, events fire.

## Tile Rendering (V1)

2.5D three-quarter perspective. Visual reference: CrossCode, Eastward.

Three visual layers composited at render time:

| Layer | Content | Source |
|---|---|---|
| Terrain tiles | Ground types (grass, dirt, stone, water), auto-tiling edges and transitions | Prefab template + biome palette |
| Structures | Buildings assembled from modular parts (walls, roofs, doors, windows) | Prefab template + pinned location data |
| Props and NPCs | Crates, barrels, signs, vegetation, characters | World state (placed dynamically from area files) |

Background (distant mountains, sky, clouds) is parallax-scrolling painted art, not tiles. This separates the tile grid from the horizon and gives depth without requiring 3D rendering.

Tile scale: 32x32 pixels. Art style: anime-inspired pixel art with clean linework and saturated color.

## Site Meaning

Every important site in the world answers three questions: who wants it, why, and what changes if the player interferes. Sites without stakes are scenery. Sites with stakes are gameplay.

| Site | Material value | Story value | If the player interferes |
|---|---|---|---|
| North Mill | Grain supply for Greyford, controls food prices | Disputed between Vael lordship and local farmers | Player controls who eats and who starves -- faction loyalty shifts |
| Abandoned Shrine | Sealed God relics, hidden cache, defensible position | Church wants it sanctified, bandits want it as a hideout | Player decides who controls a strategic and symbolic location |
| Red Sash Camp | Weapons stockpile, stolen trade goods, recruitable fighters | Bandit faction growing bold enough to challenge local authority | Player can destroy, ally, absorb, or redirect the Red Sashes |
| Ruined Watchtower | High ground, line of sight over two roads, buildable foundation | Former lordship outpost, abandoned when patrols thinned | Player gains a base, but claiming it signals ambition to every faction |

Sites generate pressure passively. The mill dispute escalates whether or not the player visits. The shrine attracts competing interests on its own schedule. The world does not wait.

## Further Reading

- [How It Works](#how-it-works) -- the LLM agent loop that runs the world
- [Game Vision](#game-vision) -- world, era model, combat, progression
- [Insight Spellcraft](#insight-spellcraft) -- the spell system built on this engine
- [Roadmap](#roadmap) -- what we are building and when
