import { writable } from 'svelte/store';
import type { Post } from '../types';

interface PostWrapper {
	loading: boolean,
	data?: [Post],
}

function createPost() {
	const initial: PostWrapper = { loading: true }
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
	}
}

const post = createPost();

export type {
	Post,
};

export {
	post,
};
