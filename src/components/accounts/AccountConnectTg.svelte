<script lang="ts">
	import { accounts } from "@src/store";

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
				snackbar.show(false, 'Не удалось подключить. Проверьте правильность введенных данных');
			})
			.finally(() => connecting = false)
	}
</script>

<Dialog
	bind:open
	surface$style="width: 470px; max-width: calc(100vw - 32px);"
	scrimClickAction={connecting ? '' : 'close'}
	escapeKeyAction={connecting ? '' : 'close'} >
	<Title>Подключение Телеграм</Title>
	<Content>
		<div class="groups">
			<Textfield
				bind:value={bot_token}
				label="Токен бота"
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />
			<Textfield
				bind:value={username}
				label="Ссылка на канал или группу"
				style="width: 100%"
				variant="outlined"
				on:keydown={connectOnEnter} />

			<Accordion>
				<Panel>
					<Header>Инструкция</Header>
					<AccordionContent>
						<h4>Получение токена бота</h4>
						<ol>
							<li>Начните диалог с <b>@BotFather</b> <ExternalLink href="https://t.me/BotFather" /></li>
							<li>Отправьте ему команду <b>/newbot</b></li>
							<li>Придумайте имя бота, например, <b>Деликатесы</b></li>
							<li>Теперь задайте username боту, например, <b>delicatessen_bot</b></li>
							<li>@BotFather выдаст вам токен, скопируйте его в поле выше</li>
						</ol>

						<h4>Подключение бота к каналу</h4>
						<p>
							Добавьте бота в качестве администратора к своему каналу.
							Оставьте в качестве прав только "Публикация сообщений".
						</p>

						<h4>Подключение бота к группе</h4>
						<p>
							Добавьте бота в качестве участника в группу.
						</p>

						<h4>Доступ к каналу или группе</h4>
						<p>
							Обращаем внимание, что канал или группа должны быть публичными,
							чтобы была возможность постить.
						</p>
					</AccordionContent>
				</Panel>
			</Accordion>
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
		padding-top: 1em;
	}
</style>
