import { writable } from 'svelte/store';
import { get, post } from '../api';

import type { Post } from '../types';

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
				const data = res.posts.map(post => ({ ...post, publish_at: new Date(post.publish_at) }))
				update(store => ({
					...store,
					data,
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
