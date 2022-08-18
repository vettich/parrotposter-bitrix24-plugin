import type { AccountMap } from '@src/store';
import type { Account, PostResults, PostResult } from '@src/types';

interface Item {
	id: string,
	account?: Account,
	result?: PostResult,
}

interface Items {
	[key: string]: Item,
}

const setItem = (items: Items, item: Item) => {
	if (!items[item.id]) {
		items[item.id] = item;
	} else {
		items[item.id] = {...items[item.id], ...item};
	}
}

function mergeAccountsResults(accounts: AccountMap, accountIds: string[], results: PostResults): Item[] {
	let items: Items = {};

	for (const id of accountIds) {
		setItem(items, { id, account: accounts.getById(id) });
	}

	for (const id in results) {
		setItem(items, { id, result: results[id] });
	}

	return Object.values(items);
}

export { 
	mergeAccountsResults,
}
