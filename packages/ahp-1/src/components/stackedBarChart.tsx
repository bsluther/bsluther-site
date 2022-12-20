import React, { useEffect, useRef } from 'react'
import { select, scaleBand, axisBottom, stack, max, scaleLinear, axisLeft } from 'd3'

// interface Data {
//   // alternativeTitle: string
//   [key: string]: number
// }

// type Data = { [key: string]: number }[]

// interface AlternativesData {
//   alternativesLabels: string[]
//   criteriaLabels: string[]
//   alternativesData: {
//     alternativesTitle: string
//     [key: string]: number
//   }[]1
// }


// export interface Datum {
//   [titleSymbol]: string
//   [key: string]: number
// }

export interface Datum {
  alternativeTitle: string,
  weights: { [key: string]: number }
}
type Data = Datum[]
interface StackedBarChartProps {
  alternativesLabels: string[]
  criteriaLabels: string[],
  data: Data
}


const colors = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999']

const Key = ({ seriesColors }: { seriesColors: Record<string, string> }) =>
  <div className='flex space-x-2 sm:space-x-8 text-xs sm:text-base flex-wrap'>
    {Object.entries(seriesColors).map(([label, color]) => 
      <span 
        key={label} 
        style={{ backgroundColor: color }}
        className='px-2 py-1'
      >{label}</span>)}
  </div>

export const StackedBarChart = ({ alternativesLabels, criteriaLabels, data }: StackedBarChartProps ) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const seriesColors = criteriaLabels.reduce((acc, label, ix) => ({ ...acc, [label]: colors[ix] ?? 'purple' }), {} as Record<string, string>)
  console.log('alternativesData', data)

  useEffect(() => {
    if (svgRef.current && wrapperRef.current) {
      const svg = select(svgRef.current)
      const { width, height } = wrapperRef.current.getBoundingClientRect()

      // note: a series is a layer, intuitively
      const stackGenerator = stack<Datum>()
        .keys(criteriaLabels) // .keys tells D3 which properties (series) in the dataset to use
        .value((obj, key) => obj.weights[key]) // this avoids the typescript problem of having to specify arbitrary string keys as number values, while still having a string key string value "alternativeTitle" property by nesting the "value" inside an object, named "weights"

      const layers = stackGenerator(data)
      const extent = [0, max(layers, layer => max(layer, sequence => sequence[1])) ?? 0]
      console.log('layers aka series', layers)
      console.log('extent', extent)

      const xScale = scaleBand()
        .domain(alternativesLabels)
        .range([0, width])
        .padding(0.25)

      const yScale = scaleLinear()
        .domain(extent)
        .range([height, 0])

      const xAxis = axisBottom(xScale)
      svg
        .select<SVGGElement>('#x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

      const yAxis = axisLeft(yScale)
      svg
        .select<SVGGElement>('#y-axis')
        .call(yAxis)

      svg
        .selectAll('.layer')
        .data(layers)
        .join('g')
        .attr('class', 'layer')
        .attr('fill', series => {
          // console.log('series in fill attr', series)
          return seriesColors[series.key]
        })
        .selectAll('rect')
        .data(layer => layer)
        .join('rect')
        .attr('x', sequence => {
          return xScale(sequence.data.alternativeTitle) ?? null // This is where we look to find the "title" for each bar of the graph
        })
        .attr('width', xScale.bandwidth())
        .attr('y', sequence => yScale(sequence[1]))
        .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))
    }
  }, [data, svgRef.current, wrapperRef.current])

  return (
    <>
      <Key seriesColors={seriesColors} />
      <div 
        ref={wrapperRef}
        className='flex flex-col items-center justify-center w-3/4 h-3/4 my-8'
      >
        <svg ref={svgRef} className='w-full h-full text-neutral-900 overflow-visible'>
          <g id='x-axis' />
          <g id='y-axis' />
        </svg>
      </div>
    </>
  )
}