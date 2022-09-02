import { writable } from 'svelte/store';
import { api } from '@src/api';
import type { Account, AccountType, ConnectArgs, ConnectFields, ConnectReply } from '@src/types';
import { user } from './user.store';

class AccountMap {
	data: { [key: string]: Account };

	constructor(accounts: Account[]) {
		this.data = {}
		for (let acc of accounts) {
			this.data[acc.id] = acc;
		}
	}

	getById(id: string): Account {
		return this.data[id]
	}

	getList(): Account[] {
		return Object.values(this.data);
	}
}

interface AccountsWrapper {
	loading: boolean,
	data?: AccountMap,
}

interface AccountsReply {
	accounts: Account[],
}

function createAccounts() {
	const initial: AccountsWrapper = { loading: true }
	const { subscribe, update } = writable(initial);

	const setLoading = (loading: boolean) => {
		update(store => ({...store, loading}))
	}

	const load = async () => {
		setLoading(true);
		api.get('accounts')
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

	const reload = async () => {
		const res = await api.get<AccountsReply>('accounts');
		update(store => ({
			...store,
			data: new AccountMap(res.accounts),
		}))
	}

	api.authToken.onChange(setted => setted ? load() : null)

	const deleteAccount = async (id: string) => {
		await api.deleteById('accounts', id);
		reload();
		user.reload();
	}

	const connect = async (social: AccountType, fields: ConnectFields): Promise<ConnectReply> => {
		const req: ConnectArgs = {
			type: social,
			fields,
		}
		try {
			const res = await api.post<ConnectReply>('connect', req);
			reload();
			user.reload();
			return res;
		} catch (e) {
			throw e
		}
	}

	return {
		subscribe,
		deleteAccount,
		connect,
	}
}

const accounts = createAccounts();

export {
	accounts,
	AccountMap,
}
