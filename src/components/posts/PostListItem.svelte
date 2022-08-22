<script lang="ts">
	import { Icon } from '@smui/common';

	import type { Post, PostStatus } from '@src/types';
	import { formatToTime } from '@src/tools';
	import { deletee } from '@src/api';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Images from './PostListItemImages.svelte';
	import Accounts from './PostListItemAccounts.svelte';
	import Menu from './PostListItemMenu.svelte';
	import QuickView from './PostQuickView.svelte';
	import Button from '@smui/button';
import CircularProgress from '@smui/circular-progress';

	export let post: Post;

	let openView = false;
	let openRemoveAgree = false;
	let deleting = false;

	$: !openRemoveAgree && deleting && (openRemoveAgree = true);

	const deletePost = () => {
		deleting = true;
		deletee(`posts/${post.id}`).finally(() => {
			deleting = false;
			openRemoveAgree = false;
		});
	}

	const statusIcons: { [key in PostStatus]: string } = {
		success: 'done',
		fail: 'error',
		queue: 'schedule_send',
		ready: 'pending',
	}
</script>

<div class="item mdc-elevation--z4" on:click={() => openView = true}>
	<div class="item-top">
		<div class="header">
			<div
				class="status {post.status}">
				<Icon class="material-icons-outlined">{statusIcons[post.status]}</Icon>
			</div>
			<div class="time" title={post.publish_at.toLocaleString()}>{formatToTime(post.publish_at)}</div>
			<Menu on:delete={() => openRemoveAgree = true} />
		</div>

		<div class="text" title={post.fields?.text}>{post.fields?.text}</div>
	</div>

	<div class="item-bottom">
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

	.item {
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

		&-top, &-bottom {
			display: flex;
			flex-direction: column;
			gap: 0.8em;
			justify-content: space-between;
		}
	}

	.header {
		display: flex;
		gap: 6px;
		align-items: center;

		.time {
			flex-grow: 1;
			color: cssvar(secondary);
		}

		.status {
			display: flex;
			align-items: center;

			:global(.material-icons-outlined) {
				font-size: 1.2em;
			}

			&.success { color: cssvar('success') }
			&.ready { color: cssvar('warning') }
			&.fail { color: cssvar('error') }
			&.queue { color: cssvar('primary') }
		}
	}

	.text {
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

	* :global(.mdc-icon-button):active {
		border-radius: 50%;
	}
</style>
