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
	networks?: PostNetworks,
	results?: PostResults,
}

interface PostImageSize {
	original: string,
	thumbnail: string,
}

interface PostNetworks {
	accounts: string[],
}

interface PostResults {
	[key: string]: PostResult,
}

interface PostResult {
	success: boolean,
	link?: string,
	error_formatted?: string,
	error_msg?: string,
}

export type {
	Post,
	PostFields,
	PostImageSize,
}
