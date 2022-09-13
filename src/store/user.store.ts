import { writable } from 'svelte/store';
import { api } from '@src/api';
import { storage } from '@src/lib/storage';
import type { FieldError, User } from '@src/types';

interface UserWrap {
	loading: boolean,
	data?: User,
}

const createUserError = (err: string):  FieldError => {
	if (err.indexOf('errors.user.not_found') >= 0) {
		return {
			field: 'username',
			msg: 'Пользователь не найден',
		}
	}

	if (err.indexOf('errors.token.wrong_password') >= 0) {
		return {
			field: 'password',
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
				set({ loading: false })
				console.log(createUserError(e.msg))
			})
	}

	const login = async (username: string, password: string): Promise<FieldError> => {
		set({ loading: true });

		const data = {
			username,
			password,
			from: 'front',
		}

		try {
			const res = await api.post('tokens', data);
			storage.set('ppuser_id', res.user_id);
			storage.set('pptoken', res.token);
			loadUser(res.token);
		} catch (e) {
			set({ loading: false })
			return createUserError(e.msg)
		}
	}

	const signup = async (name: string, username: string, password: string): Promise<FieldError> => {
		set({ loading: true });

		const data = {
			name,
			username,
			password,
			from: 'front',
		}

		try {
			const res = await api.post('users', data);
			storage.set('ppuser_id', res.user_id);
			storage.set('pptoken', res.token);
			loadUser(res.token);
		} catch (e) {
			set({ loading: false })
			return createUserError(e.msg)
		}
	}

	const forgotPassword = async (username: string, callback_url: string): Promise<FieldError> => {
		set({ loading: true });

		const data = {
			username,
			callback_url,
			from: 'front',
		}

		try {
			await api.post('passwords/forgot', data);
			set({ loading: false });
		} catch (e) {
			set({ loading: false })
			return createUserError(e.msg)
		}
	}

	const resetPassword = async (password: string, token: string): Promise<FieldError> => {
		set({ loading: true });

		const data = {
			password,
			token,
		}

		try {
			await api.post('passwords/new', data);
			set({ loading: false });
		} catch (e) {
			set({ loading: false })
			return createUserError(e.msg)
		}
	}

	const checkToken = async (token: string): Promise<boolean> => {
		return await api.getById('tokens', `${token}/valid`)
	}

	const logout = async () => {
		// @TODO сделать запрос на сброс токена
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
		signup,
		forgotPassword,
		resetPassword,
		checkToken,
		logout,
	}
}

export const user = createUser();
