interface SimpleUnit {
  type: 'SimpleUnit',
  factor: number,
  name: string,
  synonyms: string[]
}

interface ProductUnit {
  type: 'ProductUnit'
  units: SimpleUnit[]
}

interface QuotientUnit {
  type: 'QuotientUnit'
  numerator: ProductUnit | SimpleUnit
  denominator: ProductUnit | SimpleUnit
}

type CompositeUnit = ProductUnit | QuotientUnit

type Unit = SimpleUnit | CompositeUnit

const meter: SimpleUnit = {
  type: 'SimpleUnit',
  factor: 1,
  name: 'meter',
  synonyms: ['m', 'metre', 'meters', 'metres']
}

const foot: SimpleUnit = {
  type: 'SimpleUnit',
  factor: .3048,
  name: 'foot',
  synonyms: ['ft', 'feet']
}

const inch: SimpleUnit = {
  type: 'SimpleUnit',
  factor: .0254,
  name: 'inch',
  synonyms: ['in', 'inches']
}



const factor = (unit: Unit): number => {
  if (unit.type === 'SimpleUnit') {
    return unit.factor
  }
  if (unit.type === 'ProductUnit') {
    return unit.units.reduce((acc, x) => acc * factor(x), 1)
  }
  if (unit.type === 'QuotientUnit') {
    return factor(unit.numerator) / factor(unit.denominator)
  }
  return 1 as never
}

console.log(factor(foot))

// export const convert = (unit_s: SimpleUnit, unit_d: SimpleUnit) => {

// }

export const test = factor(foot)