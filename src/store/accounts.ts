import { writable } from 'svelte/store';
import { get, post } from '../api';

interface AccountsWrapper {
	loading: boolean,
	data?: [Account],
}

interface Account {
	id: string,
	name: string,
	type: string,
	photo?: string,
}

function createAccounts() {
	const initial: AccountsWrapper = { loading: true }
	const { subscribe, set, update } = writable(initial);

	const setLoading = (loading: boolean) => {
		update(store => ({...store, loading}))
	}

	const load = async () => {
		setLoading(true);
		get('accounts')
			.then(res => {
				update(store => ({
					...store,
					data: res.accounts,
				}))
			})
			.catch(e => console.log(e))
			.finally(() => {
				setLoading(false);
			})
	}

	load();

	return {
		subscribe,
	}
}

export const accounts = createAccounts();
