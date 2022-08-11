interface Post {
	id: string,
	fields: PostFields,
	from: string,
	status: 'success' | 'fail' | string,
}

interface PostFields {
	text?: string,
	link?: string,
	need_utm?: boolean,
	images_sizes?: PostImageSize[],
}

interface PostImageSize {
	original: string,
	thumbnail: string,
}

export type {
	Post,
	PostFields,
	PostImageSize,
}
