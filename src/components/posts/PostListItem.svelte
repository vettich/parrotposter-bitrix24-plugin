<script lang="ts">
	import type { Post } from '../types';
	import { Icon } from '@smui/common';
	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import IconButton from '@smui/icon-button';
	import Dialog, { Content as DialogContent } from '@smui/dialog';

	export let post: Post;

	console.log(post)

	let menu: MenuComponentDev;
	let imageDialogOpen: boolean = false;
	let selectedImageOrigin: string = '';

	$: textEllipse = post.fields.text.substring(0, 100) + (post.fields.text.length > 100 ? '...' : '');
	$: images = post.fields?.images_sizes || [];
	$: console.log(images);

	const statusIcons = {
		success: 'done',
		fail: 'error',
	}

	const selectImage = (image) => {
		selectedImageOrigin = image.original;
		imageDialogOpen = true;
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

	<div class="images">
		{#each images as image, idx (idx)}
			<img src={image.thumbnail} alt="" on:click={() => selectImage(image)}>
		{/each}
	</div>

	<div class="post-accounts-list">accounts</div>
</div>

<Dialog bind:open={imageDialogOpen} surface$style="width: 650px; max-width: calc(100vw - 42px);">
	<DialogContent>
		<img class="image-in-dialog" src={selectedImageOrigin} alt="">
	</DialogContent>
</Dialog>

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

	.images {
		display: flex;
		gap: 4px;

		img {
			width: 36px;
			height: 36px;
			border-radius: 4px;
			cursor: pointer;
		}
	}

	.image-in-dialog {
		display: block;
		margin: 0 auto;
		max-height: 80vh;
		max-width: 100%;
	}

	* :global(.mdc-icon-button):active {
		border-radius: 50%;
	}
</style>
