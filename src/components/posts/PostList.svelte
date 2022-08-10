<script lang="ts">
	import PostListItem from './PostListItem.svelte';
	import type { Post } from '../store/post.ts';

	export let posts: Post[];
</script>

<div class="posts">
	{#each posts as post, idx (post.id)}
		<PostListItem {post} />
	{/each}
</div>

<style lang="scss">
	.posts {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}
</style>
