import { writable } from 'svelte/store';
import { api } from '@src/api';
import { storage } from '@src/lib/storage';
import type { User } from '@src/types';

interface UserWrap {
	loading: boolean,
	data?: User,
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
	const initial: UserWrap = { loading: true }
	const { subscribe, set } = writable(initial);

	const loadUser = (token: string) => {
		api.authToken.set(token);
		api.get('me')
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
		api.post('tokens', data)
			.then(async (res) => {
				storage.set('ppuser_id', res.user_id);
				storage.set('pptoken', res.token);

				loadUser(res.token);
			})
			.catch(e => {
				set({ loading: false, error: createUserError(e.msg) })
			})
	}

	const logout = async () => {
		storage.set('ppuser_id', '');
		storage.set('pptoken', '');

		set({ loading: false })
	}

	const reload = async () => {
		const data = await api.get<User>('me');
		set({ loading: false, data })
	}

	const init = async () => {
		const token = await storage.get('pptoken');
		token ? loadUser(token) : set({ loading: false });
	}
	init();

	return {
		subscribe,
		reload,
		login,
		logout,
	}
}

export const user = createUser();
