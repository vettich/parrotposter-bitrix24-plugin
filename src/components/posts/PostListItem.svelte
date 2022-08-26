<script lang="ts">
	import type { Post } from '@src/types';
	import { formatToTime } from '@src/tools';
	import api from '@src/api';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import Images from './PostListItemImages.svelte';
	import Accounts from './PostListItemAccounts.svelte';
	import Menu from './PostListItemMenu.svelte';
	import QuickView from './PostQuickView.svelte';
	import PostStatus from './PostStatus.svelte';

	export let post: Post;

	let openView = false;
	let openRemoveAgree = false;
	let deleting = false;

	let yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	$: hideEditFromMenu = post.publish_at < yesterday;

	$: !openRemoveAgree && deleting && (openRemoveAgree = true);

	const deletePost = () => {
		deleting = true;
		api.delete(`posts/${post.id}`).finally(() => {
			deleting = false;
			openRemoveAgree = false;
		});
	}
</script>

<div class="post-list-item mdc-elevation--z4" on:click={() => openView = true}>
	<div class="post-list-item__top">
		<div class="post-list-item__header">
			<PostStatus status={post.status} />
			<div class="post-list-item__time" title={post.publish_at.toLocaleString()}>{formatToTime(post.publish_at)}</div>
			<Menu on:delete={() => openRemoveAgree = true} hideEdit={hideEditFromMenu} />
		</div>

		<div class="post-list-item__text" title={post.fields?.text}>{post.fields?.text}</div>
	</div>

	<div class="post-list-item__bottom">
		<Images images={post.fields.images_sizes} />
		<Accounts accountIds={post.networks.accounts} results={post.results} />
	</div>
</div>

<QuickView bind:open={openView} postId={post.id} />

<Dialog bind:open={openRemoveAgree}>
	<Title>Удалить пост?</Title>
	{#if deleting}
		<Content>
			<CircularProgress style="height: 24px; width: 24px;" indeterminate />
		</Content>
	{:else}
		<Actions>
			<Button>Нет</Button>
			<Button on:click={deletePost}>Да</Button>
		</Actions>
	{/if}
</Dialog>

<style lang="scss">
	@use './src/theme/helpers' as *; 

	.post-list-item {
		display: inline-flex;
		flex-direction: column;
		gap: 0.8em;
		justify-content: space-between;
		width: 300px;
		padding: 1em;
		border-radius: 4px;
		transition: all 0.2s ease;
		cursor: pointer;
		background-color: cssvar(surface);

		&:hover {
			@include cssvar(menu-icon-show, 1, pp-post-list-item);
		}

		@media screen and (max-width: 768px) {
			width: 100%;
		}

		&__top, &__bottom {
			display: flex;
			flex-direction: column;
			gap: 0.8em;
			justify-content: space-between;
		}

		&__header {
			display: flex;
			gap: 6px;
			align-items: center;
		}

		&__time {
			flex-grow: 1;
			color: cssvar(secondary);
		}

		&__text {
			flex-grow: 1;
			display: -webkit-box;
			height: fit-content;
			line-height: 1.1;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			-moz-line-clamp: 2;
			-moz-box-orient: vertical;
		}
	}

	* :global(.mdc-icon-button):active {
		border-radius: 50%;
	}
</style>
