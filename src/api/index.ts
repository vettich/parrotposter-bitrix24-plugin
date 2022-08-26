import { API_URL } from '@src/consts/env';

interface Params {
	method?: string,
	headers?: Record<string, string>,
}

function initParams(params?: Params): Params {
	if (!params) {
		params = {
			method: 'GET',
			headers: {},
		};
	}
	return params;
}

interface Result {
	response?: any,
	error?: any,
}

let authToken = '';
function setAuthToken(token: string) {
	authToken = token;

	emitSetAuthToken();
}

const authTokenSubscriptions: { (setted: boolean, token?: string): void; }[] = [];
function onSetAuthToken(fn: { (setted: boolean, token?: string): void; }) {
	authTokenSubscriptions.push(fn)

	if (authToken.length > 0) {
		fn(true, authToken)
	}
}

function emitSetAuthToken() {
	authTokenSubscriptions.every(fn => fn(authToken.length > 0, authToken))
}

async function get(endpoint: string, data?: Object, params?: Params): Promise<any> {
	params = initParams(params);
	return await call(endpoint, data, params);
}

async function post(endpoint: string, data: Object, params?: Params): Promise<any> {
	params = initParams(params);
	params.method = 'POST';
	return await call(endpoint, data, params);
}

async function deletee(endpoint: string, data?: Object, params?: Params): Promise<any> {
	params = initParams(params);
	params.method = 'DELETE';
	return await call(endpoint, data, params);
}

async function call(endpoint: string, data: Object, params?: Params): Promise<any> {
	let url = `${API_URL}${endpoint}`;
	const config: RequestInit = {
		method: params?.method || 'GET',
		headers: params?.headers || {},
	}

	if (data) {
		const dataStr = JSON.stringify(data);

		if (params.method == 'GET') {
			url += `?query=${encodeURIComponent(dataStr)}`;
		}

		if (params.method != 'GET') {
			config.headers['Content-Type'] = 'application/json; charset=utf-8';
			config.body = dataStr;
		}
	}

	if (authToken.length > 0) {
		config.headers['Token'] = authToken;
	}

	const res = await fetch(url, config);
	const body: Result = await res.json();

	if (body.error) {
		throw body.error;
	}

	return body.response;
}

export default {
	get,
	post,
	delete: deletee,
	authToken,
	setAuthToken,
	onSetAuthToken,
}
