import { writable } from 'svelte/store';
import { get, post } from '../api';

import type { Post } from './post';

interface PostsWrapper {
	loading: boolean,
	data: [Post?],
	paging?: {
		page: number,
		size: number,
		total: number,
	},
}

function createPosts() {
	const initial: PostsWrapper = { loading: true, data: [] }
	const { subscribe, set, update } = writable(initial);

	const setLoading = (loading: boolean) => {
		update(store => ({...store, loading}))
	}

	const load = (page: number, limit: number) => {
		setLoading(true);

		const query: Object = {
			paging: {
				page,
				size: limit,
			},
		}
		get('posts', query)
			.then(res => {
				update(store => ({
					...store,
					data: res.posts,
					paging: res.paging,
				}))
			})
			.catch(e => console.log(e))
			.finally(() => {
				setLoading(false);
			})
	}

	return {
		subscribe,
		load,
	}
}

export const posts = createPosts();
