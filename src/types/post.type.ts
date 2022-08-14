interface Post {
	id: string,
	fields: PostFields,
	from: string,
	status: 'success' | 'fail' | string,
	networks?: PostNetworks,
	results?: PostResults,
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

interface PostNetworks {
	accounts: string[],
}

interface PostResults {
	[key: string]: PostResult,
}

interface PostResult {
	id?: string,
	success: boolean,
	link?: string,
	error_formatted?: string,
	error_msg?: string,
}

export type {
	Post,
	PostFields,
	PostImageSize,
	PostNetworks,
	PostResults,
	PostResult,
}
