<svelte:head>
	<title>{$_('posts.create_page_title')} - ParrotPoster</title>
</svelte:head>

<script lang="ts">
	import { navigate } from '@src/tools';
	import type { PostInput } from '@src/types';
	import { api } from '@src/api';
	import { _ } from '@src/lib/i18n';

	import { Layout, BackButton } from '@src/components';
	import { PostForm } from '@src/components/post-form';

	let saving = false;

	function goBack() {
		navigate('/posts')
	}

	function create(e: CustomEvent<PostInput>) {
		saving = true;
		api.post('posts', e.detail)
			.finally(() => {
				saving = false
				goBack();
			});
	}
</script>

<Layout>
	<BackButton on:click={goBack} />
	<h1>{$_('posts.create_page_title')}</h1>

	<PostForm on:cancel={goBack} on:submit={create} {saving} />
</Layout>

<style lang="scss">
	@use './src/theme/helpers' as *;
</style>
