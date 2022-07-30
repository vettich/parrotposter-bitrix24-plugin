import { writable } from 'svelte/store';

import type { Post } from './post';

interface PostsWrapper {
	loading: boolean,
	data?: [Post],
}

function createPosts() {
	const initial: PostsWrapper = { loading: true }
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
	}
}

export const posts = createPosts();
