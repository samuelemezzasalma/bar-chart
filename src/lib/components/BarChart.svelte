<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let allGdpData;
	const dataset = allGdpData.data;

	let el;
	let boxWidth;
	const h = 800;
	const padding = 15;

	let xScale;
	let yScale;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			// for (const entry of entries) {
			//        if (entry.contentBoxSize) {
			//               // Firefox implements `contentBoxSize` as a single content rect, rather than an array
			//               boxWidth = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0].blockSize : entry.contentBoxSize.blockSize;
			//               adaptChart()
			//        }
			// }

			// We're only watching one element
			const entry = entries.at(0);

			//Get the block size
			boxWidth = entry.contentBoxSize[0].inlineSize;
			adaptChart(boxWidth);
		});
		resizeObserver.observe(el);

		boxWidth = parseInt(d3.select(el).style('width').slice(0, -2), 10);
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(dataset, (d) => d[1])])
			.range([0, h]);

		const xScale = d3
			.scaleLinear()
			.domain([1, dataset.length])
			.range([0, boxWidth]);

		function adaptChart() {
			d3.select('.svg-content-responsive').attr('width', boxWidth);

			// Update the X scale and Axis (here the 20 is just to have a bit of margin)
			xScale.range([0, boxWidth]);
			// xAxis.call(d3.axisBottom(x))
		}

		function drawChart() {
			const svg = d3
				.select(el)
				.append('svg')
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', `0 0 ${boxWidth} ${h}`)
				.attr('width', boxWidth)
				.attr('height', h)
				.attr('class', 'svg-content-responsive');

			svg
				.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.attr('x', (d, i) => {
					return xScale(i + 1);
				})
				.attr('y', (d, i) => {
					return h - yScale(d[1])
				})
				.attr('width', boxWidth / dataset.length)
				.attr('height', (d, i) => yScale(d[1]))
				// .attr('transform', `translate(${60}, 0)`)
				.attr('fill', 'navy')
				.attr('class', 'bar');

			const xAxis = d3.axisBottom(xScale);

			svg.append('g').attr('transform', `translate(0, ${h})`).call(xAxis);
		}

		drawChart();

		return () => {
			resizeObserver.unobserve(el);
		};
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
		border: 1px solid black;
		position: relative;
		top: 0;
		left: 0;
	}

	.svg-content-responsive {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
