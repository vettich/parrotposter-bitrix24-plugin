import { writable } from 'svelte/store';
import { get, post } from '@src/api';

import type { Post } from '@src/types';

interface PostsWrapper {
	loading: boolean,
	data: Post[],
	hasNext: boolean,
}

interface Paging {
	page: number,
	size: number,
	total: number,
}

const ITEMS_PER_PAGE = 25;

function createPosts() {
	const initial: PostsWrapper = { loading: false, data: [], hasNext: true }
	const { subscribe, set, update } = writable(initial);

	let loading = false;
	let paging: Paging = null;
	let loadedFirstPage = false;

	const setLoading = (_loading: boolean) => {
		loading = _loading;
		update(store => ({...store, loading}));
	}

	const hasNext = (): boolean => {
		return paging.page * ITEMS_PER_PAGE < paging.total
	}

	const loadPosts = (page: number, limit: number, push_back: boolean = true) => {
		setLoading(true);

		const query: Object = {
			paging: {
				page,
				size: limit,
			},
		}

		get('posts', query)
			.then(res => {
				paging = res.paging;

				// transform publish_at to Date object
				const data: Post[] = res.posts
					.map((post: Post) => ({ ...post, publish_at: new Date(post.publish_at) }))

				update(store => ({
					...store,
					data: [...store.data, ...data],
					hasNext: hasNext(),
				}))
			})
			.catch(e => console.log(e))
			.finally(() => {
				setLoading(false);
			})
	}

	const loadFirstPage = () => {
		if (loading || loadedFirstPage) return;
		loadPosts(1, ITEMS_PER_PAGE, false);
		loadedFirstPage = true;
	}

	const loadNextPage = () => {
		if (loading) return;
		if (!paging) {
			loadPosts(1, ITEMS_PER_PAGE, true);
		} else if(hasNext()) {
			loadPosts(paging.page+1, ITEMS_PER_PAGE, true);
		}
	}

	return {
		subscribe,
		loadFirstPage,
		loadNextPage,
	}
}

export const posts = createPosts();
