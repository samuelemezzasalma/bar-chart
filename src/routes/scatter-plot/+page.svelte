<svelte:head>
	<title>Scatterplot Graph</title>
	<meta name="description" content="Scatterplot Graph example" />
</svelte:head>

<script>
	import Scatterplot from "$lib/components/Scatterplot.svelte";


  export let data = {cyclistData};
  const cyclistData = data;
</script>

<div class="text-column">
	<h1 id="title">Scatterplot</h1>
		<!-- {allGdpData} -->
    <Scatterplot {cyclistData} />

</div>