export async function fetchGdpData() {
	// const allPostFiles = import.meta.glob(`/src/routes/blog/*.md`)
	// const iterablePostFiles = Object.entries<any>(allPostFiles)

	const allPosts = await Promise
		.all
		// iterablePostFiles.map(async ([path, resolver]) => {
		//   const { metadata } = await resolver()
		//   const postPath = path.slice(11, -3)

		//   return {
		//     meta: { title: metadata.title, date: metadata.date, categories: metadata.categories },
		//     path: postPath,
		//   }
		// })
		();
	return allPosts;
}
