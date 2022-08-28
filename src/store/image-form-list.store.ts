import { api } from '@src/api';
import { writable } from 'svelte/store';

interface ImageData {
	id: string,
	fileId?: string,
	src: string,

	uploading?: boolean,
	progress?: number,
	error?: string,

	update?: (upd: ImageData) => void,
}

let idSequence = 1;
const getNextId = () => idSequence++

function buildInitialData(initialFileIds: string[]):ImageData[] {
	const data: ImageData[] = [];
	for (const fileId of initialFileIds) {
		data.push({
			id: '' + getNextId(),
			fileId,
			src: api.getLinkImage(fileId, true),
		})
	}
	return data
}

function createImagesList(initialFileIds: string[] = []) {
	const initial = buildInitialData(initialFileIds)
	const { subscribe, update } = writable<ImageData[]>(initial);

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

			const onProgress = (progress: number) => {
				image.progress = progress;
				update(image);
			}

			api.uploadFile(file, { onProgress })
				.then(fileId => {
					image.fileId = fileId;
					image.uploading = false;
					update(image);
				})
				.catch(err => {
					image.error = err;
					image.uploading = false;
					update(image);
				})
		}
		reader.readAsDataURL(file);
	}

	const deleteAll = () => {
		update(images => {
			for (const img of images) {
				if (img.fileId) api.deleteById('files', img.fileId);
			}
			return [];
		})
	}

	const deleteById = (imageId: string) => {
		update(images => {
			const idx = images.findIndex(img => img.id === imageId);
			if (idx >= 0) {
				if (images[idx].fileId) api.deleteById('files', images[idx].fileId);
				images.splice(idx, 1);
			}
			return images;
		});
	}

	const useDelete = (imageId: string) => {
		return () => deleteById(imageId)
	}

	const swap = (fromImageId: string, toImageId: string) => {
		update(images => {
			const fromIdx = images.findIndex(img => img.id === fromImageId);
			const from = images.splice(fromIdx, 1);

			let toIdx = images.findIndex(img => img.id === toImageId);
			// если элемент перемещается вправо по списку, то вставить нужно после него, а не до
			if (fromIdx <= toIdx) toIdx++;

			return [...images.splice(0, toIdx), ...from, ...images];
		})
	}

	return {
		subscribe,
		add,
		upload,
		deleteAll,
		useDelete,
		deleteById,
		swap,
	}
}

const imagesList = createImagesList();

export {
	type ImageData,
	imagesList,
	createImagesList,
}
