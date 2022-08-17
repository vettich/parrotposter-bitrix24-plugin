<script lang="ts">
	import Dialog, { Content, InitialFocus } from '@smui/dialog';
	import { post } from '../../store';

	import { Icon } from '@smui/common';
	import CircularProgress from '@smui/circular-progress';
	import Images from './PostListItemImages.svelte';
	import Results from './PostQuickViewResults.svelte';
	import Button from '@smui/button';

	export let postId: string;
	export let open = false;

	$: open && post.fetchById(postId)

</script>

<Dialog bind:open surface$style="width: 650px; max-width: calc(100vw - 42px);">
	<Content>
		<!-- Хак, чтобы не возникало ошибки фокусировки в консоле при открытии диалога -->
		<div class="post-quick-view__hide"><Button use={[InitialFocus]}></Button></div>

		{#if $post.loading}
			<CircularProgress style="height: 32px; width: 32px" indeterminate />
		{:else}
			<div class="post-quick-view">
				<div class="post-quick-view__text">{$post.data?.fields?.text}</div>

				{#if $post.data.fields?.tags}
					<div class="post-quick-view__param">
						<div class="post-quick-view__label">Теги</div>
						<div class="post-quick-view__value">{$post.data.fields.tags}</div>
					</div>
				{/if}

				{#if $post.data.fields?.link}
					<div class="post-quick-view__param">
						<div class="post-quick-view__label">Ссылка</div>
						<div class="post-quick-view__value">
							{$post.data.fields.link}
							<a href={$post.data.fields.link} target="_blank">
								<Icon class="material-icons-outlined">open_in_new</Icon>
							</a>
						</div>
					</div>
				{/if}

				<div class="post-quick-view__param">
					<div class="post-quick-view__label">Дата публикации</div>
					<div class="post-quick-view__value">{$post.data.publish_at.toLocaleString()}</div>
				</div>

				{#if $post.data.fields?.images_sizes}
					<Images images={$post.data.fields?.images_sizes} size="medium" notOpen />
				{/if}

				<Results post={$post.data} />
			</div>
		{/if}
	</Content>
</Dialog>

<style lang="scss">
	@use '../../theme/helpers' as *; 

	.post-quick-view {
		display: flex;
		flex-direction: column;
		gap: 0.8em;

		&__text {
			white-space: pre-wrap;
			line-height: 1.3;
			color: cssvar(on-surface);
		}

		&__label {
			font-weight: bold;
		}

		&__hide {
			height: 0;
			overflow: hidden;
		}
	}
</style>
