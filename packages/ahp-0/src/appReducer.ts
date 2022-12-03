import { v4 as uuid } from 'uuid'
import { Lens } from 'monocle-ts'
import { Reducer } from 'react'
import { pipe } from 'fp-ts/lib/function'
import { Goal, Alternative, Steps, Criterion, Comparisons, Matrix, Rating } from './core'
import { append, concat, filter as filterArray } from 'fp-ts/lib/Array'
import { filter as filterRecord } from 'fp-ts/lib/ReadonlyRecord'
import * as O from 'fp-ts/Option'

export interface AppState {
  goal: Goal
  comparisons: Comparisons
  step: Steps
}

export const initStore = (): AppState => {
  const initialAltId = uuid()
  const initialCrtId = uuid()
  return {
    goal: {
      id: uuid(),
      description: '',
      alternatives: {
        [initialAltId]: {
          id: initialAltId,
          description: ''
        }
      },
      alternativesOrder: [initialAltId],
      criteria: {
        [initialCrtId]: {
          id: initialCrtId,
          description: ''
        }
      },
      criteriaOrder: [initialCrtId]
    },
    comparisons: {
      id: uuid(),
      criteria: [[1]],
      alternatives: {}
    },
    step: Steps.Goal
}}

/*** MATRIX OPERATIONS ***/

const incrementDimension = (mtx: Matrix): Matrix =>
  mtx.map(row => [...row, 'EMPTY' as 'EMPTY'])
  .concat([new Array(mtx.length).fill('EMPTY' as 'EMPTY', 0, mtx.length).concat(1)])

const removeIndex = (ix: number) => (mtx: Matrix) =>
  mtx.slice(0, ix).concat(mtx.slice(ix + 1)).map(row => row.slice(0, ix).concat(row.slice(ix + 1)))

export const findEmpty = (mtx: Matrix) => {
  let result
  for (let i = 0; i < mtx.length; i++) {
    for (let k = 0; k < mtx[i].length; k++) {
      if (mtx[i][k] === 'EMPTY') {
        result = ({ x: k, y: i })
        break
      }
    }
    if (result) {
      break
    }
  }
  return result ? O.some(result) : O.none
}

const updateIndex = <T>(updater: (el: T) => T) => (ix: number) => (arr: T[]) => {
  const left = arr.slice(0, ix)
  const right = arr.slice(ix + 1)
  const newEl = [updater(arr[ix])]

  return pipe(
  	left,
    concat(newEl),
    concat(right)
  )
}

const setCell = ({ x, y, rating}: SetCriteriaCellParams) => (mtx: Matrix) => {
  return updateIndex<Rating[]>(row => updateIndex<Rating>(() => rating)(x)(row))
                              (y)
                              (mtx)
}
/*************************/




const makeLens = Lens.fromPath<AppState>()
const stepLens = makeLens(['step'])
const incrementStep = stepLens.modify(prev => prev === Steps.Results ? prev : prev + 1)
const goalDescriptionLens = makeLens(['goal', 'description'])

const alternativesLens = makeLens(['goal', 'alternatives'])
const alternativesOrderLens = makeLens(['goal', 'alternativesOrder'])
const appendAlternative = (state: AppState) => {
  const newAlt = ({ id: uuid(), description: '' })
  
  return pipe(
    state,
    makeLens(['goal', 'alternatives', newAlt.id]).set(newAlt),
    alternativesOrderLens.modify(append(newAlt.id))
  )
}

const updateAlternativeDesc = (id: string) => (desc: string) =>
  makeLens(['goal', 'alternatives', id, 'description']).set(desc)
const removeAlternative = (id: string) => (state: AppState) =>
  pipe(
    state,
    alternativesLens.modify(filterRecord((alt: Alternative) => alt.id !== id)),
    alternativesOrderLens.modify(filterArray((altId: string) => altId !== id))
  )

export const getCriterionIndex = (id: string) => (state: AppState) =>
  makeLens(['goal', 'criteriaOrder']).get(state).findIndex(str => str === id)

const appendCriterion = (state: AppState) => {
  const newCrt = ({ id: uuid(), description: '' })

  return pipe(
    state,
    makeLens(['goal', 'criteria', newCrt.id]).set(newCrt),
    makeLens(['goal', 'criteriaOrder']).modify(append(newCrt.id)),
    makeLens(['comparisons', 'criteria']).modify(incrementDimension)
  )
}

const describeCriterion = (id: string) => (desc: string) =>
  makeLens(['goal', 'criteria', id, 'description']).set(desc)

const removeCriterion = (id: string) => (state: AppState) =>
  pipe(
    state,
    makeLens(['goal', 'criteria']).modify(filterRecord((crt: Criterion) => crt.id !== id)),
    makeLens(['goal', 'criteriaOrder']).modify(filterArray((crtId: string) => crtId !== id)),
    makeLens(['comparisons', 'criteria']).modify(removeIndex(getCriterionIndex(id)(state)))
  )
export interface SetCriteriaCellParams {
  x: number
  y: number
  rating: number
}
const setCriteriaCell = ({ x, y, rating }: SetCriteriaCellParams) => (state: AppState) =>
  pipe(
    state,
    makeLens(['comparisons', 'criteria']).modify(setCell({ x, y , rating })),
    makeLens(['comparisons', 'criteria']).modify(setCell({ x: y, y: x, rating: -rating }))
  )

export type Action =
  | { type: 'describeGoal', payload: string }
  | { type: 'gotoStep', payload: Steps }
  | { type: 'addAlternative', payload: {} }
  | { type: 'updateAlternative', payload: { id: string, description: string } }
  | { type: 'removeAlternative', payload: { id: string } }
  | { type: 'appendCriterion', payload: {} }
  | { type: 'describeCriterion', payload: { id: string, description: string} }
  | { type: 'removeCriterion', payload: { id: string } }
  | { type: 'setCriteriaCell', payload: { x: number, y: number, rating: number }}
  
export const appReducer: Reducer<AppState, Action> = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'describeGoal':
      if (stepLens.get(state) === Steps.Goal) {
        return pipe(
          state,
          incrementStep,
          goalDescriptionLens.set(payload)
        )
      }
      return goalDescriptionLens.set(payload)(state)

    case 'gotoStep':
      return { ...state, step: payload}

    case 'addAlternative':
      return appendAlternative(state)

    case 'updateAlternative':
      return updateAlternativeDesc(payload.id)(payload.description)(state)

    case 'removeAlternative':
      return removeAlternative(payload.id)(state)

    case 'appendCriterion':
      return appendCriterion(state)

    case 'describeCriterion':
      return describeCriterion(payload.id)(payload.description)(state)

    case 'removeCriterion':
      return removeCriterion(payload.id)(state)

    case 'setCriteriaCell':
      return setCriteriaCell(payload)(state)

    default: return state
  }
}

export const isStepComplete: Record<Steps, (store: AppState) => boolean> = {
  [Steps.Goal]: (store: AppState) => store.goal.description.length > 2,
  [Steps.Alternatives]: (store: AppState) => store.goal.alternativesOrder.length > 1,
  [Steps.Criteria]: (store: AppState) => store.goal.criteriaOrder.length > 1,
  [Steps.CompareCriteria]: (store: AppState) => false,
  [Steps.CompareAlternatives]: (store: AppState) => false,
  [Steps.Results]: (store: AppState) => false
}