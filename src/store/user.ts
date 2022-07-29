import { writable } from "svelte/store";
import BX24 from 'bx24-api';
import { get, post, setAuthToken } from '../api';

interface User {
	loading: boolean,
	data?: any,
}

function createUser() {
	const initial: User = { loading: true }
	const { subscribe, set, update } = writable(initial);

	console.log('createUser');

	BX24.appOption.get('pptoken')
		.then((token?: string) => {
			console.log('Saved token:', token);
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
				console.log(res)

				console.log(await BX24.appOption.set('ppuser_id', res.user_id))
				console.log(await BX24.appOption.set('pptoken', res.token))

				loadUser(res.token);
			})
			.catch(e => console.log(e))
	}

	const logout = async () => {
		console.log(await BX24.appOption.set('ppuser_id', ''));
		console.log(await BX24.appOption.set('pptoken', ''));

		set({ loading: false })
	}

	return {
		subscribe,
		login,
		logout,
	}
}

export const user = createUser();
