<script lang="ts">
	import type { Post } from '@src/types';
	import { formatToTime, navigate } from '@src/tools';
	import { api } from '@src/api';
	import { _ } from '@src/lib/i18n';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import Images from './PostListItemImages.svelte';
	import Accounts from './PostListItemAccounts.svelte';
	import Menu from './PostListItemMenu.svelte';
	import QuickView from './PostQuickView.svelte';
	import PostStatus from './PostStatus.svelte';
	import { onDestroy } from 'svelte';

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
		api.deleteById('posts', post.id).finally(() => {
			deleting = false;
			openRemoveAgree = false;
		});
	}

	const gotoEdit = () => {
		navigate(`/posts/${post.id}`);
	}

	onDestroy(() => {
		// fix: Dialog component does not have time to clean up the classes
		// so it has to be done manually
		document.body.classList.remove('mdc-dialog-scroll-lock');
	})
</script>

<div class="post-list-item mdc-elevation--z4" on:click={() => openView = true}>
	<div class="post-list-item__top">
		<div class="post-list-item__header">
			<PostStatus status={post.status} />
			<div class="post-list-item__time" title={post.publish_at.toLocaleString()}>{formatToTime(post.publish_at)}</div>
			<Menu on:delete={() => openRemoveAgree = true} on:edit={gotoEdit} hideEdit={hideEditFromMenu} />
		</div>

		<div class="post-list-item__text text-ellipse--2" title={post.fields?.text}>{post.fields?.text}</div>
	</div>

	<div class="post-list-item__bottom">
		<Images images={post.fields.images_sizes} />
		<Accounts accountIds={post.networks.accounts} results={post.results} />
	</div>
</div>

<QuickView bind:open={openView} postId={post.id} />

<Dialog bind:open={openRemoveAgree}>
	<Title>{$_('posts.ask_delete_post')}</Title>
	{#if deleting}
		<Content>
			<CircularProgress style="height: 24px; width: 24px;" indeterminate />
		</Content>
	{:else}
		<Actions>
			<Button>{$_('actions.no')}</Button>
			<Button on:click={deletePost}>{$_('actions.yes')}</Button>
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
		}
	}

	* :global(.mdc-icon-button):active {
		border-radius: 50%;
	}
</style>
