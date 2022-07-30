import { writable } from 'svelte/store';
import BX24 from 'bx24-api';
import { get, post, setAuthToken } from '../api';

interface User {
	loading: boolean,
	data?: any,
}

function createUser() {
	const initial: User = { loading: true }
	const { subscribe, set, update } = writable(initial);

	BX24.appOption.get('pptoken')
		.then((token?: string) => {
			if (!token) {
				set({ loading: false })
				return;
			}
			loadUser(token);
		})

	const loadUser = (token: string) => {
		setAuthToken(token);
		get('me')
			.then(data => {
				set({ loading: false, data })
			})
			.catch(e => {
				console.log(e)
				set({ loading: false })
			})
	}

	const login = (login: string, password: string) => {
		const data = {
			username: login,
			password,
			from: 'front',
		}
		post('tokens', data)
			.then(async (res) => {
				await BX24.appOption.set('ppuser_id', res.user_id);
				await BX24.appOption.set('pptoken', res.token);

				loadUser(res.token);
			})
			.catch(e => console.log(e))
	}

	const logout = async () => {
		await BX24.appOption.set('ppuser_id', '');
		await BX24.appOption.set('pptoken', '');

		set({ loading: false })
	}

	return {
		subscribe,
		login,
		logout,
	}
}

export const user = createUser();
