import { writable } from 'svelte/store';
import { api } from '@src/api';
import type { Tariff } from '@src/types';

interface TariffStore {
	loading: boolean,
	data?: Tariff,
}

function createTariff() {
	const { subscribe, update } = writable<TariffStore>({ loading: false });

	const setLoading = (loading: boolean) => {
		update(store => ({...store, loading}))
	}

	let prevId: string = '';
	const fetchById = async (id: string, reload = false) => {
		if (prevId === id && !reload) return;

		setLoading(true);

		try {
			const data = await api.getById<Tariff>('tariffs', id);
			update(store => ({
				...store,
				data,
			}))
		} catch (e) {
			console.log(e)
		}

		setLoading(false);
	}

	return {
		subscribe,
		fetchById,
	}
}

const tariff = createTariff();

export type {
	TariffStore,
};

export {
	tariff,
};
