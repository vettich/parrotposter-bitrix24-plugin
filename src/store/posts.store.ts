import { writable } from 'svelte/store';
import { api, Subscription } from '@src/api';

import { comparePostByPublishAt, newPost, type Post } from '@src/types';

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
	const { subscribe, update } = writable(initial);

	let loading = false;
	let paging: Paging = null;
	let loadedFirstPage = false;

	let subscription: Subscription = null;

	api.authToken.onChange((setted: boolean, token: string) => {
		if (!setted) return;

		if (subscription) subscription.stop();

		subscription = new Subscription(token, 'posts');
		subscription.start();

		subscription.onadd = (post: Post) => {
			post = newPost(post);
			update(store => ({
				...store,
				data: [post, ...store.data].sort(comparePostByPublishAt),
			}))
		}

		subscription.onupdate = (post: Post) => {
			post = newPost(post);
			update(store => {
				const idx = store.data.findIndex(p => post.id === p.id);
				if (idx < 0) return;

				store.data[idx] = post;
				return store;
			})
		}

		subscription.onremove = (id: string) => {
			update(store => ({
				...store,
				data: store.data.filter(p => p.id !== id),
			}))
		}
	})

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

		api.get('posts', query)
			.then(res => {
				paging = res.paging;

				// transform publish_at to Date object
				const data: Post[] = res.posts
					.map((post: Post) => newPost(post))

				const removeDuplicates = (arr: Post[]): Post[] => {
					return [...new Map(arr.map(p => [p.id, p])).values()];
				}

				update(store => ({
					...store,
					data: !push_back ? data : removeDuplicates([...store.data, ...data]),
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
