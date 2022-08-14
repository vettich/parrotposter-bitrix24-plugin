<script lang="ts">
	import { Icon } from '@smui/common';

	import type { Post } from '../../types';

	import Images from './PostListItemImages.svelte';
	import Accounts from './PostListItemAccounts.svelte';
	import Menu from './PostListItemMenu.svelte';

	export let post: Post;

	const statusIcons = {
		success: 'done',
		fail: 'error',
	}
</script>

<div class="item">
	<div class="item-top">
		<div class="header">
			<div
				class="status {post.status}">
				<Icon class="material-icons-outlined">{statusIcons[post.status]}</Icon>
			</div>
			<div class="time">10:44</div>
			<Menu />
		</div>

		<div class="text" title={post.fields?.text}>{post.fields?.text}</div>
	</div>

	<div class="item-bottom">
		<Images images={post.fields.images_sizes} />

		<Accounts accountIds={post.networks.accounts} results={post.results} />
	</div>
</div>

<style lang="scss">
	@use '../../theme/helpers' as *; 

	.item {
		display: inline-flex;
		flex-direction: column;
		gap: 0.8em;
		justify-content: space-between;
		width: 300px;
		padding: 1em;
		border: 1px solid #ddd;
		border-radius: 8px;
		transition: all 0.2s ease;

		&:hover {
			box-shadow: 0px 0px 10px 0px #ddd;
			@include cssvar(menu-icon-show, 1, 'pp-post-list-item');
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
		}

		.status {
			display: flex;
			align-items: center;

			:global(.material-icons-outlined) {
				font-size: 1.2em;
			}

			&.success { color: cssvar('success') }
			&.warning { color: cssvar('warning') }
			&.fail { color: cssvar('error') }
		}
	}

	.text {
		flex-grow: 1;
		display: -webkit-box;
		height: 2.4em;
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
