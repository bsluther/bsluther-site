import { v4 as uuid } from 'uuid'
import create, { StateCreator } from 'zustand'
import { Alternative, Comparisons, Criterion, Goal, Matrix, Steps } from './core'
import { fromTraversable, Lens } from 'monocle-ts'
import { pipe } from 'fp-ts/lib/function'
import { append } from 'fp-ts/lib/Array'
import { areAltsComplete, createMatrix, incrementDimension, isComplete, RateAlternativesParams, setCellAndReciprocal, SetCellParams } from './matrix'
import { getTraversable } from 'fp-ts/lib/Record'
import { Ord } from 'fp-ts/lib/string'
import { nytStore, blankStore, catNameStore, secondNytStore, workStore } from './data'

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

const rateCriteria = ({ x, y, rating }: SetCellParams) => (state: AhpStore) => {
  console.log(`criteria rated: x: ${x}, y: ${y}, rating: ${rating}`)
  return pipe(
    state,
    criteriaComparisonLens.modify(setCellAndReciprocal({ x, y, rating }))
  )
}
interface RateCriteria2Params {
  to: number
  against: number
  rating: number
}
const rateCriteria2 = ({ to, against, rating}: RateCriteria2Params) => (state: AhpStore) => {
  console.log(`criteria rated: against: ${against}, to: ${to} rating: ${rating}`)
  return pipe(
    state,
    criteriaComparisonLens.modify(setCellAndReciprocal({
      x: against,
      y: to,
      rating
    }))
  )
}

// in practice this acts as a rating for y, against x
const rateAlternatives = ({ x, y, z, rating }: RateAlternativesParams) => (state: AhpStore) => {
    console.log(`alternative rated: x: ${x}, y: ${y}, z: ${z}, rating: ${rating}`)
    return pipe(
      state,
      alternativeComparisonLens(z).modify(setCellAndReciprocal({ x, y, rating: rating }))
    )
}

interface RateAlternatives2Params {
  against: number
  to: number
  z: string
  rating: number
}
const rateAlternatives2 = ({ against, to, z, rating }: RateAlternatives2Params) => (state: AhpStore) => {
  console.log(`alternative rated: against: ${against}, to: ${to}, z: ${z}, rating: ${rating}`)
  return pipe(
    state,
    alternativeComparisonLens(z).modify(setCellAndReciprocal({ 
      x: against, 
      y: to, 
      rating
    }))
  )
}

export interface AhpStore {
  goal: GoalSlice
  comparisons: ComparisonsSlice
  step: Steps
  gotoStep: (step: Steps) => void
  isStepComplete: (step: Steps) => boolean
  loadNytData: () => void
  loadBriansData: () => void
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
  rateCriteria: (ratingParams: RateCriteria2Params) => void
  rateAlternatives: (ratingParams: RateAlternatives2Params) => void
}



export const useAhpStore = create<AhpStore>()((set, get) => ({
  goal: {
    ...blankStore.goal,
    updateTitle: (title: string) => 
      title.length > 20 ? null : set(goalTitleLens.set(title)),
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
    ...blankStore.comparisons,
    rateCriteria: (rateCriteriaParams: RateCriteria2Params) =>
      set(rateCriteria2(rateCriteriaParams)),
    rateAlternatives: (rateAltsParams: RateAlternatives2Params) =>
      set(rateAlternatives2(rateAltsParams))
  },
  step: Steps.Goal,
  gotoStep: (step: Steps) => set(stepLens.set(step)),
  isStepComplete: (step: Steps) => ({
    [Steps.Goal]: get().goal.title.length > 2,
    [Steps.Alternatives]: get().goal.alternativesOrder.length > 1,
    [Steps.Criteria]: get().goal.criteriaOrder.length > 1,
    [Steps.CompareCriteria]: isComplete(get().comparisons.criteria),
    [Steps.CompareAlternatives]: areAltsComplete(get().comparisons.alternatives),
    [Steps.Results]: false
  }[step]),
  loadNytData: () => set({
    ...get(),
    goal: {
      ...get().goal,
      ...secondNytStore.goal
    },
    comparisons: {
      ...get().comparisons,
      ...secondNytStore.comparisons,
    }
  }),
  loadBriansData: () => set({
    ...get(),
    goal: {
      ...get().goal,
      ...workStore.goal
    },
    comparisons: {
      ...get().comparisons,
      ...workStore.comparisons,
    }
  })
}))