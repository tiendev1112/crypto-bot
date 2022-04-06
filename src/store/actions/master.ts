import { AllTypeActions } from '../types';

export const getMasters = (page?: number, limit?: number, name?: string): any => {
	return {
		type: AllTypeActions.GET_MASTERS,
		page,
		limit,
		name
	};
};
export const getMaster = (id: string): any => {
	return {
		type: AllTypeActions.GET_MASTER,
		id,
	};
};

export const postMaster = (value: any): any => {
	return {
		type: AllTypeActions.POST_MASTER,
		value
	};
};

export const updateMaster = (id: string, value: any): any => {
	return {
		type: AllTypeActions.UPDATE_MASTER,
		value,
		id,
	};
};

export const changeActiveMaster = (id: string, value: any): any => {
	return {
		type: AllTypeActions.CHANGE_ACTIVE_MASTER,
		value,
		id,
	};
};

export const deleteMaster = (id: string): any => {
	return {
		type: AllTypeActions.DELETE_MASTER,
		id
	};
};

export const deleteMasterMore = (value: any): any => {
	return {
		type: AllTypeActions.DELETE_MASTER_MORE,
		value
	};
};