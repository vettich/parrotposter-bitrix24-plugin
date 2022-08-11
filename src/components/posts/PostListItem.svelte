<script lang="ts">
	import type { Post } from '../types';
	import { Icon } from '@smui/common';
	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import IconButton from '@smui/icon-button';
	import Images from './PostListItemImages.svelte';
	import Accounts from './PostListItemAccounts.svelte';

	export let post: Post;

	let menu: MenuComponentDev;

	$: textEllipse = post.fields.text.substring(0, 100) + (post.fields.text.length > 100 ? '...' : '');

	const statusIcons = {
		success: 'done',
		fail: 'error',
	}
</script>

<div class="item">
	<div class="header">
		<div
			class="status {post.status}">
			<Icon class="material-icons-outlined">{statusIcons[post.status]}</Icon>
		</div>
		<div class="time">10:44</div>
		<div class="menu">
			<IconButton class="material-icons-outlined" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
			<Menu bind:this={menu}>
				<List>
					<Item>
						<Text><Icon class="material-icons-outlined menu-item-icon">edit</Icon>Редактировать</Text>
					</Item>
					<Item>
						<Text><Icon class="material-icons-outlined menu-item-icon">delete</Icon>Удалить</Text>
					</Item>
				</List>
			</Menu>
		</div>
	</div>

	<div class="text">{textEllipse}</div>

	<Images images={post.fields.images_sizes} />

	<Accounts accountIds={post.networks.accounts} results={post.results} />
</div>

<style lang="scss">
	@use '../../theme/helpers' as *; 

	.item {
		display: inline-flex;
		flex-direction: column;
		gap: 0.8em;
		width: 300px;
		padding: 1em;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	.header {
		display: flex;
		gap: 6px;
		align-items: center;

		.time {
			flex-grow: 1;
		}

		.menu {
			:global(button) {
				margin: 0;
				width: 28px;
				height: 28px;
				font-size: 1.1em;
			}

			:global(.menu-item-icon) {
				vertical-align: middle;
				font-size: 1.2em;
				margin-right: 4px;
			}
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

	* :global(.mdc-icon-button):active {
		border-radius: 50%;
	}
</style>
