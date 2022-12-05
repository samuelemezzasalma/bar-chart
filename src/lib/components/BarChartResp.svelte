<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let allGdpData;
	const dataset = allGdpData.data;

	let el;
	let boxWidth;
	const h = 800;
	const padding = 30;

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
			console.log(entry)

			//Get the block size
			boxWidth = entry.contentBoxSize[0].inlineSize;
			adaptChart(boxWidth);
		});
		resizeObserver.observe(el);

		boxWidth = parseInt(d3.select(el).style('width').slice(0, -2), 10);
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(dataset, (d) => d[1])])
			.range([padding, h - padding]);

			var yearsDate = dataset.map(function (item) {
      return new Date(item[0]);
    });

    var xMax = new Date(d3.max(yearsDate));
    xMax.setMonth(xMax.getMonth() + 3);
    var xScale = d3
      .scaleTime()
      .domain([d3.min(yearsDate), xMax])
      .range([padding, boxWidth - padding]);

		// const xScale = d3
		// 	.scaleLinear()
		// 	.domain([1, dataset.length])
		// 	.range([padding, boxWidth - padding]);

		function adaptChart(boxWidth) {
			d3.select('.svg-content-responsive').attr('width', boxWidth);

			// Update the X scale and Axis (here the 20 is just to have a bit of margin)
			xScale.range([padding, boxWidth - padding]);
		}
		function drawChart() {
			let minDistance = 0;
			const getMinDistance = function(previousX, currentX) {
				const minD = currentX - previousX;
				if (minDistance > 0) {
					minDistance = minD < minDistance? minD : minDistance;
				} else {
					minDistance = minD;
				}
				console.log(minDistance);
			}

			/* CREATE SVG */
			const svg = d3
				.select(el)
				.append('svg')
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', `0 0 ${boxWidth} ${h}`)
				.attr('width', boxWidth)
				.attr('height', h)
				.attr('class', 'svg-content-responsive');

			/* CREATE BARS */
			svg
				.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.attr('x', (d, i) => {
					if (i > 1) {getMinDistance(xScale(yearsDate[i - 1]), xScale(yearsDate[i]))}
					return xScale(yearsDate[i]);
				})
				.attr('y', (d, i) => h - yScale(d[1]))
				.attr('width', (d, i) => (60 / 100) * minDistance)
				.attr('height', (d, i) => yScale(d[1]))
				.attr('fill', 'navy')
				.attr('class', 'bar');

			const xAxis = d3.axisBottom(xScale);

			svg.append('g')
			.attr('transform', `translate(0, ${h})`)
			.call(xAxis);
		}

		drawChart();

		return () => {
			resizeObserver.unobserve(el);
		};
	});
</script>

<div bind:this={el} class="chart" />

<style>
	.chart {
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
