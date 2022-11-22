<script>
       import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let allGdpData;
       const dataset = allGdpData.data

	const w = 1200;
	const h = 800;
       const padding = 15;

       let el;
       // console.log(el)
       // console.log(dataset.length)
       // console.log(w)

       function drawChart() {
              const yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset, (d) => d[1])])
              .range([h - padding, 0]);
                     
              const xScale = d3.scaleLinear()
              .domain([1, dataset.length * 2])
              .range([padding, w - padding]);

              const svg = d3.select(el)
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", `0 0 ${w} ${h}`)
              .attr("width", w)
              .attr("height", h)
              .attr("class", "svg-content-responsive");
              
              svg.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect")
              .attr("x", (d, i) => xScale(i * 2))
              .attr("y", (d, i) => yScale(d[1]))
              .attr("width", 1)
              .attr("height", (d, i) => yScale(h - d[1]))
              .attr("fill", "navy")
              .attr("class", "bar")
       }

       function adaptChart() {
              console.log("inside")
              // get the current width of the div where the chart appear, and attribute it to Svg
              const currentWidth = parseInt(d3.select('.chart').style('width'), 10)
              svg.attr("width", currentWidth)

              // Update the X scale and Axis (here the 20 is just to have a bit of margin)
              xScale.range([padding, currentWidth - padding]);
              // xAxis.call(d3.axisBottom(x))
       }



	onMount(() => {
               // Add an event listener that run the function when dimension change
              window.addEventListener('resize', adaptChart );
              drawChart();

              return () => window.removeEventListener('resize', adaptChart);

	});

    

</script>


<div bind:this={el} class="chart"></div>


<style>
       svg {
              border: 1px solid black;
       }

       .chart {
              display: inline-block;
              position: relative;
              width: 100%;
              padding-bottom: 100%; /* aspect ratio */
              vertical-align: top;
              /* overflow: hidden; */
       }

       .svg-content-responsive {
              display: inline-block;
              position: absolute;
              top: 10px;
              left: 0;
       }
</style>