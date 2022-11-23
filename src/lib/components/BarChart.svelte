<script>
       import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let allGdpData;
       const dataset = allGdpData.data

	let el;
       let boxWidth;
       
       // let w = boxWidth
	const h = 800;
       const padding = 15;

       

       const yScale = d3.scaleLinear()
       .domain([0, d3.max(dataset, (d) => d[1])])
       .range([h - padding, 0]);
              
       const xScale = d3.scaleLinear()
       .domain([1, dataset.length])
       .range([padding, boxWidth - padding]);
       // console.log(el)
       // console.log(dataset.length)
       // console.log(w)

       function drawChart() {
              console.log(boxWidth)
              console.log(dataset)

              const svg = d3.select(el)
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", `0 0 ${boxWidth} ${h}`)
              .attr("width", boxWidth)
              .attr("height", h)
              .attr("class", "svg-content-responsive");
              
              svg.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect")
              .attr("x", (d, i) =>{
                     return xScale((i + 1) * 2)
              })
              .attr("y", (d, i) => yScale(d[1]))
              .attr("width", 1)
              .attr("height", (d, i) => yScale(h - d[1]))
              .attr("fill", "navy")
              .attr("class", "bar")
       }

       function adaptChart() {
              // console.log("inside")
              // get the current width of the div where the chart appear, and attribute it to Svg
              const currentWidth = parseInt(d3.select(el).style('width'), 10)
              console.log(currentWidth);
              d3.select(el).attr("width", currentWidth);

              // Update the X scale and Axis (here the 20 is just to have a bit of margin)
              xScale.range([padding, currentWidth - padding]);
              // xAxis.call(d3.axisBottom(x))
       }



	onMount(() => {
              const resizeObserver = new ResizeObserver(entries => {
              for (const entry of entries) {
                     if (entry.contentBoxSize) {
                            // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                            const boxWidth = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0].blockSize : entry.contentBoxSize.blockSize;
                            // console.log(boxWidth)
                     }
              }
              
              // We're only watching one element
              // const entry = entries.at(0);

              //Get the block size
              // boxWidth = entry.contentBoxSize[0].blockSize;
              // console.log(boxWidth)
              });
              resizeObserver.observe(el);

              boxWidth = parseInt(d3.select(el).style("width").slice(0, -2), 10)
              console.log(boxWidth)
              // console.log(w)

              drawChart();
               // Add an event listener that run the function when dimension change
              // window.addEventListener('resize', adaptChart );
              

              return () => resizeObserver.unobserve(el);
              // window.removeEventListener('resize', adaptChart);

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
              /* display: inline-block; */
              /* position: absolute;
              top: 10px;
              left: 0; */
       }
</style>