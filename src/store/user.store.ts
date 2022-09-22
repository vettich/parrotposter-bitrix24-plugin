import { writable } from 'svelte/store';
import { api } from '@src/api';
import type { FieldError, User } from '@src/types';
import { platform } from '@src/lib/platform';

interface UserWrap {
	loading: boolean,
	data?: User,
}

const userIdStoreKey = 'user_id';
const tokenStoreKey = 'token';

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
			from: platform.getType(),
		}

		try {
			const res = await api.post('tokens', data);
			platform.store().set(userIdStoreKey, res.user_id)
			platform.store().set(tokenStoreKey, res.token)
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
			from: platform.getType(),
		}

		try {
			const res = await api.post('users', data);
			platform.store().set(userIdStoreKey, res.user_id)
			platform.store().set(tokenStoreKey, res.token)
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
			from: platform.getType(),
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
		platform.store().set(userIdStoreKey, '')
		platform.store().set(tokenStoreKey, '')

		set({ loading: false })
	}

	const reload = async () => {
		const data = await api.get<User>('me');
		set({ loading: false, data })
	}

	const init = async () => {
		const token = await platform.store().get(tokenStoreKey);
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
