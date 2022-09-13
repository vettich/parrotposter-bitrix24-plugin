<svelte:head>
	<title>{$_('posts.page_title')} - ParrotPoster</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { posts } from '@src/store';
	import { navigate } from '@src/tools';
	import { _ } from '@src/lib/i18n';

	import CircularProgress from '@smui/circular-progress';
	import { Layout, PostList } from '@src/components';
	import Button from '@smui/button';
	import Fab, { Icon } from '@smui/fab';

	onMount(() => {
		posts.loadFirstPage();
	})
</script>

<Layout>
	<h1>{$_('posts.page_title')}</h1>

	{#if $posts.loading && $posts.data.length == 0}
		<CircularProgress style="height: 24px; width: 24px;" indeterminate />
	{:else if $posts.data.length == 0}
		{$_('posts.no_posts')}
	{:else}
		<div class="posts">
			<PostList posts={$posts.data} />

			{#if $posts.hasNext}
				<div class="posts__next-btn">
					<Button variant="raised" on:click={posts.loadNextPage} disabled={$posts.loading}>
						{#if $posts.loading}
							<CircularProgress style="height: 24px; width: 24px;" indeterminate />
						{:else}
							{$_('posts.show_more')}
						{/if}
					</Button>
				</div>
			{/if}
		</div>
	{/if}

	<svelte:fragment slot="actions">
		<Fab color="primary" title={$_('posts.create_post_btn_title')} on:click={() => navigate('/posts/new')}>
			<Icon class="material-icons-outlined">add</Icon>
		</Fab>
	</svelte:fragment>
</Layout>

<style lang="scss">
	.posts {
		padding-bottom: 2em;

		&__next-btn {
			display: flex;
			justify-content: center;
			margin-top: 2em;
			
			:global(button) {
				cursor: pointer;
				width: 200px;
				max-width: 100%;
			}
		}
	}
</style>
