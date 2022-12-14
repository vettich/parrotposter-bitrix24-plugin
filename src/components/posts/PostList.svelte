<script lang="ts">
	import type { Post } from '@src/types';
	import { formatDateWithDuration } from '@src/lib/i18n';
	import { getDateRange } from '@src/tools/date';

	import { Icon } from '@smui/common';
	import Item from './PostListItem.svelte';

	export let posts: Post[];

	interface Group {
		[key: string]: Post[],
	}

	const dateToStr = (d: Date) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

	$: groups = Object.entries(posts.reduce((group: Group, post) => {
		const { publish_at } = post;
		const key = dateToStr(new Date(publish_at));
		group[key] = group[key] ?? [];
		group[key].push(post);
		return group;
	}, {}))

	// smooth progression
	let firstRenderFinished = false;
	let groupCurrentRender = 2;
	let intervalId = setInterval(() => {
		const len = Object.keys(groups).length;
		if (groupCurrentRender >= len) {
			clearInterval(intervalId);
			firstRenderFinished = true;
			return;
		}

		groupCurrentRender += Math.max(1, Math.round(groupCurrentRender / 2));
	}, 10);

	$: groupsWithSmooth = firstRenderFinished ? groups : groups.slice(0, groupCurrentRender);
</script>

{#each groupsWithSmooth as [date, posts] (date)}
	<div class="posts__wrap posts--{getDateRange(date)}">
		<h2 class="posts__title">
			<div class="posts__title-icon">
				<Icon class="material-icons-outlined">calendar_today</Icon>
			</div>
			{$formatDateWithDuration(date)}
		</h2>
		<div class="posts">
			{#each posts as post (post.id)}
				<Item {post} />
			{/each}
		</div>
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
			border-radius: 50%;
			width: 32px;
			height: 32px;
			justify-content: center;
			align-items: center;
			color: cssvar(on-primary);
			background-color: cssvar(primary);

			:global(.material-icons-outlined) {
				font-size: 80%;
			}

		}

		&--today & {
			border-color: cssvar(success);
		}

		&--today &__title-icon {
			color: cssvar(on-success);
			background-color: cssvar(success);
		}

		&--future &,
		&--tomorrow & {
			border-color: rgba(cssvar(warning-rgb), 0.8);
		}

		&--future &__title-icon,
		&--tomorrow &__title-icon {
			color: cssvar(on-warning);
			background-color: rgba(cssvar(warning-rgb), 0.8);
		}
	}
</style>
