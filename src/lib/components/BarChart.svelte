<script>
       import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let allGdpData;
       const dataset = allGdpData.data

	const w = 800;
	const h = 600;
       const padding = 15;

       let el;
       console.log(el)
       console.log(dataset.length)
       console.log(w)

	onMount(() => {
              const yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset, (d) => d[1])])
              .range([h - padding, 0]);
              
              const xScale = d3.scaleLinear()
              .domain([1, dataset.length])
              .range([padding, w - padding]);

       

              const svg = d3.select(el)
                     .append("svg")
                     .attr("width", w)
                     .attr("height", h)
                     .attr("class", "test");
	
              svg.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect")
              .attr("x", (d, i) => xScale(i))
              .attr("y", (d, i) => yScale(d[1]))
              .attr("width", 2)
              .attr("height", (d, i) => yScale(h - d[1]))
              .attr("fill", "navy")
              .attr("class", "bar")
	});

    

</script>

<!-- {JSON.stringify(dataset)}  -->

<!-- x="400" y="400" -->

<div bind:this={el} class="chart"></div>

<!-- <svg  {w} {h}>

</svg> -->

<style>
/* :global(div) */
svg {
       border: 1px solid black;
}

.chart  {
              /* border: 1px solid black; */
		font: 10px sans-serif;
		/* background-color: steelblue; */
		text-align: right;
		/* padding: 3px; */
		margin: 1px;
		color: white;
	}
</style>