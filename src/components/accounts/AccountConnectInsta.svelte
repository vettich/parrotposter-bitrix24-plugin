<script lang="ts">
	import { accounts } from "@src/store";

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
					snackbar.show(true, 'Введите код отправленный вам на телефон или email');
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
	<Title>Подключение Instagram</Title>
	<Content>
		<div class="groups">
			<br>
			<span>Введите свои логин и пароль от инстаграма</span>
			<Textfield
				bind:value={username}
				label="Логин"
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />
			<Textfield
				bind:value={password}
				type="password"
				label="Пароль"
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />

			{#if needCodeEnter}
				<br>
				<span>Введите код отправленный вам на телефон или email</span>
				<Textfield
					bind:value={code}
					label="Код из смс"
					style="width: 100%"
					variant="outlined"
					on:keydown={connectOnEnter} />
			{/if}
		</div>
	</Content>
	<Actions>
		<Button disabled={connecting}>Отмена</Button>
		<Button variant="raised" on:click={connect} disabled={connecting}>
			Подключить
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
