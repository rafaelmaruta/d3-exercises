/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const margin = {
  bottom: 100,
  left: 100,
  right: 20,
  top: 10
}
const canvasWidth = 600 - margin.left - margin.right
const canvasHeight = 400 - margin.top - margin.bottom

const svg = d3.select('#chart-area')
  .append('svg')
    .attr('width', canvasWidth + margin.left + margin.right)
    .attr('height', canvasHeight + margin.top + margin.bottom)

const g = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

g.append('text')
  .attr('x', -canvasHeight / 2)
  .attr('y', -70)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Revenue')


g.append('text')
  .attr('x', canvasWidth / 2)
  .attr('y', canvasHeight + 50)
  .attr('text-anchor', 'middle')
  .text('Months')

d3.json('data/revenues.json').then(data => {
  data.forEach(data => {
    data.revenue = +data.revenue
    data.profit = +data.profit
  })

  const revenueMax = d3.max(data, d => d.revenue)
  const categories = data.map(data => data.month)

  const scaleX = d3.scaleBand()
    .domain(categories)
    .range([0, canvasWidth])
    .padding(0.2)

  const scaleY = d3.scaleLinear()
    .domain([0, revenueMax])
    .range([canvasHeight, 0])

  const xAxisCall = d3.axisBottom(scaleX)
  g.append('g')
    .attr('transform', `translate(0 ,${canvasHeight})`)
    .call(xAxisCall)

  const yAxisCall = d3.axisLeft(scaleY)
    .tickFormat(d => `$${d}`)
  g.append('g')
    .call(yAxisCall)


  g.selectAll('rect').data(data).enter()
    .append('rect')
      .attr('x', d => scaleX(d.month))
      .attr('y', d => scaleY(d.revenue))
      .attr('width', scaleX.bandwidth)
      .attr('height', d => canvasHeight - scaleY(d.revenue))
      .attr('fill', 'grey')
})