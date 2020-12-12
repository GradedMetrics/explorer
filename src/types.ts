export type card = {
  id: string,
  name: string,
  number?: string,
  total: number,
  variants?: string[],
  year: string,
}

export type cardSimple = {
  id: string,
  name?: string,
  number?: string,
  popularity: number,
  psa10Pop: number,
  set: string,
  total: number,
  variant?: string[],
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

export type expansionDetailed = {
  cards: card[],
  history: gradeHistory[],
  total: grades,
}

export type expansionCard = {
  history: gradeHistory[],
  total: grades,
}

export type flattenedGrade = {
  description?: string,
  hasQualifier?: boolean,
  name: string,
  percentageOfTotal?: number,
  value: number,
}

export type grade = {
  grade?: number,
  half?: number,
  qualifier?: number,
}

export type grade1Or9 = {
  grade?: number,
  qualifier?: number,
}

export type grade1Half = {
  half?: number,
  qualifier?: number,
}

export type grade10OrAuth = {
  grade?: number,
}

export type gradeChangeOverTime = {
  weekly?: grades,
  monthly?: grades,
  yearly?: grades,
}

export type grades = {
  1?: grade1Or9,
  1.5?: grade1Half,
  2?: grade,
  3?: grade,
  4?: grade,
  5?: grade,
  6?: grade,
  7?: grade,
  8?: grade,
  9?: grade1Or9,
  10?: grade10OrAuth,
  auth?: grade10OrAuth,
  total: grade,
}

export type gradeHistory = {
  date: number,
  grades: grades,
}

export type pokemon = {
  language?: string,
  name: string,
  number?: number,
  translation?: string,
}

export type rawPokemonData = {
  data: cardSimple[],
  name: string,
}

export type pokemonExpansion = {
  expansion: expansion,
  cards: cardSimple[],
}