import { AnyAction, Reducer } from 'redux';
import { IAppRequestState, initialRequestState, GlobalReducer, AlertSeverity } from './state';
import { AllTypeActions } from '../types';
import { SnackbarOrigin } from '@material-ui/core';

export const PostLoginReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_LOGIN.toString());
};

export const AllPermissionsReducer: Reducer = (state: { allPermissions: any } = { allPermissions: null }, action: AnyAction) => {
	switch (action.type) {
		case 'LOAD_ALL_PERMISSION': {
			return {
				...state,
				allPermissions: action.data,
			};
		}
		default:
			return state;
	}
};

export const SystemMessageReducer: Reducer = (
	state: { message: string; isOpen: boolean; severity: AlertSeverity, anchorOrigin: SnackbarOrigin | undefined  } = { 
		message: '', isOpen: false, severity: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } },
	action: AnyAction,
) => {
	if (action.type.indexOf('_FAIL') !== -1) {
		return {
			...state,
			message: action.error,
			severity: 'error',
			isOpen: true,
		};
	}
	switch (action.type) {
		case AllTypeActions.SYSTEM_MESSAGE_SHOW: {
			return {
				...state,
				message: action.message,
				severity: action.severity ? action.severity : 'success',
				anchorOrigin: action.anchorOrigin || { vertical: 'top', horizontal: 'right' },
				isOpen: true,
			};
		}
		case AllTypeActions.SYSTEM_MESSAGE_HIDE: {
			return {
				...state,
				message: '',
				isOpen: false,
			};
		}
		default:
			return state;
	}
};

export const SystemLoadingReducer: Reducer = (
	state: { isLoading: boolean  } = { 
		isLoading: false  },
	action: AnyAction,
) => {
	if (action.type.indexOf('_FAIL') !== -1) {
		return {
			...state,
			isLoading: false,
		};
	}
	switch (action.type) {
		case AllTypeActions.SYSTEM_LOADING_SHOW: {
			return {
				...state,
				isLoading: true,
			};
		}
		case AllTypeActions.SYSTEM_LOADING_HIDE: {
			return {
				...state,
				isLoading: false,
			};
		}
		default:
			return state;
	}
};

export const GetCurrentUserReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_CURRENT_ADMIN.toString());
};

export const GetUsersReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_USERS.toString());
};

export const PostUserReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_USER.toString());
};

export const UpdateUserReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.UPDATE_USER.toString());
};

export const DeleteUserReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_USER.toString());
};

export const PostStickyReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_STICKY.toString());
};

export const ChangePasswordReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.CHANGE_PASSWORD.toString());
};

export const ChangeActiveUserReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.CHANGE_ACTIVE_USER.toString());
};

export const ChangeGroupLimitReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.CHANGE_GROUP_LIMIT.toString());
};
