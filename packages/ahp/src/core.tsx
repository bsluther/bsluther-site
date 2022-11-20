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
  description: string
  alternatives: Alternatives,
  alternativesOrder: string[]
  criteria: Criteria
  criteriaOrder: string[]
}

export interface Alternative {
  id: string
  description: string
}

export interface Alternatives {
  [key: string]: Alternative
}

export interface Criterion {
  id: string
  description: string
}

export interface Criteria {
  [key: string]: Criterion
}

export type Entity = Alternative | Criterion