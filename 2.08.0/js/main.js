/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

const svg = d3.select('#chart-area')
  .append('svg')
    .attr('width', 500)
    .attr('height', 500)

const barWidth = 50
const barPadding = 10

d3.json('data/buildings.json')
  .then(data => {

    data.forEach(row => {
      data.height = +data.height
    })

    svg.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('x', (data, i) => i * (barWidth + barPadding))
        .attr('width', barWidth)
        .attr('height', data => data.height)
        .attr('fill', 'green')

  })
  .catch(error => {
    throw new Error(error)
  })