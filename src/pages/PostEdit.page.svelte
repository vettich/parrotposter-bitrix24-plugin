<svelte:head>
	<title>Редактирование поста - ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { navigate } from 'svelte-routing';
	import type { Post, PostInput } from '@src/types';
	import { api } from '@src/api';

	import { Layout, BackButton } from '@src/components';
	import { PostForm } from '@src/components/post-form';
	import CircularProgress from '@smui/circular-progress';

	// post id
	export let id: string;

	let post: Post;
	let loading = true;
	api.getById('posts', id)
		.then(res => post = res)
		.catch(console.log)
		.finally(() => loading = false);

	let saving = false;

	function goBack() {
		navigate('/posts')
	}

	function update(e: CustomEvent<PostInput>) {
		saving = true;
		api.postById('posts', id, e.detail)
			.finally(() => {
				saving = false
				goBack();
			});
	}
</script>

<Layout>
	<BackButton on:click={goBack} />
	<h1>Редактирование поста</h1>

	{#if loading }
		<CircularProgress style="height: 24px; width: 24px;" indeterminate />
	{:else}
		<PostForm on:cancel={goBack} on:submit={update} mode="update" initialPost={post} {saving} />
	{/if}
</Layout>

<style lang="scss">
	@use './src/theme/helpers' as *;
</style>
