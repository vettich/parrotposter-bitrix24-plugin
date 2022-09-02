<script lang="ts">
	import { user } from '@src/store';

	import { Link } from 'svelte-navigator';

	let currentCnt = 0;
	let totalCnt = 0;
	let bgColor = 'primary';

	$: if ($user.data) {
		currentCnt = $user.data.tariff_limits.accounts_current_cnt;
		totalCnt = $user.data.tariff_limits.accounts_cnt;

		const percent = currentCnt / totalCnt;
		if (currentCnt >= totalCnt) bgColor = 'error';
		else if (percent > 0.5) bgColor = 'warning';
		else bgColor = 'primary';
	}
</script>

<div class="accounts-limits-info accounts-limits-info--{bgColor}">
	Добавлено {currentCnt} из {totalCnt}. <Link to="/tariffs">Сменить тариф</Link>
</div>

<style lang="scss">
	@use './src/theme/helpers' as *;

	.accounts-limits-info {
		font-size: 13px;
		font-weight: bold;
		padding: 8px 16px;
		border-radius: 50px;
		background-color: rgba(cssvar(primary-rgb), 0.25);
		color: cssvar(on-surface);

		:global(a) { color: cssvar(primary) }

		&--warning {
			background-color: rgba(cssvar(warning-rgb), 0.25);

			:global(a) { color: cssvar(warning) }
		}

		&--error {
			background-color: rgba(cssvar(error-rgb), 0.25);

			:global(a) { color: cssvar(error) }
		}
	}
</style>
