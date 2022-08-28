import { API_URL } from '@src/consts/env';
import { TokenManager } from './token-manager';

type Resource = 'me' | 'posts' | 'tokens' | 'accounts' | 'files';

type HttpMethod = 'GET' | 'POST' | 'DELETE';
interface Params {
	method?: HttpMethod,
	headers?: Record<string, string>,
}

interface Result {
	response?: any,
	error?: any,
}

interface FileUploadParams {
	onProgress?: (progress: number) => void,
	onSuccess?: (fileId: string) => void,
	onError?: (err: string) => void,
	onFinish?: () => void,
}

class Api {
	authToken = new TokenManager();

	async get(res: Resource, data?: Object, params?: Params): Promise<any> {
		params = this.initParams(params);
		return await this.call(res, data, params);
	}

	async getById(res: Resource, id: string, data?:Object, params?: Params): Promise<any> {
		const endpoint = `${res}/${id}`;
		params = this.initParams(params);
		return await this.call(endpoint, data, params);
	}

	async post(endpoint: Resource, data: Object, params?: Params): Promise<any> {
		params = this.initParams(params, 'POST');
		return await this.call(endpoint, data, params);
	}

	async postById(res: Resource, id: string, data: Object, params?: Params): Promise<any> {
		const endpoint = `${res}/${id}`;
		params = this.initParams(params, 'POST');
		return await this.call(endpoint, data, params);
	}

	async deleteById(res: Resource, id: string, data?: Object, params?: Params): Promise<any> {
		const endpoint = `${res}/${id}`;
		params = this.initParams(params, 'DELETE');
		return await this.call(endpoint, data, params);
	}

	uploadFile(file: File, params: FileUploadParams = {}): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const fd = new FormData();
			fd.append('file', file);

			const xhr = new XMLHttpRequest();
			xhr.open('POST', `${API_URL}/file`);
			xhr.setRequestHeader('Token', this.authToken.get());

			xhr.upload.addEventListener('progress', function(e) {
				if (params.onProgress) params.onProgress(e.loaded / e.total);
			})

			xhr.addEventListener('load', function() {
				const resp = JSON.parse(xhr.response);

				// success
				if (resp.file_id) {
					if (params.onSuccess) params.onSuccess(resp.file_id);
					resolve(resp.file_id);
				}

				// error
				if (resp.error) {
					if (params.onError) params.onError(resp.error);
					reject(resp.error);
				}

				// any other error
				reject('unknown error');

				if (params.onFinish) params.onFinish();
			})

			xhr.send(fd);
		})
	}

	private initParams(params?: Params, defaultMethod: HttpMethod = 'GET'): Params {
		if (!params) {
			params = {
				method: defaultMethod,
				headers: {},
			};
		}
		return params;
	}

	private async call(endpoint: string, data: Object, params?: Params): Promise<any> {
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

		if (this.authToken.has()) {
			config.headers['Token'] = this.authToken.get();
		}

		const res = await fetch(url, config);

		let body: Result;
		try { body = await res.json(); }
		catch (e) { return null; }

		if (body.error) {
			throw body.error;
		}

		return body.response;
	}
}

const api = new Api();

export {
	api,
}
