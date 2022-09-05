interface Menu {
	link: string,
	label: string,
	icon: string,
}

const menu: Menu[] = [
	{ link: '/posts', label: 'menu.posts', icon: 'text_snippet' },
	{ link: '/accounts', label: 'menu.accounts', icon: 'people_alt' },
	{ link: '/tariffs', label: 'menu.tariffs', icon: 'payment' },
	{ link: '/integrations', label: 'menu.integrations', icon: 'devices_other' },
];

export {
	type Menu,
	menu,
}
