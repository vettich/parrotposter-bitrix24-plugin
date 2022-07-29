const apiURI = 'https://parrotposter.com/api/v1/';

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
}

async function get(endpoint: string, data?: Object, params?: Params): Promise<any> {
	return await call(endpoint, data, params);
}

async function post(endpoint: string, data: Object, params?: Params): Promise<any> {
	params = initParams(params);
	params.method = 'POST';

	return await call(endpoint, data, params);
}

async function call(endpoint: string, data: Object, params?: Params): Promise<any> {
	let url = `${apiURI}${endpoint}`;
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

export {
	get,
	post,
	setAuthToken,
}
