import { axisBottom, max, scaleBand, scaleLinear, select } from 'd3'
import { useEffect, useRef } from 'react'

interface Datum {
  criteriaTitle: string
  weight: number
}

interface BarChartProps {
  data: Datum[]
  criteriaTitles: string[]
}

const colors = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999']

export const BarChart = ({ data, criteriaTitles }: BarChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (svgRef.current && wrapperRef.current) {
      const svg = select(svgRef.current)
      const { width, height } = wrapperRef.current.getBoundingClientRect()

      const extent =[0,  max(data, dtm => dtm.weight) ?? 0]
      const xScale = scaleBand()
        .domain(criteriaTitles)
        .range([0, width])
        .padding(0.25)
      const xAxis = axisBottom(xScale)
      svg
        .select<SVGGElement>('#x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

      const yScale = scaleLinear()
        .domain(extent)
        .range([height, 0])
      
      
      const bar = svg.append('g')
        .attr('fill', (_, ix) => colors[ix])
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', a => xScale(a.criteriaTitle) ?? null)
        .attr('y', dtm => yScale(dtm.weight))
        .attr('height', dtm => yScale(0) - yScale(dtm.weight))
        .attr('width', xScale.bandwidth())
        .attr('fill', (dtm, ix) => colors[ix])
    }
  }, [data, svgRef.current, wrapperRef.current])

  console.log('data', data)
  return (
    <>
      <div
        ref={wrapperRef}
        className='flex flex-col items-center justify-center w-3/4 h-3/4 mb-8'
      >
        <svg ref={svgRef} className='w-full h-full text-neutral-900 overflow-visible'>
          <g id='x-axis' />   
          <g id='y-axis' />
        </svg>
      </div>
    </>
  )
}