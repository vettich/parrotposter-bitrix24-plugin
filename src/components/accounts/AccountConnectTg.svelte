<script lang="ts">
	import { accounts } from "@src/store";
	import { _ } from "@src/lib/i18n";

	import Dialog, { Title, Content, Actions } from "@smui/dialog";
	import Button from "@smui/button";
	import Textfield from "@smui/textfield";
	import Accordion, { Panel, Header, Content as AccordionContent } from '@smui-extra/accordion';
	import Snackbar from '@src/components/common/Snackbar.svelte';
	import ExternalLink from "@src/components/common/ExternalLink.svelte";
	import CircularProgress from "@src/components/common/CircularProgress.svelte";

	export let open = false;

	let username = '';
	let bot_token = '';

	// clear values if dialog close
	$: !open && (username = bot_token = '');

	let connecting = false;
	let snackbar: Snackbar;

	const connectOnEnter = (e: Event) => {
		const keyEvent = e as KeyboardEvent
		if (keyEvent.key === 'Enter') connect(e);
	}

	const connect = async (e: Event) => {
		e.stopPropagation();

		if (!username.length || !bot_token.length) return;

		connecting = true;
		accounts.connect('tg', { username, bot_token })
			.then(() => {
				open = false;
				snackbar.show(true);
			})
			.catch(e => {
				console.log(e)
				snackbar.show(false, $_('accounts.tg_form.failed_to_connect'));
			})
			.finally(() => connecting = false)
	}
</script>

<Dialog
	bind:open
	surface$style="width: 470px; max-width: calc(100vw - 32px);"
	scrimClickAction={connecting ? '' : 'close'}
	escapeKeyAction={connecting ? '' : 'close'} >
	<Title>{$_('accounts.tg_form.title')}</Title>
	<Content>
		<div class="groups">
			<Textfield
				bind:value={bot_token}
				label={$_('accounts.tg_form.bot_token')}
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />
			<Textfield
				bind:value={username}
				label={$_('accounts.tg_form.username')}
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />

			<Accordion>
				<Panel>
					<Header>{$_('accounts.tg_form.instruction')}</Header>
					<AccordionContent>
						<h4>{$_('accounts.tg_form.getting_bot_token')}</h4>
						<ol>
							<li>{@html $_('accounts.tg_form.start_with_bot_father')} <ExternalLink href="https://t.me/BotFather" /></li>
							<li>{@html $_('accounts.tg_form.send_newbot_command')}</li>
							<li>{@html $_('accounts.tg_form.set_bot_name')}</li>
							<li>{@html $_('accounts.tg_form.set_bot_username')}</li>
							<li>{@html $_('accounts.tg_form.copy_generated_token')}</li>
						</ol>

						<h4>{$_('accounts.tg_form.connect_bot_to_chanel')}</h4>
						<p>{$_('accounts.tg_form.connect_bot_to_chanel_desc')}</p>

						<h4>{$_('accounts.tg_form.connect_bot_to_group')}</h4>
						<p>{$_('accounts.tg_form.connect_bot_to_group_desc')}</p>

						<h4>{$_('accounts.tg_form.access_to_group_and_channel')}</h4>
						<p>{$_('accounts.tg_form.access_to_group_and_channel_desc')}</p>
					</AccordionContent>
				</Panel>
			</Accordion>
		</div>
	</Content>
	<Actions>
		<Button disabled={connecting}>{$_('actions.cancel')}</Button>
		<Button variant="raised" on:click={connect} disabled={connecting}>
			{$_('accounts.connect')}
			{#if connecting}
				<CircularProgress />
			{/if}
		</Button>
	</Actions>
</Dialog>

<Snackbar bind:this={snackbar} />

<style lang="scss">
	.groups {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-top: 1em;
	}
</style>
