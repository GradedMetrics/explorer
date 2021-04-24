export type card = {
  expansion?: expansion
  id: string
  name?: string
  number?: string
  pokemon?: string[]
  psa10Pop?: number
  psaName?: string
  rank?: number
  rankTotal?: number
  set?: string
  total: number
  variants?: string[]
  year?: string
}

export type expansion = {
  cards: number
  id: string
  language?: string
  name: string
  total: number
  variant: string
  year: string
}

export type expansionDetailed = {
  cards: card[]
  history: gradeHistory[]
  total: grades
}

export type expansionCard = {
  history: gradeHistory[]
  total: grades
}

export type flattenedGrade = {
  description?: string
  hasQualifier?: boolean
  name: string
  percentageOfTotal?: number
  value: number
}

export type grade = {
  grade?: number
  half?: number
  qualifier?: number
}

export type grade1Or9 = {
  grade?: number
  qualifier?: number
}

export type grade1Half = {
  half?: number
  qualifier?: number
}

export type grade10OrAuth = {
  grade?: number
}

export type gradeChangeOverTime = {
  weekly?: grades
  monthly?: grades
  yearly?: grades
}

export type grades = {
  1?: grade1Or9
  1.5?: grade1Half
  2?: grade
  3?: grade
  4?: grade
  5?: grade
  6?: grade
  7?: grade
  8?: grade
  9?: grade1Or9
  10?: grade10OrAuth
  auth?: grade10OrAuth
  total: grade
}

export type gradeHistory = {
  cards?: number
  date: number
  grades: grades
  total?: number
}

export type pokemon = {
  language?: string
  name: string
  number?: number
  psaName?: string
  rank?: number
  rankTotal?: number
  total?: number
  translation?: string
}

export type pokemonData = {
  data: card[]
  grades: grades
  history: gradeHistory[]
  name: string
  total: number
}

export type contentRank = {
  name: string
  rank: number
  total: number
}

/** Rank Info */
export type cardRanking = {
  set: expansion
  id: string
  name: string
  number?: string
  popIncrease: number
  psaName?: string
  total: number
  variants?: string[]
}

export type expansionRanking = {
  id: string
  language?: string
  name: string
  popIncrease: number
  variant: string
  year: string
}

export type ranking = {
  highestPerformingMonthlyCards: cardRanking[]
  highestPerformingWeeklyCards: cardRanking[]
  highestPerformingYearlyCards: cardRanking[]
  highestPerformingMonthlySets: expansionRanking[]
  highestPerformingWeeklySets: expansionRanking[]
  highestPerformingYearlySets: expansionRanking[]
}

export type variant = contentRank;

export type version = {
  v: number
  '@': number
}