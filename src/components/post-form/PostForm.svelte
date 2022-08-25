<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Post, PostFields, PostNetworks, PostCreate } from '@src/types';
	import { textareaResizer } from '@src/actions/textarea-resizer';

	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import DateTimeForm from './DateTimeForm.svelte';
	import AccountsChoose from './AccountsChoose.svelte';

	export let mode: 'create' | 'update' = 'create';
	export let saving = false;

	const dispatch = createEventDispatcher();

	let text = '';
	let tags = '';
	let link = '';
	let accountIds: string[] = [];

	let dateVariant: 'now' | 'delay' | 'custom' = 'now';
	let delayMinutes = 5;
	let customDate = new Date();

	function buildDateSelectedVariant() {
		if (dateVariant === 'now') return new Date();

		if (dateVariant === 'delay') {
			const d = new Date();
			d.setMinutes(d.getMinutes() + delayMinutes);
			return d;
		}

		return customDate;
	}

	function onCreate() {
		const postCreate: PostCreate = {
			fields: {
				text,
				tags,
				link,
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
			bind:value={link}
			label="Ссылка"
			style="width: 100%"
			variant="outlined">
		</Textfield>

		<div class="post-form__separator" />

		Тут будет загрузка картинок

		<div class="post-form__separator" />

		<DateTimeForm bind:variant={dateVariant} bind:delayMinutes={delayMinutes} bind:customDate={customDate} />
		
		<div class="post-form__separator" />

		<AccountsChoose bind:accountIds />

		<div class="post-form__separator" />

		<div class="post-form__actions">
			{#if mode === 'create'}
				<Button class="post-form__btn--min" variant="raised" disabled={saving} on:click={onCreate}>
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

			@media screen and (max-width: 768px) {
				width: 100%;
				padding: 0;
				margin: 0 auto;
				background-color: transparent;
				box-shadow: none;
			}
		}

		&__actions {
			position: sticky;
			bottom: 0;
			display: flex;
			gap: 1em;
			background-color: cssvar(surface);
			margin: -1em;
			padding: 1em;
		}

		:global(.post-form__btn--min) {
			min-width: 130px;
		}
	}
</style>
