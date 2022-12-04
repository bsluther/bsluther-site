import { v4 as uuid } from 'uuid'
import create, { StateCreator } from 'zustand'
import { Alternative, Comparisons, Criterion, Goal, Matrix, Steps } from './core'
import { fromTraversable, Lens } from 'monocle-ts'
import { pipe } from 'fp-ts/lib/function'
import { append } from 'fp-ts/lib/Array'
import { createMatrix, incrementDimension, setCell, setCellAndReciprocal, SetCellParams } from './matrix'
import { Traversable } from 'fp-ts/lib/ReadonlyRecord'
import { getTraversable } from 'fp-ts/lib/Record'
import { string } from 'fp-ts'
import { Ord } from 'fp-ts/lib/string'
import { alt } from 'fp-ts/lib/pipeable'

const lens = Lens.fromPath<AhpStore>()

const stepLens = lens(['step'])

const goalTitleLens = lens(['goal', 'title'])
const goalDescriptionLens = lens(['goal', 'description'])

const alternativeLens = (id: string) => lens(['goal', 'alternatives', id])
const alternativesLens = lens(['goal', 'alternatives'])
const alternativesOrderLens = lens(['goal', 'alternativesOrder'])

const criterionLens = (id: string) => lens(['goal', 'criteria', id])
const criteriaOrderLens = lens(['goal', 'criteriaOrder'])

const criteriaComparisonLens = lens(['comparisons', 'criteria'])
const alternativeComparisonLens = (altId: string) =>
  lens(['comparisons', 'alternatives', altId])

const comparisonsLens = Lens.fromProp<AhpStore>()('comparisons')
const altsLens = Lens.fromProp<AhpStore['comparisons']>()('alternatives')
const alternativesTraversal = fromTraversable(getTraversable(Ord))<Matrix>()
const altCompTraversal = comparisonsLens.composeLens(altsLens).composeTraversal(alternativesTraversal)

const appendAlternative = (alt: Alternative) => (state: AhpStore) =>
  pipe(
    state,
    alternativeLens(alt.id).set(alt),
    alternativesOrderLens.modify(append(alt.id)),
    altCompTraversal.modify(incrementDimension)
  )

const updateAlternative = (updater: (alt: Alternative) => Alternative) => (id: string) => (state: AhpStore) => {

  return pipe(
    state,
    alternativeLens(id).modify(updater)
  )
}

const appendCriterion = (crt: Criterion) => (state: AhpStore) =>
  pipe(
    state,
    criterionLens(crt.id).set(crt),
    criteriaOrderLens.modify(append(crt.id)),
    criteriaComparisonLens.modify(incrementDimension),
    alternativeComparisonLens(crt.id).set(createMatrix(state.goal.alternativesOrder.length))
  )

const updateCriterion = (updater: (crt: Criterion) => Criterion) => (id: string) => (state: AhpStore) =>
  pipe(
    state,
    criterionLens(id).modify(updater)
  )

const rateCriteria = ({ x, y, rating }: SetCellParams) => (state: AhpStore) => 
  pipe(
    state,
    criteriaComparisonLens.modify(setCellAndReciprocal({ x, y, rating }))
  )

export interface AhpStore {
  goal: GoalSlice
  comparisons: ComparisonsSlice
  step: Steps
  gotoStep: (step: Steps) => void
  isStepComplete: (step: Steps) => boolean
}

interface GoalSlice extends Goal {
  updateTitle: (title: string) => void
  updateDescription: (desc: string) => void
  orderedAlternatives: () => Alternative[]
  appendAlternative: (alt: Alternative) => void
  updateAlternative: (updater: (alt: Alternative) => Alternative) => (id: string) => void
  orderedCriteria: () => Criterion[]
  appendCriterion: (crt: Criterion) => void
  updateCriterion: (updater: (crt: Criterion) => Criterion) => (id: string) => void 
}

interface ComparisonsSlice extends Comparisons {
  rateCriteria: (rating: SetCellParams) => void
}

export const useAhpStore = create<AhpStore>()((set, get) => ({
  goal: {
    id: uuid(),
    title: '',
    description: '',
    alternatives: {},
    alternativesOrder: [],
    criteria: {},
    criteriaOrder: [],
    updateTitle: (title: string) => 
      title.length > 15 ? null : set(goalTitleLens.set(title)),
    updateDescription: (desc: string) => 
      desc.length > 150 ? null : set(goalDescriptionLens.set(desc)),
    orderedAlternatives: () =>
      get().goal.alternativesOrder.map(altId => get().goal.alternatives[altId]),
    appendAlternative: (alt: Alternative) => set(appendAlternative(alt)),
    updateAlternative: (updater: (alt: Alternative) => Alternative) => (id: string) =>
      set(state => updateAlternative(updater)(id)(state)),
    orderedCriteria: () =>
      get().goal.criteriaOrder.map(crtId => get().goal.criteria[crtId]),
    appendCriterion: (crt: Criterion) => set(appendCriterion(crt)),
    updateCriterion: (updater: (crt: Criterion) => Criterion) => (id: string) =>
      set(state => updateCriterion(updater)(id)(state))
  },
  comparisons: {
    id: uuid(),
    criteria: [] as Matrix,
    alternatives: {} as Record<string, Matrix>,
    rateCriteria: (setCellParams: SetCellParams) =>
      set(rateCriteria(setCellParams))
  },
  step: Steps.Goal,
  gotoStep: (step: Steps) => set(stepLens.set(step)),
  isStepComplete: (step: Steps) => ({
    [Steps.Goal]: get().goal.title.length > 2,
    [Steps.Alternatives]: get().goal.alternativesOrder.length > 1,
    [Steps.Criteria]: get().goal.criteriaOrder.length > 1,
    [Steps.CompareCriteria]: false,
    [Steps.CompareAlternatives]: false,
    [Steps.Results]: false
  }[step])
}))