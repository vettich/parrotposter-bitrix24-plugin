import { writable } from 'svelte/store';
import { api } from '@src/api';
import type { Post } from '@src/types';

interface PostWrapper {
	loading: boolean,
	data?: Post,
}

function createPost() {
	const initial: PostWrapper = { loading: true }
	const { subscribe, update } = writable(initial);

	const setLoading = (loading: boolean) => {
		update(store => ({...store, loading}))
	}

	const fetchById = async (id: string) => {
		setLoading(true);
		api.getById('posts', id)
			.then(res => {
				const data = {
					...res,
					publish_at: new Date(res.publish_at),
				}
				update(store => ({
					...store,
					data,
				}))
			})
			.catch(e => console.log(e))
			.finally(() => {
				setLoading(false);
			})
	}

	return {
		subscribe,
		fetchById,
	}
}

const post = createPost();

export type {
	PostWrapper,
};

export {
	post,
};
