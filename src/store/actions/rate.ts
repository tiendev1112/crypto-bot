import { AllTypeActions } from '../types';

export const getRates = (page?: number, limit?: number): any => {
	return {
		type: AllTypeActions.GET_RATES,
		page,
		limit
	};
};

export const postRate = (value: string): any => {
	return {
		type: AllTypeActions.POST_RATE,
		value
	};
};

export const updateRate = (value: string, id: string, state: string): any => {
	return {
		type: AllTypeActions.UPDATE_RATE,
		value,
		id,
		state
	};
};

export const deleteRate = (id: string): any => {
	return {
		type: AllTypeActions.DELETE_RATE,
		id
	};
};