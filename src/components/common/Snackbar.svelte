<script lang="ts">
	import { _ } from '@src/lib/i18n';

	import type { SnackbarComponentDev } from '@smui/snackbar';
	import Snackbar, { Label as SnackbarLabel } from '@smui/snackbar';

	let snackbar: SnackbarComponentDev;
	let _msg = '';
	let _success = true;

	export const show = (success: boolean, msg?: string) => {
		_success = success;
		_msg = msg ?? (success ? $_('success') : $_('fail'));
		snackbar.close();
		snackbar.open();
	}
</script>

<Snackbar bind:this={snackbar} class="mdc-snackbar--trailing {_success ? 'success' : 'error'}">
	<SnackbarLabel>{_msg}</SnackbarLabel>
</Snackbar>

