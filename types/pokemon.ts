export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonAbility {
  name: string;
  is_hidden: boolean;
  slot?: number;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
    dream_world: {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl?: string;
  url?: string;
  abilities: PokemonAbility[];
  types: string[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  data: Pokemon[];
}

export interface ChainLink {
  species: NamedAPIResource;
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  imageUrl?: string;
  abilities: PokemonAbility[];
  types: {
    name: string;
    slot: string;
  }[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
  evolution_chain: {
    name: string;
    id: number
  }[];
  stats: {
    name: string;
    value: number;
  }[]
  color: NamedAPIResource;
  genera: Array<{
    genus: string;
    language: NamedAPIResource;
  }>;
}