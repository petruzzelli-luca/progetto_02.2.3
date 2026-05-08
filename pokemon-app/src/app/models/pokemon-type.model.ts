export interface PokemonTypeList {
  count: number;
  results: PokemonTypeSummary[];
}

export interface PokemonTypeSummary {
  name: string;
  url: string;
}

export interface PokemonTypeDetail {
  id: number;
  name: string;
  pokemon: PokemonSlot[];
}

export interface PokemonSlot {
  slot: number;
  pokemon: PokemonSummary;
}

export interface PokemonSummary {
  name: string;
  url: string;
}