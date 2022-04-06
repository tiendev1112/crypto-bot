import { SnackbarOrigin } from "@material-ui/core";
import { AnyAction } from "redux";

export interface IAppRequestState {
  isFetching: boolean;
  data: any;
  error: string;
  // total?: number;
}

export const initialRequestState: IAppRequestState = {
  isFetching: false,
  data: null,
  error: "",
  // total: 1,
};

export interface SigninInput {
  username: string;
  password: string;
}

export type AlertSeverity =
  | "success"
  | "info"
  | "warning"
  | "error"
  | undefined;

export interface IApplicationState {
  signin: IAppRequestState;
  permission: { allPermissions: any };
  systemMessage: {
    message: string;
    isOpen: boolean;
    severity: AlertSeverity;
    anchorOrigin: SnackbarOrigin | undefined;
  };
  systemLoading: { isLoading: boolean };
  getRates: IAppRequestState;
  postRate: IAppRequestState;
  deleteRate: IAppRequestState;
  updateRate: IAppRequestState;
  getGroupMasters: IAppRequestState;
  postGroupMaster: IAppRequestState;
  updateGroupMaster: IAppRequestState;
  deleteGroupMaster: IAppRequestState;
  deleteGroupMasterMore: IAppRequestState;
  getTransactions: IAppRequestState;
  getTransactionMasters: IAppRequestState;
  getExchanges: IAppRequestState;
  postExchange: IAppRequestState;
  updateExchange: IAppRequestState;
  deleteExchange: IAppRequestState;
  currentUser: IAppRequestState;
  getMasters: IAppRequestState;
  getUsers: IAppRequestState;
  postUser: IAppRequestState;
  updateUser: IAppRequestState;
  deleteUser: IAppRequestState;
  getFollowers: IAppRequestState;
  postMaster: IAppRequestState;
  getMaster: IAppRequestState;
  updateMaster: IAppRequestState;
  deleteMaster: IAppRequestState;
  deleteMasterMore: IAppRequestState;
  postSticky: IAppRequestState;
  postFollower: IAppRequestState;
  getFollower: IAppRequestState;
  updateFollower: IAppRequestState;
  deleteFollower: IAppRequestState;
  deleteFollowerMore: IAppRequestState;
  renewalFollower: IAppRequestState;
  changePassword: IAppRequestState;
  changeActiveUser: IAppRequestState;
  changeActiveMaster: IAppRequestState;
  changeActiveFollower: IAppRequestState;
  changeGroupLimit: IAppRequestState;
}

export const GlobalReducer = (
  state: IAppRequestState,
  action: AnyAction,
  actionType: string
): IAppRequestState => {
  switch (action.type) {
    case `${actionType}_ATTEMPT`: {
      return {
        ...state,
        isFetching: true,
        error: "",
        data: null,
      };
    }
    case `${actionType}_SUCCESS`: {
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: "",
        // total: action.total ? action.total : state.total,
      };
    }
    case `${actionType}_FAIL`: {
      return {
        ...state,
        error: action.error,
        isFetching: false,
        data: null,
      };
    }
    default:
      return state;
  }
};
