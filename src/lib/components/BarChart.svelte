<script>
       import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let allGdpData;
       const dataset = allGdpData.data

	const w = 800;
	const h = 600;
       const padding = 60;

       let el;

	onMount(() => {
              const yScale = d3.scaleLinear()
              .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
              .range([h - padding, padding]);

       

              const svg = d3.select(el)
                     .append("svg")
                     .attr("width", w)
                     .attr("height", h);
	
              svg.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect")
              .attr("x", (d, i) => i * 10)
              .attr("y", (d, i) => h - (d[1] / 2))
              .attr("width", 5)
              .attr("height", (d, i) => d[1] / 2)
              .attr("fill", "navy")
              .attr("class", "bar")
	});

//     const xScale = d3.scaleLinear()
//                      .domain([0, d3.max(dataset, (d) => d[0])])
//                      .range([padding, w - padding]);

    

</script>

<!-- {JSON.stringify(dataset)}  -->

<!-- x="400" y="400" -->

<div bind:this={el} class="chart"></div>

<!-- <svg  {w} {h}>

</svg> -->

<style>
.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>