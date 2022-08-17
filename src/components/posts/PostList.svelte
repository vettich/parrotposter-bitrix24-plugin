<script lang="ts">
	import Item from './PostListItem.svelte';
	import type { Post } from '../../types';

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
		const key = dateToStr(publish_at);
		group[key] = group[key] ?? [];
		group[key].push(post);
		return group;
	}, {})
</script>

{#each Object.entries(group) as [date, posts] (date)}
	<h2>{formatDay(date)}</h2>
	<div class="posts">
		{#each posts as post (post.id)}
			<Item {post} />
		{/each}
	</div>
{/each}

<style lang="scss">
	@use '../../theme/helpers' as *; 

	.posts {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding-left: 1em;
		border-left: 2px solid cssvar(primary);
	}
</style>
