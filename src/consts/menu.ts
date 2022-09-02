interface Menu {
	link: string,
	label: string,
	icon: string,
}

const menu: Menu[] = [
	{ link: '/posts', label: 'Посты', icon: 'text_snippet' },
	{ link: '/accounts', label: 'Аккаунты', icon: 'people_alt' },
	{ link: '/tariffs', label: 'Тарифы', icon: 'payment' },
	{ link: '/integrations', label: 'Интеграции', icon: 'devices_other' },
];

export {
	type Menu,
	menu,
}
