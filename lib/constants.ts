// PokeAPI Filter Values for Pokemon Filters

export const POKEMON_TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
];

// WEAKNESS - Calculated from type damage relations
// Weaknesses are determined by which types deal double damage to a Pokemon's type
// This is the same list as types since weaknesses ARE types
export const POKEMON_WEAKNESSES = POKEMON_TYPES;

// ABILITIES - There are 248+ abilities in PokeAPI
// Here are some common/popular ones. For full list, use: https://pokeapi.co/api/v2/ability?limit=300
export const POPULAR_ABILITIES = [
  'adaptability',
  'aerilate',
  'aftermath',
  'air-lock',
  'analytic',
  'anger-point',
  'anticipation',
  'arena-trap',
  'armor-tail',
  'aroma-veil',
  'battle-armor',
  'battle-bond',
  'blaze',
  'bulletproof',
  'chlorophyll',
  'clear-body',
  'cloud-nine',
  'compound-eyes',
  'contrary',
  'cursed-body',
  'cute-charm',
  'damp',
  'dancer',
  'defeatist',
  'defiant',
  'delta-stream',
  'desolate-land',
  'disguise',
  'download',
  'drizzle',
  'drought',
  'dry-skin',
  'early-bird',
  'effect-spore',
  'electric-surge',
  'flash-fire',
  'flower-gift',
  'forecast',
  'fur-coat',
  'gale-wings',
  'galvanize',
  'guts',
  'harvest',
  'huge-power',
  'hustle',
  'hydration',
  'hyper-cutter',
  'immunity',
  'imposter',
  'infiltrator',
  'inner-focus',
  'insomnia',
  'intimidate',
  'iron-barbs',
  'iron-fist',
  'justified',
  'keen-eye',
  'levitate',
  'lightning-rod',
  'limber',
  'liquid-voice',
  'magic-bounce',
  'magic-guard',
  'magician',
  'magma-armor',
  'magnet-pull',
  'marvel-scale',
  'mega-launcher',
  'merciless',
  'mold-breaker',
  'moody',
  'motor-drive',
  'moxie',
  'multiscale',
  'natural-cure',
  'no-guard',
  'oblivious',
  'overcoat',
  'overgrow',
  'own-tempo',
  'parental-bond',
  'pickpocket',
  'pickup',
  'pixilate',
  'plus',
  'poison-heal',
  'poison-point',
  'poison-touch',
  'prankster',
  'pressure',
  'primordial-sea',
  'prism-armor',
  'protean',
  'pure-power',
  'queenly-majesty',
  'quick-feet',
  'rain-dish',
  'rattled',
  'receiver',
  'reckless',
  'regenerator',
  'rivalry',
  'rock-head',
  'rough-skin',
  'run-away',
  'sand-force',
  'sand-rush',
  'sand-stream',
  'sand-veil',
  'sap-sipper',
  'scrappy',
  'serene-grace',
  'shadow-shield',
  'shadow-tag',
  'shed-skin',
  'sheer-force',
  'shell-armor',
  'shield-dust',
  'simple',
  'skill-link',
  'slow-start',
  'slush-rush',
  'sniper',
  'snow-cloak',
  'snow-warning',
  'solar-power',
  'solid-rock',
  'soundproof',
  'speed-boost',
  'stakeout',
  'stall',
  'stamina',
  'stance-change',
  'static',
  'steadfast',
  'steam-engine',
  'steelworker',
  'stench',
  'sticky-hold',
  'storm-drain',
  'strong-jaw',
  'sturdy',
  'suction-cups',
  'super-luck',
  'surge-surfer',
  'swarm',
  'sweet-veil',
  'swift-swim',
  'synchronize',
  'tangled-feet',
  'technician',
  'telepathy',
  'teravolt',
  'thick-fat',
  'tinted-lens',
  'torrent',
  'tough-claws',
  'toxic-boost',
  'trace',
  'triage',
  'truant',
  'turboblaze',
  'unaware',
  'unburden',
  'unnerve',
  'victory-star',
  'vital-spirit',
  'volt-absorb',
  'water-absorb',
  'water-bubble',
  'water-compaction',
  'water-veil',
  'weak-armor',
  'white-smoke',
  'wimp-out',
  'wonder-guard',
  'wonder-skin',
  'zen-mode'
];

// HEIGHT - PokeAPI uses decimeters (1 decimeter = 0.1 meters)
// Bulbasaur is 7 (0.7m or 2'4"), Wailord is 145 (14.5m or 47'7")
// You can create ranges or use exact values
export const HEIGHT_RANGES = [
  { label: 'Tiny (0-5 dm)', min: 0, max: 5 },      // 0-0.5m
  { label: 'Small (6-10 dm)', min: 6, max: 10 },   // 0.6-1.0m
  { label: 'Medium (11-15 dm)', min: 11, max: 15 }, // 1.1-1.5m
  { label: 'Large (16-25 dm)', min: 16, max: 25 },  // 1.6-2.5m
  { label: 'Huge (26+ dm)', min: 26, max: 999 }     // 2.6m+
];

// WEIGHT - PokeAPI uses hectograms (1 hectogram = 0.1 kg)
// Gastly is 1 (0.1kg), Groudon is 9500 (950kg)
export const WEIGHT_RANGES = [
  { label: 'Featherweight (0-100 hg)', min: 0, max: 100 },    // 0-10kg
  { label: 'Light (101-500 hg)', min: 101, max: 500 },        // 10.1-50kg
  { label: 'Medium (501-1000 hg)', min: 501, max: 1000 },     // 50.1-100kg
  { label: 'Heavy (1001-2000 hg)', min: 1001, max: 2000 },    // 100.1-200kg
  { label: 'Massive (2001+ hg)', min: 2001, max: 99999 }      // 200.1kg+
];

// EXAMPLE USAGE FOR FILTERING
// To filter by type: GET https://pokeapi.co/api/v2/type/{type_name}
// This returns all Pokemon with that type in damage_relations

// To get weaknesses: Check the type's damage_relations.double_damage_from array
// Example for Fire type:
// double_damage_from: [water, ground, rock] means Fire is weak to these types

// To filter by ability: GET https://pokeapi.co/api/v2/ability/{ability_name}
// This returns all Pokemon that can have this ability

// To filter by height/weight: GET https://pokeapi.co/api/v2/pokemon/{id}
// Then check if pokemon.height or pokemon.weight falls in your range

// HELPER FUNCTION: Convert height/weight display values
export const convertHeight = (decimeters: number): string => {
  const meters = decimeters / 10;
  const feet = Math.floor(meters * 3.28084);
  const inches = Math.round((meters * 3.28084 - feet) * 12);
  return `${meters}m (${feet}'${inches}")`;
};

export const convertWeight = (hectograms: number): string => {
  const kg = hectograms / 10;
  const lbs = (kg * 2.20462).toFixed(1);
  return `${kg}kg (${lbs}lbs)`;
};

// EXAMPLE: Get all abilities from API
export const fetchAllAbilities = async (): Promise<string[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/ability?limit=300');
  const data = await response.json();
  return data.results.map((ability: { name: string }) => ability.name);
};

// EXAMPLE: Get weaknesses for a type
export const getTypeWeaknesses = async (typeName: string): Promise<string[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  const data = await response.json();
  return data.damage_relations.double_damage_from.map((t: { name: string }) => t.name);
};