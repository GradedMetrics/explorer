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
  note?: string
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
  ids?: gradeIds
  name: string
  percentageOfTotal?: number
  value: number
}

export type gradeIds = {
  [key: string]: number
}

export type grade = {
  grade?: number
  gradeIds?: gradeIds
  half?: number
  halfIds?: gradeIds
  qualifier?: number
  qualifierIds?: gradeIds
}

export type grade1Or9 = Omit<grade, "half" | "halfIds">;

export type grade1Half = Omit<grade, "grade" | "gradeIds">;

export type grade10OrAuth = Pick<grade, "grade" | "gradeIds">;

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
  popIncrease?: number
  psaName?: string
  total: number
  variants?: string[]
}

export type expansionRanking = {
  id: string
  language?: string
  name: string
  popIncrease?: number
  total: number
  variant: string
  year: string
}

export type ranking = {
  highestPerformingCards: cardRanking[]
  highestPerformingMonthlyCards: cardRanking[]
  highestPerformingWeeklyCards: cardRanking[]
  highestPerformingYearlyCards: cardRanking[]
  highestPerformingSets: expansionRanking[]
  highestPerformingMonthlySets: expansionRanking[]
  highestPerformingWeeklySets: expansionRanking[]
  highestPerformingYearlySets: expansionRanking[]
}

export type variant = contentRank;

export type version = {
  d: number
  v: number
  '@': number
}