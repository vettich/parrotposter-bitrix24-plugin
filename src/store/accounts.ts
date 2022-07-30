import { writable } from 'svelte/store';

interface AccountsWrapper {
	loading: boolean,
	data?: [Account],
}

interface Account {
	id: string,
}

function createAccounts() {
	const initial: AccountsWrapper = { loading: true }
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
	}
}

export const accounts = createAccounts();
