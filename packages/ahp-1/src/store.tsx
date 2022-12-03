import { v4 as uuid } from 'uuid'
import create from 'zustand'
import { Alternative, Comparisons, Goal, Steps } from './core'
import { Lens } from 'monocle-ts'
import { pipe } from 'fp-ts/lib/function'
import { append } from 'fp-ts/lib/Array'

const lens = Lens.fromPath<AhpStore>()
const stepLens = lens(['step'])
const goalTitleLens = lens(['goal', 'title'])
const goalDescriptionLens = lens(['goal', 'description'])
const alternativeLens = (id: string) => lens(['goal', 'alternatives', id])
const alternativesLens = lens(['goal', 'alternatives'])
const alternativesOrderLens = lens(['goal', 'alternativesOrder'])
const appendAlternative = (alt: Alternative) => (state: AhpStore) =>
  pipe(
    state,
    // lens(['goal', 'alternatives', alt.id]).set(alt),
    alternativeLens(alt.id).set(alt),
    alternativesOrderLens.modify(append(alt.id))
  )
const updateAlternative = (updater: (alt: Alternative) => Alternative) => (id: string) => (state: AhpStore) => {
  console.log(alternativeLens(id).modify(updater)(state))
  return pipe(
    state,
    alternativeLens(id).modify(updater)
  )
}
export interface AhpStore {
  goal: Goal
  comparisons: Comparisons
  step: Steps
  gotoStep: (step: Steps) => void
  isStepComplete: (step: Steps) => boolean
}

const initialAlternativeId = uuid()
const initialCriterionId = uuid()

export const useAhpStore = create<AhpStore>((set, get) => ({
  goal: {
    id: uuid(),
    title: '',
    description: '',
    alternatives: {
      [initialAlternativeId]: {
        id: initialAlternativeId,
        title: '',
        description: ''
      }
    },
    alternativesOrder: [initialAlternativeId],
    criteria: {
      [initialCriterionId]: {
        id: initialCriterionId,
        title: '',
        description: ''
      }
    },
    criteriaOrder: [initialCriterionId],
    updateTitle: (title: string) => 
      title.length > 15 ? null : set(goalTitleLens.set(title)),
    updateDescription: (desc: string) => 
      desc.length > 150 ? null : set(goalDescriptionLens.set(desc)),
    orderedAlternatives: () =>
      get().goal.alternativesOrder.map(altId => get().goal.alternatives[altId]),
    appendAlternative: (alt: Alternative) => set(appendAlternative(alt)),
    updateAlternative: (updater: (alt: Alternative) => Alternative) => (id: string) =>
      set(state => updateAlternative(updater)(id)(state))
  },
  comparisons: {
    id: uuid(),
    criteria: [[1]],
    alternatives: {
      [initialAlternativeId]: [[1]]
    }
  },
  step: Steps.Goal,
  gotoStep: (step: Steps) => set(stepLens.set(step)),
  isStepComplete: (step: Steps) => ({
    [Steps.Goal]: get().goal.title.length > 2,
    [Steps.Alternatives]: false,
    [Steps.Criteria]: false,
    [Steps.CompareCriteria]: false,
    [Steps.CompareAlternatives]: false,
    [Steps.Results]: false
  }[step])
}))