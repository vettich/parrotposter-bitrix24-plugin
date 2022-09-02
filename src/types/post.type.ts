import type { Platform } from './platform.type';

interface Post {
	id: string,
	fields: PostFields,
	from: Platform,
	status: PostStatus,
	networks?: PostNetworks,
	results?: PostResults,
	publish_at: Date | string,
}

interface PostInput {
	fields: PostFields,
	networks: PostNetworks,
	publish_at: Date,
}

type PostStatus = 'success' | 'fail' | 'ready' | 'queue';

interface PostFields {
	text?: string,
	link?: string,
	tags?: string,
	images?: string[],
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

function newPost(post: Post): Post {
	return { ...post, publish_at: new Date(post.publish_at) }
}

function comparePostByPublishAt(a: Post, b: Post): number {
	return a.publish_at < b.publish_at ? 1 : -1;
}

export type {
	Post,
	PostStatus,
	PostFields,
	PostImageSize,
	PostNetworks,
	PostResults,
	PostResult,
	PostInput,
}

export {
	newPost,
	comparePostByPublishAt,
}
