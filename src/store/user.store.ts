import { writable } from 'svelte/store';
import BX24 from 'bx24-api';
import { get, post, setAuthToken } from '../api';

interface User {
	loading: boolean,
	data?: any,
	error?: UserError,
}

interface UserError {
	fields?: string[],
	msg: string,
}

const createUserError = (err: string):  UserError => {
	if (err.indexOf('errors.user.not_found') >= 0) {
		return {
			fields: ['username'],
			msg: 'Пользователь не найден',
		}
	}

	if (err.indexOf('errors.token.wrong_password') >= 0) {
		return {
			fields: ['password'],
			msg: 'Неверный пароль',
		}
	}

	return {
		msg: 'Не известная ошибка',
	}
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
				set({ loading: false, error: createUserError(e.msg) })
			})
	}

	const login = (login: string, password: string) => {
		set({ loading: true });

		if (!login.length || !password.length) {
			set({ loading: false, error: { fields: ['username', 'password'], msg: 'Email и пароль не должны быть пустыми' }});
			return;
		}

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
			.catch(e => {
				set({ loading: false, error: createUserError(e.msg) })
			})
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
