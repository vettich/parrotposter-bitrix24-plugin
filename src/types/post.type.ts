interface Post {
	id: string,
	fields: PostFields,
	from: PostFrom,
	status: PostStatus,
	networks?: PostNetworks,
	results?: PostResults,
	publish_at: Date,
}

type PostStatus = 'success' | 'fail' | string;

type PostFrom = 'bitrix' | 'front' | 'wordpress' | 'bitrix24';

interface PostFields {
	text?: string,
	link?: string,
	tags?: string,
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
	PostStatus,
	PostFrom,
	PostFields,
	PostImageSize,
	PostNetworks,
	PostResults,
	PostResult,
}
