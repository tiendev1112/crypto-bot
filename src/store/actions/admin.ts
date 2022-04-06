import { AllTypeActions } from '../types';
import { SigninInput, AlertSeverity } from '../reducers';
import { SnackbarOrigin } from '@material-ui/core';

export const postLogin = (input: SigninInput): any => {
	return {
		type: AllTypeActions.POST_LOGIN,
		input,
	};
};

export const showMessage = (message: string, severity?: AlertSeverity, anchorOrigin?: SnackbarOrigin): any => {
	return {
		type: AllTypeActions.SYSTEM_MESSAGE_SHOW,
		message,
		severity,
		anchorOrigin
	};
};

export const hideMessage = (): any => {
	return {
		type: AllTypeActions.SYSTEM_MESSAGE_HIDE,
	};
};

export const showLoading = (): any => {
	return {
		type: AllTypeActions.SYSTEM_LOADING_SHOW,
	};
};

export const hideLoading = (): any => {
	return {
		type: AllTypeActions.SYSTEM_LOADING_HIDE,
	};
};

export const getCurrentAdmin = (): any => {
	return {
		type: AllTypeActions.GET_CURRENT_ADMIN,
	};
};

export const postSticky = (message: any): any => {
	return {
		type: AllTypeActions.POST_STICKY,
		message,
	};
};

export const getUsers = (page?: number, limit?: number, username?: string, typeAccount?: string[]): any => {
	return {
		type: AllTypeActions.GET_USERS,
		page,
		limit,
		username,
		typeAccount
	};
};

export const postUser = (value: any, typeAccount: string): any => {
	return {
		type: AllTypeActions.POST_USER,
		value,
		typeAccount
	};
};

export const updateUser = (id: string, value: any, typeAccount: string): any => {
	return {
		type: AllTypeActions.UPDATE_USER,
		value,
		id,
		typeAccount
	};
};

export const deleteUser = (id: string, typeAccount: string): any => {
	return {
		type: AllTypeActions.DELETE_USER,
		id,
		typeAccount
	};
};

export const changePassword = (id: string, value: any): any => {
	return {
		type: AllTypeActions.CHANGE_PASSWORD,
		id,
		value
	};
};

export const changeActiveUser = (id: string, value: any): any => {
	return {
		type: AllTypeActions.CHANGE_ACTIVE_USER,
		id,
		value
	};
};

export const changeGroupLimit = (id: string, value: any): any => {
	return {
		type: AllTypeActions.CHANGE_GROUP_LIMIT,
		id,
		value
	};
};
