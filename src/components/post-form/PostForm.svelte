<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Post, PostInput } from '@src/types';
	import { textareaResizer } from '@src/actions/textarea-resizer';

	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import Paper, { Content } from '@smui/paper';
	import DateTimeForm from './DateTimeForm.svelte';
	import AccountsChoose from './AccountsChoose.svelte';
	import ImagesForm from './ImagesForm.svelte';

	export let mode: 'create' | 'update' = 'create';
	export let saving = false;
	export let initialPost: Post = null;

	const dispatch = createEventDispatcher();

	let text = initialPost?.fields?.text || '';
	let tags = initialPost?.fields?.tags || '';
	let link = initialPost?.fields?.link || '';
	let imagesIds: string[] = initialPost?.fields?.images || [];
	let accountIds: string[] = initialPost?.networks?.accounts || [];
	let submitText = mode === 'create' ? 'Создать' : 'Обновить';
	let editable = mode === 'create' ||
		(initialPost?.status !== 'success' && initialPost.status !== 'fail');

	let dateVariant: 'now' | 'delay' | 'custom' = initialPost ? 'custom' : 'now';
	let delayMinutes = 5;
	let customDate = initialPost?.publish_at ? new Date(initialPost.publish_at) : new Date();

	function buildDateSelectedVariant() {
		if (dateVariant === 'now') return new Date();

		if (dateVariant === 'delay') {
			const d = new Date();
			d.setMinutes(d.getMinutes() + delayMinutes);
			d.setSeconds(0, 0);
			return d;
		}

		return customDate;
	}

	$: emptyLink = link.trim().length == 0
	$: validLink = link.trim().match(/http[s]?:\/\/.{3,}/);
	$: emptyImages = imagesIds.length == 0
	$: validData = text.trim().length || tags.trim().length || (!emptyLink && validLink) || !emptyImages;
	$: valid = validData && accountIds.length;
	$: errors = [
		validData ? null : 'Заполните хотя бы одно из полей: текст, теги, ссылка. Или загрузите картинки',
		accountIds.length ? null : 'Укажите куда публиковать пост',
	].filter(v => !!v);

	function buildPostInput(): PostInput {
		const input: PostInput = {
			fields: {
				text: text.trim(),
				tags: tags.trim(),
				link: link.trim(),
				images: imagesIds,
			},
			networks: {
				accounts: accountIds,
			},
			publish_at: buildDateSelectedVariant(),
		}
		return input;
	}

	function submit() {
		const input = buildPostInput();
		dispatch('submit', input);
	}
</script>

<div class="post-form">
	<div class="post-form__block mdc-elevation--z4">
		<div class="post-form__group">
			<Textfield
				use={[textareaResizer]}
				bind:value={text}
				label="Текст поста"
				style="width: 100%; min-height: 9em; max-height: 600px;"
				textarea>
			</Textfield>
			<Textfield
				bind:value={tags}
				label="Теги"
				style="width: 100%"
				variant="outlined">
			</Textfield>
			<Textfield
				invalid={!emptyLink && !validLink}
				bind:value={link}
				label="Ссылка"
				style="width: 100%"
				variant="outlined">
			</Textfield>
		</div>

		{#if editable || imagesIds.length}
			<div class="post-form__group">
				<ImagesForm bind:imagesIds {editable} />
			</div>
		{/if}

		<div class="post-form__group">
			<DateTimeForm bind:variant={dateVariant} bind:delayMinutes={delayMinutes} bind:customDate={customDate} {editable} />
		</div>
		
		<div class="post-form__group">
			<AccountsChoose bind:accountIds {editable} />
		</div>

		{#if errors.length}
			<div class="post-form__group">
				<Paper color="error">
					<Content>
						{#each errors as err, idx}
							<div>{idx + 1}. {err}</div>
						{/each}
					</Content>
				</Paper>
			</div>
		{/if}

		<div class="post-form__footer">
			<div class="post-form__actions">
				<Button class="post-form__btn--min" variant="raised" disabled={saving || !valid} on:click={submit}>
					{#if saving}
						<CircularProgress style="height: 24px; width: 24px;" indeterminate />
					{:else}
						{submitText}
					{/if}
				</Button>

				<Button on:click={() => dispatch('cancel')}>Отмена</Button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.post-form {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		margin-bottom: 2em;

		&__block {
			display: flex;
			flex-direction: column;
			gap: 2em;
			width: 490px;
			max-width: 100%;
			background-color: cssvar(surface);
			padding: 1em;
			border-radius: 4px;

			@media screen and (max-width: 768px) {
				width: 100%;
				padding: 0;
				margin: 0 auto;
				background-color: transparent;
				box-shadow: none;
			}
		}

		&__group {
			display: flex;
			flex-direction: column;
			gap: 1em;
			width: 100%;
		}

		&__footer {
			position: sticky;
			bottom: 0;
			display: flex;
			flex-direction: column;
			gap: 1em;
			margin: -1em;
			padding: 1em;
			background-color: cssvar(surface);
			z-index: 10;
		}

		&__actions {
			display: flex;
			gap: 1em;
		}

		:global(.post-form__btn--min) {
			min-width: 130px;
		}
	}
</style>
