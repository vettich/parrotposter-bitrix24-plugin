import type { UnionOfArrayElements } from "@src/tools";

interface Account {
	id: string,
	name: string,
	type: AccountType,
	photo: string,
	link: string,
}

const accountsTypes = ['vk', 'tg', 'ok', 'fb', 'insta'];

type AccountType = UnionOfArrayElements<typeof accountsTypes>;

interface ConnectArgs {
	type: AccountType,
	fields: ConnectFields,
}

type ConnectFields = ConnectCommonFields | ConnectTgFields | ConnectInstaFields;

interface ConnectCommonFields {
	callback_url: string,
}

interface ConnectTgFields {
	bot_token: string,
	username: string,
}

interface ConnectInstaFields {
}

interface ConnectReply {
	account_id?: string,
	redirect_url?: string,
	need_challenge?: boolean,
	need_two_factor?: boolean,
	phone?: string,
}

export type {
	Account,
	AccountType,
	ConnectArgs,
	ConnectFields,
	ConnectReply,
}

export {
	accountsTypes,
}
