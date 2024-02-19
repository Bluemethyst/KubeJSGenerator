import type { PageServerLoad } from './$types';

export const load = (async () => {
	let output = 'Change the inputs to generate some code!';
	return { output };
}) satisfies PageServerLoad;
