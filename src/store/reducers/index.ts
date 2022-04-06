import { combineReducers } from "redux";
import {
  AllPermissionsReducer,
  ChangeActiveUserReducer,
  ChangeGroupLimitReducer,
  ChangePasswordReducer,
  DeleteUserReducer,
  GetCurrentUserReducer,
  GetUsersReducer,
  PostLoginReducer,
  PostStickyReducer,
  PostUserReducer,
  SystemLoadingReducer,
  SystemMessageReducer,
  UpdateUserReducer,
} from "./admin";
import { DeleteExchangeReducer, GetExchangesReducer, PostExchangeReducer, UpdateExchangeReducer } from "./exchange";
import { ChangeActiveFollowerReducer, DeleteFollowerMoreReducer, DeleteFollowerReducer, GetFollowerReducer, GetFollowersReducer, PostFollowerReducer, RenewalFollowerReducer, UpdateFollowerReducer } from "./follower";
import {
  DeleteGroupMasterReducer,
  DeleteGroupMasterReducerMore,
  GetGroupMastersReducer,
  PostGroupMasterReducer,
  UpdateGroupMasterReducer,
} from "./group-master";
import {
  ChangeActiveMasterReducer,
  DeleteMasterMoreReducer,
  DeleteMasterReducer,
  GetMasterReducer,
  GetMastersReducer,
  PostMasterReducer,
  UpdateMasterReducer,
} from "./master";
import {
  DeleteRateReducer,
  GetRatesReducer,
  PostRateReducer,
  UpdateRateReducer,
} from "./rate";
import { IApplicationState } from "./state";
import { GetTransactionMastersReducer, GetTransactionsReducer } from "./transaction";

export const rootReducer = combineReducers<IApplicationState>({
  signin: PostLoginReducer,
  permission: AllPermissionsReducer,
  systemMessage: SystemMessageReducer,
  systemLoading: SystemLoadingReducer,
  getRates: GetRatesReducer,
  postRate: PostRateReducer,
  updateRate: UpdateRateReducer,
  deleteRate: DeleteRateReducer,
  getGroupMasters: GetGroupMastersReducer,
  postGroupMaster: PostGroupMasterReducer,
  updateGroupMaster: UpdateGroupMasterReducer,
  deleteGroupMaster: DeleteGroupMasterReducer,
  deleteGroupMasterMore: DeleteGroupMasterReducerMore,
  getTransactions: GetTransactionsReducer,
  getTransactionMasters: GetTransactionMastersReducer,
  getExchanges: GetExchangesReducer,
  postExchange: PostExchangeReducer,
  updateExchange: UpdateExchangeReducer,
  deleteExchange: DeleteExchangeReducer,
  currentUser: GetCurrentUserReducer,
  getMasters: GetMastersReducer,
  getUsers: GetUsersReducer,
  postUser: PostUserReducer,
  updateUser: UpdateUserReducer,
  deleteUser: DeleteUserReducer,
  getFollowers: GetFollowersReducer,
  postMaster: PostMasterReducer,
  getMaster: GetMasterReducer,
  updateMaster: UpdateMasterReducer,
  deleteMaster: DeleteMasterReducer,
  deleteMasterMore: DeleteMasterMoreReducer,
  postSticky: PostStickyReducer,
  postFollower: PostFollowerReducer,
  getFollower: GetFollowerReducer,
  updateFollower: UpdateFollowerReducer,
  deleteFollower: DeleteFollowerReducer,
  deleteFollowerMore: DeleteFollowerMoreReducer,
  renewalFollower: RenewalFollowerReducer,
  changePassword: ChangePasswordReducer,
  changeActiveUser: ChangeActiveUserReducer,
  changeActiveMaster: ChangeActiveMasterReducer,
  changeActiveFollower: ChangeActiveFollowerReducer,
  changeGroupLimit: ChangeGroupLimitReducer,
});
export const ApplicationState = (state: any, action: any) => {
  return rootReducer(state, action);
};

export * from "./state";
