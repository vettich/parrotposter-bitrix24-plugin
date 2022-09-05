<script lang="ts">
	import { post } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import Dialog, { Content } from '@smui/dialog';
	import { Icon } from '@smui/common';
	import CircularProgress from '@smui/circular-progress';
	import Button from '@smui/button';
	import Images from './PostListItemImages.svelte';
	import Results from './PostQuickViewResults.svelte';

	export let postId: string;
	export let open = false;

	$: open && post.fetchById(postId)

</script>

<Dialog bind:open surface$style="width: 650px; max-width: calc(100vw - 42px); overflow: visible;">
	<div class="post-quick-view__close-btn" on:click={() => open = false}>
		<Button variant="unelevated"><Icon class="material-icons-outlined">close</Icon></Button>
	</div>

	<Content>
		<!-- Хак, чтобы не возникало ошибки фокусировки в консоле при открытии диалога -->
		<button style="position: absolute; z-index: -111; opacity: 0;" />

		{#if $post.loading}
			<CircularProgress style="height: 32px; width: 32px" indeterminate />
		{:else}
			<div class="post-quick-view">
				<div class="post-quick-view__text">{$post.data?.fields?.text}</div>

				{#if $post.data.fields?.tags}
					<div class="post-quick-view__param">
						<div class="post-quick-view__label">{$_('posts.fields.tags')}</div>
						<div class="post-quick-view__value">{$post.data.fields.tags}</div>
					</div>
				{/if}

				{#if $post.data.fields?.link}
					<div class="post-quick-view__param">
						<div class="post-quick-view__label">{$_('posts.fields.link')}</div>
						<div class="post-quick-view__value">
							{$post.data.fields.link}
							<a href={$post.data.fields.link} target="_blank">
								<Icon class="material-icons-outlined">open_in_new</Icon>
							</a>
						</div>
					</div>
				{/if}

				<div class="post-quick-view__param">
					<div class="post-quick-view__label">{$_('posts.fields.publish_at')}</div>
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
	@use './src/theme/helpers' as *; 

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

		&__close-btn {
			display: none;
			position: absolute;
			top: 10px;
			right: 10px;
			transform: translate(50%, -50%);

			@media screen and (max-width: 768px) {
				display: block;
			}

			:global(button) {
				min-width: fit-content;
				padding: 12px;
			}

			:global(.mdc-button__icon) {
				margin: 0;
			}
		}
	}
</style>
