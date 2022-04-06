import { AnyAction, Reducer } from 'redux';
import { AllTypeActions } from '../types';
import { GlobalReducer, IAppRequestState, initialRequestState } from './state';

export const GetMastersReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_MASTERS.toString());
};

export const GetMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_MASTER.toString());
};

export const PostMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_MASTER.toString());
};

export const UpdateMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.UPDATE_MASTER.toString());
};

export const ChangeActiveMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.CHANGE_ACTIVE_MASTER.toString());
};

export const DeleteMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_MASTER.toString());
};

export const DeleteMasterMoreReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_MASTER_MORE.toString());
};