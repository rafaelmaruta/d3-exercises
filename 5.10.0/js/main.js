/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
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
  .text('Life Expectancy')


g.append('text')
  .attr('x', canvasWidth / 2)
  .attr('y', canvasHeight + 50)
  .attr('text-anchor', 'middle')
  .text('GDP')

const yearText = g.append('text')
  .attr('x', canvasWidth)
  .attr('y', canvasHeight - 10)
  .attr('text-anchor', 'end')

const scaleX = d3.scaleLinear()
  .domain([400, 40000])
  .range([0, canvasWidth])

const scaleY = d3.scaleLinear()
  .domain([0, 90])
  .range([canvasHeight, 0])

let counter = 0

d3.json('data/data.json').then(data => {
  const maxPopulation = d3.max(data[data.length-1].countries, d => d.population)

  const scalePopulation = d3.scaleLinear()
    .domain([0, maxPopulation])
    .range([5, 25])

  const xAxisCall = d3.axisBottom(scaleX)
  g.append('g')
    .attr('transform', `translate(0 ,${canvasHeight})`)
    .call(xAxisCall)

  const yAxisCall = d3.axisLeft(scaleY)
  g.append('g')
    .call(yAxisCall)

  d3.interval(() => {
    if (counter < data.length) {
      update(counter, data, scalePopulation)
      counter++
    } else {
      counter = 0
      update(counter, data, scalePopulation)
    }
  }, 100)
})

const update = (counter, data, scalePopulation) => {
  yearText.text(data[counter].year)

  const newData = data[counter].countries
    .filter(data => data.income && data.life_exp && data.population)

  newData.forEach(data => {
    newData.income = +newData.income
    newData.life_exp = +newData.life_exp
    newData.population = +newData.population
  })

  const circles = g.selectAll('circle').data(newData)

  circles.exit().remove()

  circles.enter().append('circle')
    .attr('fill', 'grey')
      .merge(circles)
      .transition(20)
      .attr('cx', d => scaleX(d.income) + scalePopulation(d.population) / 2)
      .attr('cy', d => scaleY(d.life_exp))
      .attr('r', d => scalePopulation(d.population))
}