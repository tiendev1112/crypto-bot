import { AnyAction, Reducer } from 'redux';
import { AllTypeActions } from '../types';
import { GlobalReducer, IAppRequestState, initialRequestState } from './state';

export const GetGroupMastersReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_GROUP_MASTERS.toString());
};

export const PostGroupMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_GROUP_MASTER.toString());
};

export const UpdateGroupMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.UPDATE_GROUP_MASTER.toString());
};

export const DeleteGroupMasterReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_GROUP_MASTER.toString());
};

export const DeleteGroupMasterReducerMore: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_GROUP_MASTER_MORE.toString());
};