import { writable } from 'svelte/store';

interface PostWrapper {
	loading: boolean,
	data?: [Post],
}

interface Post {
	id: string,
	fields: {
		text?: string,
		link?: string,
		need_utm?: boolean,
	},
	from: string,
	status: 'success' | 'fail' | string,
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
