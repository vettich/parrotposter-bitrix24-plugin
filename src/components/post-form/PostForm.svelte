<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PostCreate } from '@src/types';
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

	const dispatch = createEventDispatcher();

	let text = '';
	let tags = '';
	let link = '';
	let imagesIds: string[] = [];
	let accountIds: string[] = [];

	let dateVariant: 'now' | 'delay' | 'custom' = 'now';
	let delayMinutes = 5;
	let customDate = new Date();

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
	$: validData = text.trim().length || tags.trim().length || (!emptyLink && validLink);
	$: valid = validData && accountIds.length;
	$: errors = [
		validData ? null : 'Заполните поле текст, теги или ссылка',
		accountIds.length ? null : 'Укажите куда публиковать пост',
	].filter(v => !!v);

	function onCreate() {
		const postCreate: PostCreate = {
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
		dispatch('create', postCreate);
	}
</script>

<div class="post-form">
	<div class="post-form__block mdc-elevation--z4">
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

		<div class="post-form__separator" />

		<ImagesForm bind:imagesIds />

		<div class="post-form__separator" />

		<DateTimeForm bind:variant={dateVariant} bind:delayMinutes={delayMinutes} bind:customDate={customDate} />
		
		<div class="post-form__separator" />

		<AccountsChoose bind:accountIds />

		<div class="post-form__separator" />

		{#if errors.length}
			<Paper color="error">
				<Content>
					{#each errors as err, idx}
						<div>{idx + 1}. {err}</div>
					{/each}
				</Content>
			</Paper>
		{/if}

		<div class="post-form__footer">
			<div class="post-form__actions">
				{#if mode === 'create'}
					<Button class="post-form__btn--min" variant="raised" disabled={saving || !valid} on:click={onCreate}>
						{#if saving}
							<CircularProgress style="height: 24px; width: 24px;" indeterminate />
						{:else}
							Создать
						{/if}
					</Button>
				{/if}

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
			gap: 1em;
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
