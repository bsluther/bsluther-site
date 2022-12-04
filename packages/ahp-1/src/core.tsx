export enum Steps {
  Goal = 1,
  Alternatives,
  Criteria,
  CompareCriteria,
  CompareAlternatives,
  Results
}

export interface Goal {
  id: string
  title: string
  description: string
  alternatives: Alternatives
  alternativesOrder: string[]
  criteria: Criteria
  criteriaOrder: string[]
}

export type Rating = number | 'EMPTY'
export type Matrix = (Rating)[][]

export interface Comparisons {
  id: string
  criteria: Matrix
  alternatives: AlternativesComparisons
}

export interface AlternativesComparisons {
  [key: string]: Matrix
}

export interface Alternative {
  id: string
  title: string
  description: string
}

export interface Alternatives {
  [key: string]: Alternative
}

export interface Criterion {
  id: string
  title: string
  description: string
}

export interface Criteria {
  [key: string]: Criterion
}

export type Entity = Alternative | Criterion