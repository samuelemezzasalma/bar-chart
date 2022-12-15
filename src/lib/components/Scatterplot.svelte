<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let cyclistData;
	const dataset = cyclistData;

	let el;

	// function bubbleSortByYear() {
	// 	while (change) {
	// 		change = false;
	// 		for (var i = 0; i < timesYears.length - 1; i++) {
	// 			if (timesYears[i].Year > timesYears[i + 1].Year) {
	// 				var tmp = timesYears[i];
	// 				timesYears[i] = timesYears[i + 1];
	// 				timesYears[i + 1] = tmp;
	// 				change = true;
	// 			}
	// 		}
	// 	}
	// }

	onMount(() => {
		// console.log(dataset);
		const width = 1000;
		const h = 600;
		const padding = 60;
		//Estrarre dagli oggetti del dataset la lista dei valori di X e di Y
		let timesYears = [];
		let years = []
		Object.keys(dataset).map((key) => {
			years.push(dataset[key].Year);
			timesYears.push([dataset[key].Year, dataset[key].Time]);
		});
		let change = true;
		

		// console.log(timesYears);

		function drawChart() {
			// Add X scale

			// Add Y scale

			const svg = d3
				.select(el)
				.append('svg')
				.attr('width', width + padding * 2)
				.attr('height', h + padding * 2);
		}

		drawChart();
	});
</script>

<div bind:this={el} class="chart" />

<style>
	.chart {
		height: 720px;
		width: 10120px;
		position: relative;
	}
</style>
