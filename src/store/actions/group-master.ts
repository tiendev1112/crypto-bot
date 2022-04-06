import { AllTypeActions } from '../types';

export const getGroupMasters = (page?: number, limit?: number, name?: string): any => {
	return {
		type: AllTypeActions.GET_GROUP_MASTERS,
		page,
		limit,
		name
	};
};

export const postGroupMaster = (value: any): any => {
	return {
		type: AllTypeActions.POST_GROUP_MASTER,
		value
	};
};

export const updateGroupMaster = (id: string, value: any): any => {
	return {
		type: AllTypeActions.UPDATE_GROUP_MASTER,
		value,
		id,
	};
};

export const deleteGroupMaster = (id: string): any => {
	return {
		type: AllTypeActions.DELETE_GROUP_MASTER,
		id
	};
};

export const deleteGroupMasterMore = (value: any): any => {
	return {
		type: AllTypeActions.DELETE_GROUP_MASTER_MORE,
		value
	};
};