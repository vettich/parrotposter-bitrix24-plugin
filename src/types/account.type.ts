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

interface ConnectReply {
	redirect_url: string,
	need_challenge: boolean,
	need_two_factor: boolean,
}

export type {
	Account,
	AccountType,
	ConnectReply,
}

export {
	accountsTypes,
}
