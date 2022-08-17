import { writable } from 'svelte/store';
import { get, post, setAuthToken } from '../api';
import { BX24 } from '../lib/bx24';

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
				BX24?.appOption.set('ppuser_id', res.user_id);
				BX24?.appOption.set('pptoken', res.token);

				loadUser(res.token);
			})
			.catch(e => {
				set({ loading: false, error: createUserError(e.msg) })
			})
	}

	const logout = async () => {
		BX24?.appOption.set('ppuser_id', '');
		BX24?.appOption.set('pptoken', '');

		set({ loading: false })
	}

	const init = () => {
		const token = BX24?.appOption.get('pptoken');
		token ? loadUser(token) : set({ loading: false });
	}
	BX24?.init(init);

	if (!BX24) set({ loading: false });

	return {
		subscribe,
		login,
		logout,
	}
}

export const user = createUser();
