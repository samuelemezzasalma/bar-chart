<svelte:head>
	<title>Scatterplot Graph</title>
	<meta name="description" content="Scatterplot Graph example" />
</svelte:head>

<script>
	import Scatterplot from "$lib/components/Scatterplot.svelte";
	
  export let data = cyclistData;
  let cyclistList = [];
  Object.keys(data).map((key) => {
	cyclistList.push(data[key]);
  })
	console.log(cyclistList);
</script>

<div class="text-column">
	<h1 id="title">Scatterplot</h1>
	<!-- {#each cyclistList as cyclist}
	<p>
		{JSON.stringify(cyclist)}
	</p>
	{/each} -->
    <Scatterplot {cyclistList} />

</div>