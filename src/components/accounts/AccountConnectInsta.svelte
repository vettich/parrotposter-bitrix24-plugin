<script lang="ts">
	import { accounts } from "@src/store";
	import { _ } from "@src/lib/i18n";

	import Dialog, { Title, Content, Actions } from "@smui/dialog";
	import Button from "@smui/button";
	import Textfield from "@smui/textfield";
	import CircularProgress from "@src/components/common/CircularProgress.svelte";
	import Snackbar from "../common/Snackbar.svelte";

	export let open = false;

	let username = '';
	let password = '';
	let code = '';
	let needCodeEnter = false;

	// clear values if dialog close
	$: if (!open) {
		username = password = code = '';
		needCodeEnter = false;
	}

	let connecting = false;
	let snackbar: Snackbar = null;

	const connectOnEnter = (e: Event) => {
		const keyEvent = e as KeyboardEvent
		if (keyEvent.key === 'Enter') connect(e);
	}

	const connect = async (e: Event) => {
		e.stopPropagation();

		if (!username.length || !password.length) return;

		connecting = true;
		accounts.connect('insta', { username, password, code })
			.then((res) => {
				if (res.need_challenge || res.need_two_factor) {
					needCodeEnter = true;
					snackbar.show(true, $_('accounts.insta_form.enter_sended_code'));
					return;
				}
				open = false;
				snackbar.show(true);
			})
			.catch(e => snackbar.show(false, e.msg))
			.finally(() => connecting = false)
	}
</script>

<Dialog
	bind:open
	surface$style="width: 470px; max-width: calc(100vw - 32px);"
	scrimClickAction={connecting ? '' : 'close'}
	escapeKeyAction={connecting ? '' : 'close'} >
	<Title>{$_('accounts.insta_form.title')}</Title>
	<Content>
		<div class="groups">
			<br>
			<span>{$_('accounts.insta_form.enter_your_login_password')}</span>
			<Textfield
				bind:value={username}
				label={$_('accounts.insta_form.login')}
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />
			<Textfield
				bind:value={password}
				type="password"
				label={$_('accounts.insta_form.password')}
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />

			{#if needCodeEnter}
				<br>
				<span>$_('accounts.insta_form.enter_sended_code')</span>
				<Textfield
					bind:value={code}
					label={$_('accounts.insta_form.code')}
					style="width: 100%"
					variant="outlined"
					on:keydown={connectOnEnter} />
			{/if}
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
	}
</style>
