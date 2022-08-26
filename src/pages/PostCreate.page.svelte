<svelte:head>
	<title>Создание поста - ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { navigate } from 'svelte-routing';
	import type { PostCreate } from '@src/types';
	import api from '@src/api';

	import { Layout, BackButton } from '@src/components';
	import { PostForm } from '@src/components/post-form';

	let saving = false;

	function goBack() {
		navigate('/posts')
	}

	function create(e: CustomEvent) {
		const postCreate: PostCreate = e.detail;
		saving = true;
		api.post('posts', postCreate)
			.finally(() => {
				saving = false
				goBack();
			});
	}
</script>

<Layout>
	<BackButton on:click={goBack} />
	<h1>Создание поста</h1>

	<PostForm on:cancel={goBack} on:create={create} {saving} />
</Layout>

<style lang="scss">
	@use './src/theme/helpers' as *;
</style>
