import { writable } from 'svelte/store';
import { api } from '@src/api';
import type { Tariff, TariffsReply } from '@src/types';

interface TariffsStore {
	loading: boolean,
	data?: Tariff[],
}

function createTariffs() {
	const { subscribe, update } = writable<TariffsStore>({ loading: false });

	const setLoading = (loading: boolean) => {
		update(store => ({...store, loading}));
	}

	let firstLoaded = false;
	const load = async () => {
		if (!firstLoaded) {
			setLoading(true);
			firstLoaded = true;
		}

		try {
			const res = await api.get<TariffsReply>('tariffs');
			update(store => ({
				...store,
				data: res.tariffs,
			}));
		} catch (e) {
			console.log(e);
		}

		setLoading(false);
	}

	return {
		subscribe,
		load,
	}
}

const tariffs = createTariffs();

export {
	tariffs,
	type TariffsStore,
}
