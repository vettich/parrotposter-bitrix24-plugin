<script lang="ts">
	import type { Post } from '@src/types';

	import { Icon } from '@smui/common';
	import Item from './PostListItem.svelte';

	export let posts: Post[];

	interface Group {
		[key: string]: Post[],
	}

	const dateToStr = (d: Date) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

	const formatDay = (d: Date | string) => {
		d = new Date(d);
		return d.toLocaleDateString();
	}

	$: group = posts.reduce((group: Group, post) => {
		const { publish_at } = post;
		const key = dateToStr(new Date(publish_at));
		group[key] = group[key] ?? [];
		group[key].push(post);
		return group;
	}, {})
</script>

{#each Object.entries(group) as [date, posts] (date)}
	<h2 class="posts__title">
		<div class="posts__title-icon">
			<Icon class="material-icons-outlined">calendar_today</Icon>
		</div>
		{formatDay(date)}
	</h2>
	<div class="posts">
		{#each posts as post (post.id)}
			<Item {post} />
		{/each}
	</div>
{/each}

<style lang="scss">
	@use './src/theme/helpers' as *; 

	.posts {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding-left: 20px;
		margin-left: 16px;
		border-left: 2px solid cssvar(primary);

		@media screen and (max-width: 768px) {
			padding-left: 0;
			margin-left: 0;
			border: none;
		}

		&__title {
			display: flex;
			align-items: center;
			gap: 12px;
		}

		&__title-icon {
			display: inline-flex;
			color: cssvar(on-primary);
			background-color: cssvar(primary);
			border-radius: 50%;
			width: 32px;
			height: 32px;
			justify-content: center;
			align-items: center;

			:global(.material-icons-outlined) {
				font-size: 80%;
			}
		}
	}
</style>
