<script lang="ts">
	import { addLeadingZero } from '@src/tools';
	import { selectAllOnFocus } from '@src/actions/select-all-on-focus';

	import Textfield from '@smui/textfield';
	import { DatePicker } from 'date-picker-svelte';

	export let date = new Date();

	$: dateStr = date.toLocaleDateString();

	let datepickerVisible = false;
	let timeStr = `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`

	function updateTime() {
		const t = timeStr.substring(0, 4);
		if (t.length === 4) {
			const hh = parseInt(t.substring(0, 2));
			const mm = parseInt(t.substring(2));
			if (hh < 24 && mm < 60) {
				date.setHours(hh);
				date.setMinutes(mm);
				date.setSeconds(0, 0);
				date = date;
			}
		}
	}

	function onFocusOutDatePicker(e: FocusEvent) {
		if (
			e?.currentTarget instanceof HTMLElement &&
			e.relatedTarget &&
			e.relatedTarget instanceof Node &&
			e.currentTarget.contains(e.relatedTarget)
		) {
			return
		} else {
			datepickerVisible = false
		}
	}

	function onFocusTimeinput() {
		timeStr = `${addLeadingZero(date.getHours())}${addLeadingZero(date.getMinutes())}`
	}

	function onFocusOutTimeinput() {
		updateTime();
		timeStr = `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`
	}
</script>

<div class="date-input">
	<div on:focusout={onFocusOutDatePicker}>
		<Textfield
			value={dateStr}
			label="Дата публикации"
			on:focus={() => datepickerVisible = true}
			input$readonly
			style="width: 100%"
			variant="outlined" />
		<div class="date-input__picker" class:date-input__picker--visible={datepickerVisible}>
			<DatePicker bind:value={date} min={new Date()} />
		</div>
	</div>

	<div>
		<Textfield
			use={[selectAllOnFocus]}
			bind:value={timeStr}
			label="Время публикации"
			on:focus={onFocusTimeinput}
			on:focusout={onFocusOutTimeinput}
			style="width: 100%"
			variant="outlined" />
	</div>
</div>

<style lang="scss">
	.date-input {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1em;

		&__picker {
			position: absolute;
			display: none;
			z-index: 10;
			top: 60px;

			&--visible {
				display: block;
			}
		}
	}
</style>
