import { API_URL } from '@src/consts/env';
import api from '.';

interface Params {
	onProgress?: (progress: number) => void,
	onSuccess?: (fileId: string) => void,
	onError?: (err: string) => void,
	onFinish?: () => void,
}

let token = '';
api.onSetAuthToken((_, _token) => {
	token = _token;
})

function uploadFile(file: File, params: Params = {}) {
	const fd = new FormData();
	fd.append('file', file);

	const xhr = new XMLHttpRequest();
	xhr.open('POST', `${API_URL}/file`);
	xhr.setRequestHeader('Token', token);

	xhr.upload.addEventListener('progress', function(e) {
		if (params.onProgress) params.onProgress(e.loaded / e.total);
	})

	xhr.addEventListener('load', function() {
		const resp = JSON.parse(xhr.response);

		if (resp.file_id && params.onSuccess) params.onSuccess(resp.file_id);
		if (resp.error && params.onError) params.onError(resp.error);
		if (params.onFinish) params.onFinish();
	})

	xhr.send(fd);
}

export {
	uploadFile,
}
