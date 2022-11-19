<script>

	import * as d3 from "d3";

	export let allGdpData;

	const width = 800;
	const height = 600;

	const svg = d3.select("svg")
	svg.selectAll("rect")
       .data(allGdpData.data)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 10)
       .attr("y", (d, i) => height - 3 * d[1])
       .attr("width", 5)
       .attr("height", (d, i) => d[1] * 3)
       .attr("fill", "navy")
       .attr("class", "bar")

</script>

<!-- {allGdpData} -->

<svg x="400" y="400" {width} {height}>

</svg>

<style>
/* svg :global(rect.bar):hover {
	fill: brown;
} */
</style>