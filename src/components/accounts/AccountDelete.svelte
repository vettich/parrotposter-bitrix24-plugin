<script lang="ts">
	import type { Account } from '@src/types';
	import { accounts } from '@src/store';
	import { _ } from '@src/lib/i18n';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '@smui/button';
	import CircularProgress from '@smui/circular-progress';

	export let account: Account;
	export let open = false;
	let deleting = false;

	const deleteAccount = () => {
		deleting = true;
		open = true;
		accounts.deleteAccount(account.id)
			.finally(() => {
				open = false;
				deleting = false;
			});
	}
</script>

<Dialog bind:open>
	<Title>{$_('accounts.ask_delete', {values: {name: account?.name}})}</Title>
	{#if deleting}
		<Content>
			<CircularProgress style="height: 24px; width: 24px;" indeterminate />
		</Content>
	{:else}
		<Actions>
			<Button>{$_('actions.no')}</Button>
			<Button on:click={deleteAccount}>{$_('actions.yes')}</Button>
		</Actions>
	{/if}
</Dialog>

