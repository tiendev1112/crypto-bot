import { AllTypeActions } from "../types";

export const getFollowers = (
  page?: number,
  limit?: number,
  valueSearch?: any
): any => {
  return {
    type: AllTypeActions.GET_FOLLOWERS,
    page,
    limit,
    valueSearch,
  };
};

export const getFollower = (id: string): any => {
  return {
    type: AllTypeActions.GET_FOLLOWER,
    id,
  };
};

export const postFollower = (value: any): any => {
  return {
    type: AllTypeActions.POST_FOLLOWER,
    value,
  };
};

export const updateFollower = (id: string, value: any): any => {
  return {
    type: AllTypeActions.UPDATE_FOLLOWER,
    value,
    id,
  };
};

export const renewalFollower = (value: any, id: string): any => {
  return {
    type: AllTypeActions.RENEWAL_FOLLOWER,
    value,
    id
  };
};

export const deleteFollower = (id: string): any => {
	return {
		type: AllTypeActions.DELETE_FOLLOWER,
		id
	};
};

export const deleteFollowerMore = (value: any): any => {
	return {
		type: AllTypeActions.DELETE_FOLLOWER_MORE,
		value
	};
};

export const changeActiveFollower = (id: string, value: any): any => {
	return {
		type: AllTypeActions.CHANGE_ACTIVE_FOLLOWER,
		value,
		id,
	};
};