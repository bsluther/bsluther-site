import React, { useEffect, useRef } from 'react'
import { select, scaleBand, axisBottom, stack, max, scaleLinear, axisLeft } from 'd3'

interface AlternativesData {
  alternativesLabels: string[]
  criteriaLabels: string[],
  alternativesData: { [key: string]: number }[]
}

interface StackedBarChartProps {
  data: AlternativesData
}

const color = {
  Income: 'blue',
  Time_away: 'red',
  School: 'green',
  Job_location: 'yellow',
  Crew: 'orange'
}

const Key = () =>
  <div className='flex space-x-8'>
    {Object.entries(color).map(([label, color]) => <span style={{ color }}>{label}</span>)}
  </div>

export const StackedBarChart = ({ data }: StackedBarChartProps ) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  console.log('alternativesData', data.alternativesData)
  useEffect(() => {
    if (svgRef.current && wrapperRef.current) {
      const svg = select(svgRef.current)
      const { width, height } = wrapperRef.current.getBoundingClientRect()

      const stackGenerator = stack().keys(data.criteriaLabels)
      const layers = stackGenerator(data.alternativesData)
      const extent = [0, max(layers, layer => max(layer, sequence => sequence[1])) ?? 0]
      console.log('layers', layers)
      console.log('extent', extent)

      const xScale = scaleBand()
        .domain(data.alternativesLabels)
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
        .attr('fill', layer => color[layer.key])
        .selectAll('rect')
        .data(layer => layer)
        .join('rect')
        .attr('x', sequence => {
          // console.log('swq', sequence)
          return xScale(sequence.data.alternativeTitle)
        })
        .attr('width', xScale.bandwidth())
        .attr('y', sequence => yScale(sequence[1]))
        .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))
    }
  }, [data, svgRef.current, wrapperRef.current])

  return (
    <>
      <div 
        ref={wrapperRef}
        className='flex flex-col items-center justify-center w-3/4 h-3/4 mb-8 overflow-visible'
      >
        <Key />
        <svg ref={svgRef} className='w-full h-full border border-neutral-800 text-neutral-900 overflow-visible'>
          <g id='x-axis' className='' />
          <g id='y-axis' className='y-axis bg-red-400' />
        </svg>
      </div>
    </>
  )
}