import type { Platform } from './platform.type';

interface User {
	id: string,
	name: string,
	username: string,
	from: Platform,
	blocked: boolean,
	roles: UserRole[],
	tariff: UserTariff,
	tariff_limits: UserTariffLimits,
}

type UserRole = 'admin';

interface UserTariff {
	id: string,
	code: string,
	expiry_at: Date | string,
}

interface UserTariffLimits {
	accounts_cnt: number,
	accounts_current_cnt: number,
}

function canAddAccount(user: User): boolean {
	if (!user) return false;
	return user.tariff_limits.accounts_current_cnt < user.tariff_limits.accounts_cnt;
}

export type {
	User,
	UserRole,
	UserTariff,
	UserTariffLimits,
}

export {
	canAddAccount,
}
