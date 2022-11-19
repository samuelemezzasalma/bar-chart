import { fetchGdpData } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchGdpData();
	const sortedPosts = allPosts.sort((a, b) => {
		const difference = new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
		return difference;
	});

	return json(sortedPosts);
};
