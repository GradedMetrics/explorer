export type cardSimple = {
  id: string,
  number: string,
  popularity: number,
  psa10Pop: number,
  set: string,
  total: number,
}

export type expansion = {
  cards: number,
  id: string,
  language?: string,
  name: string,
  popularity: number,
  total: number,
  variant: string,
  year: string,
}

export type pokemon = {
  name: string,
  number: number,
}

export type rawPokemonData = {
  data: cardSimple[],
  name: string,
}

export type pokemonExpansion = {
  expansion: expansion,
  cards: cardSimple[],
}