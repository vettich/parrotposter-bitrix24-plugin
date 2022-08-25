<script lang="ts">
	import { Icon } from '@smui/common';
	import type { PostStatus } from '@src/types';

	export let status: PostStatus;

	const statusIcons: { [key in PostStatus]: string } = {
		success: 'done',
		fail: 'error',
		queue: 'schedule_send',
		ready: 'pending',
	}
</script>

<div
	class="post-status post-status--{status}">
	<Icon class="material-icons-outlined">{statusIcons[status]}</Icon>
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
