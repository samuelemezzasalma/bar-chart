<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let allGdpData;
	const dataset = allGdpData.data;

	// console.log(dataset)

	let el;
	let xScale;
	let yScale;

	onMount(() => {
		const width = 1000;
		const h = 600;
		const padding = 60;
		// console.log(`max dataset: ${d3.max(dataset, (d) => d[1])}`)
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(dataset, (d) => d[1])])
			.range([0, h])
			.nice();

		var yearsDate = dataset.map((item) => {
			return new Date(item[0]);
		});

		var xMax = new Date(d3.max(yearsDate));
		xMax.setMonth(xMax.getMonth() + 3);
		var xScale = d3
			.scaleTime()
			.domain([d3.min(yearsDate), xMax])
			.range([padding, width + padding])
			.nice();

		function drawChart() {
			let minDistance = 0;
			function getMinDistance(previousX, currentX) {
				const minD = currentX - previousX;
				if (minDistance > 0) {
					minDistance = minD < minDistance ? minD : minDistance;
				} else {
					minDistance = minD;
				}
				// console.log(minDistance);
			}

			const svg = d3
				.select(el)
				.append('svg')
				.attr('width', width + padding * 2)
				.attr('height', h + padding * 2);

			const tooltip = d3.select(el)
			.append('div')
			.attr('id', 'tooltip')
			.style('opacity', 0);

			svg
				.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.attr('x', (d, i) => {
					if (i > 1) {
						getMinDistance(xScale(yearsDate[i - 1]), xScale(yearsDate[i]));
					}
					return xScale(yearsDate[i]);
				})
				.attr('y', (d, i) => {
					return h - yScale(d[1]);
				})
				.attr('width', (d, i) => {
					return (60 / 100) * minDistance;
				})
				.attr('height', (d, i) => {
					// console.log(`rect h not scaled ${d[1]}`)
					// console.log(`rect h scaled: ${yScale(d[1])}`)
					return yScale(d[1]);
				})
				/* "data-date" and "data-gdp */
				.attr('data-date', (d, i) => d[0])
				.attr('data-gdp', (d, i) => d[1])
				.on('mouseover', (event, values, k) => {
					d3.select(event.currentTarget).style('fill', 'yellow');
					const xtooltip = event.currentTarget.getAttribute('x') + 100;
					const month = +values[0].slice(5, 7);
					const year = +values[0].slice(0, 4);
					let quaterly;
					if (month <= 4) {
						quaterly = `Q1`;
					} else if (month <= 8) {
						quaterly = `Q2`;
					} else {
						quaterly = `Q3`;
					}
					tooltip
						.attr('data-date', values[0])
						.style('position', 'absolute')
						.style('left', xtooltip + 'px')
						.style('top', h - 200 + 'px')
						.style('background-color', 'black')
						.style('color', 'white')
						.style('opacity', 1)
						.html(`Date: ${year} ${quaterly},<br>GDP: ${values[1]}`);
				})
				.on('mouseout', (event, d) => {
					d3.select(event.currentTarget).style('fill', 'navy');
					tooltip
					.style('opacity', 0);
				})
				.attr('fill', 'navy')
				.attr('class', 'bar');

			const xAxis = d3.axisBottom().scale(xScale);

			svg.append('g').attr('transform', `translate(0,  ${h} )`).attr('id', 'x-axis').call(xAxis);

			const yAxisScale = d3
				.scaleLinear()
				.domain([0, d3.max(dataset, (d) => d[1])])
				.range([h, 0])
				.nice();

			var yAxis = d3.axisLeft(yAxisScale);
			svg
				.append('g')
				.call(yAxis)
				.attr('id', 'y-axis')
				.attr('transform', `translate(${padding}, 0)`);
		}

		drawChart();
	});
</script>

<div bind:this={el} class="chart" />

<style>
	/* :global(div) */
	.chart {
		/* font: 10px sans-serif; */
		/* background-color: steelblue; */
		/* text-align: right; */
		/* padding: 3px; */
		/* margin: 1px; */
		/* color: white; */
		/* border: 1px solid black; */
		height: 920px;
		width: 920px;
		position: relative;
		/* top: 0;
		left: 0; */
	}

	svg > rect.bar:hover {
		fill: yellow;
	}

	.svg-content-responsive {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
