<script lang="ts">
	import type { PostStatus } from '@src/types';
	import { _ } from '@src/lib/i18n';

	import { Icon } from '@smui/common';

	export let status: PostStatus;

	const icons: { [key in PostStatus]: string } = {
		success: 'done',
		fail: 'error',
		queue: 'schedule_send',
		ready: 'pending',
	};
</script>

<div title={$_('posts.status.' + status)}
	class="post-status post-status--{status}">
	<Icon class="material-icons-outlined">{icons[status]}</Icon>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *; 

	.post-status {
		display: flex;
		align-items: center;

		:global(.material-icons-outlined) {
			font-size: 1.2em;
		}

		&--success { color: cssvar('success') }
		&--ready { color: cssvar('warning') }
		&--fail { color: cssvar('error') }
		&--queue { color: cssvar('primary') }
	}
</style>
