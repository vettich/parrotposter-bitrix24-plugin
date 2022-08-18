import { writable } from 'svelte/store';
import { get, post, onSetAuthToken } from '@src/api';
import type { Account } from '@src/types';

class AccountMap {
	data: { [key: string]: Account };

	constructor(accounts: [Account]) {
		this.data = {}
		for (let acc of accounts) {
			this.data[acc.id] = acc;
		}
	}

	getById(id: string): Account {
		return this.data[id]
	}
}

interface AccountsWrapper {
	loading: boolean,
	data?: AccountMap,
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
					data: new AccountMap(res.accounts),
				}))
			})
			.catch(e => console.log(e))
			.finally(() => {
				setLoading(false);
			})
	}

	onSetAuthToken(setted => setted ? load() : null)

	return {
		subscribe,
	}
}

const accounts = createAccounts();

export {
	accounts,
	AccountMap,
}
