/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

const svg = d3.select('#chart-area')
  .append('svg')
    .attr('width', 500)
    .attr('height', 400)

svg
  .append('line')
    .attr('x1', 10)
    .attr('y1', 10)
    .attr('x2', 50)
    .attr('y2', 50)
    .attr('stroke', 'blue')
    .attr('stroke-width', '5')

svg
  .append('rect')
    .attr('x', 60)
    .attr('y', 10)
    .attr('width', '100')
    .attr('height', '150')
    .attr('fill', 'yellow')

svg.
  append('ellipse')
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('rx', 100)
    .attr('ry', 50)
    .attr('fill', 'red')