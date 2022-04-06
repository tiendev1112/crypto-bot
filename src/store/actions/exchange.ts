import { AllTypeActions } from '../types';

export const getExchanges = (): any => {
	return {
		type: AllTypeActions.GET_EXCHANGES,
	};
};

export const postExchange = (value: any): any => {
	return {
		type: AllTypeActions.POST_EXCHANGE,
		value
	};
};

export const updateExchange = (id: string, value: any): any => {
	return {
		type: AllTypeActions.UPDATE_EXCHANGE,
		id, 
		value
	};
};

export const deleteExchange = (id: string): any => {
	return {
		type: AllTypeActions.DELETE_EXCHANGE,
		id
	};
};
