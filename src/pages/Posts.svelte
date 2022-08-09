<script>
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';
	import Layout from '../components/Layout.svelte';
	import PostList from '../components/PostList.svelte';
	import { user } from '../store/user.ts';
	import { posts } from '../store/posts.ts';

	onMount(() => {
		posts.load(1, 25);
	})
</script>

<Layout>

	<h1>Список постов</h1>

	{#if $posts.loading}
		Загрузка...
	{:else if $posts.data.length == 0}
		Нет постов
	{:else}
		<PostList posts={$posts.data} />
	{/if}

</Layout>
