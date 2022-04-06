import _ from 'lodash';

export const ENDPOINTS = {
	POST_LOGIN: '/auth/login',
	GET_RATES: '/rate',
	UPDATE_RATE: '/rate/:id',
	DELETE_RATE: '/rate/:id',
	GET_GROUP_MASTERS: '/master-group',
	UPDATE_GROUP_MASTER: '/master-group/:id',
	DELETE_GROUP_MASTER: '/master-group/:id',
	GET_TRANSACTIONS: '/transaction',
	GET_TRANSACTION_MASTERS: '/transaction/masters',
	GET_EXCHANGES: '/exchange',
	UPDATE_EXCHANGE: '/exchange/:id',
	GET_CURRENT_ADMIN: '/account/me',
	GET_MASTER: '/master/:id',
	GET_MASTERS: '/master',
	GET_USERS: '/user',
	UPDATE_USER: '/user/:id',
	POST_USER_SUB_ADMIN: '/sub-admin',
	UPDATE_USER_SUB_ADMIN: '/sub-admin/:id',
	POST_USER_SUPPORT: '/support',
	UPDATE_USER_SUPPORT: '/support/:id',
	GET_FOLLOWERS: '/follower',
	GET_FOLLOWER: '/follower/:id',
	RENEWAL_FOLLOWER: '/follower/renewal/:id',
	POST_STICKY: '/notification/sticky',
	CHANGE_PASSWORD: '/user/passwd/:id',
	CHANGE_ACTIVE_USER: '/user/active/:id',
	CHANGE_ACTIVE_MASTER: '/master/active/:id',
	CHANGE_ACTIVE_FOLLOWER: '/follower/active/:id',
	CHANGE_GROUP_LIMIT: '/sub-admin/group-limit/:id',
};

export const getApiUrl = (endpoint: string, params?: any): string => {
	let path = endpoint;
	if (params) {
		_.forEach(params, (value, key) => {
			const replace = `:${key}`;
			if (path.indexOf(replace) !== -1) {
				const re = new RegExp(replace, 'g');
				path = path.replace(re, value.toString());
			}
		});
	}
	
	return path;
};
