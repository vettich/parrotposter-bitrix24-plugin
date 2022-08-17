<svelte:head>
	<title>Список постов - ParrotPoster</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { posts } from '../store';

	import CircularProgress from '@smui/circular-progress';
	import { Layout, PostList } from '../components';

	onMount(() => {
		posts.load(1, 25);
	})
</script>

<Layout>

	<h1>Список постов</h1>

	{#if $posts.loading}
		<CircularProgress style="height: 24px; width: 24px;" indeterminate />
	{:else if $posts.data.length == 0}
		Нет постов
	{:else}
		<PostList posts={$posts.data} />
	{/if}

</Layout>
