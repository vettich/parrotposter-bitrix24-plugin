import api from '@src/api';
import { uploadFile } from '@src/api/file-upload';
import { writable } from 'svelte/store';

interface ImageData {
	id: string,
	fileId?: string,
	src: string,

	uploading?: boolean,
	progress?: number,
	error?: string,

	update?: (upd: ImageData) => void,
	updateProgress?: (progress: number) => void,
}

function createImagesList() {
	const { subscribe, update } = writable<ImageData[]>([]);

	const useUpdateImage = (imageId: string) => {
		return (upd: ImageData) => {
			update(images => {
				const idx = images.findIndex(img => img.id === imageId);
				if (idx >= 0) images[idx] = upd;

				return images;
			});
		}
	}

	const add = (img: ImageData): ImageData => {
		img.update = useUpdateImage(img.id);
		update(images => ([...images, img]));
		return img;
	}

	let idSequence = 1;
	const getNextId = () => idSequence++

	const upload = (file: File) => {
		const image: ImageData = {
			id: '' + getNextId(),
			src: '',
			uploading: true,
			progress: 0.0,
		}

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			image.src = e.target.result as string;
			const { update } = add(image);

			uploadFile(file, {
				onProgress(progress) {
					image.progress = progress;
					update(image);
				},

				onSuccess(fileId) {
					image.fileId = fileId;
					image.uploading = false;
					update(image);
				},

				onError(err) {
					image.error = err;
					image.uploading = false;
					update(image);
				},
			})
		}
		reader.readAsDataURL(file);
	}

	const deleteAll = () => {
		update(images => {
			for (const img of images) {
				if (img.fileId) api.delete(`files/${img.fileId}`);
			}
			return [];
		})
	}

	return {
		subscribe,
		add,
		upload,
		deleteAll,
	}
}

export {
	type ImageData,
	createImagesList,
}
