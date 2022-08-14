interface Account {
	id: string,
	name: string,
	type: AccountType,
	photo: string,
	link: string,
}

type AccountType = 'vk' | 'fb' | 'tg' | 'ok' | 'insta' | 'tw'

export type {
	Account,
	AccountType,
}
