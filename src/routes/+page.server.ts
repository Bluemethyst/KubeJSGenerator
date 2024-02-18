import { generateCode } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	let output = generateCode('{"script-type":"hey"}');
	return { output };
}) satisfies PageServerLoad;
