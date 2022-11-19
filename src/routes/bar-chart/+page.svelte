<svelte:head>
	<title>Bar Chart</title>
	<meta name="description" content="Bar Chart example" />
</svelte:head>

<script>
	import BarChart from "$lib/components/BarChart.svelte";

	export let data = {allGdpData};
  const {allGdpData} = data
	console.log(data)

	// export let data = allGdpData;
  // const allGdpData = data
</script>

<div class="text-column">
	<h1 id="title">Bar Chart</h1>
		{allGdpData}
	<!-- <BarChart /> -->



</div>
