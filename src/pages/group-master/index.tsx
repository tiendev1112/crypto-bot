import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  EmptyData,
  FormModal,
  IconDetail,
  InputSearch,
  Pagination,
} from "../../components";
import { Loading } from "../../components/Loading";
import { USER_TYPE } from "../../constants";
import {
  AllTypeActions,
  getRates,
  IApplicationState,
  resetData,
} from "../../store";
import {
  deleteGroupMaster,
  getGroupMasters,
  updateGroupMaster,
  deleteGroupMasterMore,
} from "../../store/actions/group-master";
import { AddGroup } from "./AddGroup";
import "./style.scss";

type ObjecType = { [key: string]: any };

const GroupMaster = () => {
  const {
    currentUser: { data: dataUser },
    getGroupMasters: groupLists,
    updateGroupMaster: resultUpdate,
    deleteGroupMaster: resultDelete,
    deleteGroupMasterMore: resultDeleteMore,
  } = useSelector((state: IApplicationState) => state);
  const dispatch = useDispatch();
  const [stateCheckPublic, setStateCheckPublic] = useState<ObjecType>({});
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showConfirmDeleteMore, setShowConfirmDeleteMore] =
    useState<boolean>(false);
  const [showConfirmPublic, setShowConfirmPublic] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [isUpdate, setIsUpdate] = useState({
    state: false,
    id: "",
    name: "",
    rates: [],
    public: false,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState({
    state: false,
    name: "",
    id: "",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectAllDelete, setSelectAllDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState<ObjecType>({});
  const [textSearch, setTextSearch] = useState("");
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleActionPublic = (
    event: ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setStateCheckPublic({
      ...stateCheckPublic,
      [event.target.name]: event.target.checked,
    });
    setShowConfirmPublic({ data, state: true });
  };
  const handleUpdate = (props: any) => {
    setShowAdd(true);
    setIsUpdate({
      state: true,
      ...props,
    });
  };
  const handleSearch = (event: any) => {
    event.preventDefault();
    setTextSearch(event.target[0].value);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
    setTimeout(() => {
      setIsUpdate((n) => ({
        state: false,
        id: "",
        name: "",
        rates: [],
        public: false,
      }));
    }, 500);
  };
  const handleCreateSuccess = () => {
    handleCloseAdd();
    getListGroupMasters();
    dispatch(resetData(AllTypeActions.POST_GROUP_MASTER));
    dispatch(resetData(AllTypeActions.UPDATE_GROUP_MASTER));
  };
  const handleDelete = (name: string, id: string) => {
    setShowConfirmDelete({ state: true, name, id });
  };
  const onDismissConfirm = () => {
    setShowConfirmDelete((n) => ({ ...n, state: false }));
  };
  const deleteGroup = () => {
    dispatch(deleteGroupMaster(showConfirmDelete.id));
    onDismissConfirm();
  };
  const handleCloseConfirmPublic = () => {
    const id = showConfirmPublic.data?.id;
    setShowConfirmPublic((n) => ({ ...n, state: false }));
    setStateCheckPublic({ ...stateCheckPublic, [id]: !stateCheckPublic[id] });
  };
  const handlePublic = () => {
    setShowConfirmPublic((n) => ({ ...n, state: false }));
    const { id, name, isActive, rates } = showConfirmPublic.data;
    const valueUpdate = {
      name,
      state: !isActive ? "active" : "inactive",
      rates: rates.map((rate: any) => rate.id),
    };
    dispatch(updateGroupMaster(id, valueUpdate));
  };
  const handleChangePage = (_event: any, pageNext: number) => {
    setPage(pageNext);
  };
  const handleChangeRowInPage = (value: any) => {
    setLimit(value.target.value);
  };
  const isAccountSupport = () => {
    const role = dataUser?.type || localStorage.getItem("role");
    return role === USER_TYPE.support;
  };
  const handleSelectDeleteAll = () => {
    setSelectAllDelete(!selectAllDelete);
    setSelectDelete((n) => {
      const tempState: any = {};
      Object.keys(n).forEach((check) => {
        tempState[check] = selectAllDelete ? false : true;
      });
      return tempState;
    });
  };
  const handleSelectDelete = (index: number) => {
    setSelectDelete((n) => {
      return { ...n, [index]: !selectDelete[index] };
    });
  };
  const checkShowBtnDelete = (): boolean => {
    const value = Object.entries(selectDelete).some((item) => item[1] === true);
    return value;
  };
  const handleDeleteFollowerMore = () => {
    setShowConfirmDeleteMore(true);
  };
  const handleSendDeleteMore = () => {
    const dataPush: string[] = [];
    Object.keys(selectDelete).forEach((key) => {
      if (selectDelete[key]) {
        dataPush.push(key);
      }
    });
    dispatch(deleteGroupMasterMore({ id: dataPush }));
    setShowConfirmDeleteMore(false);
  };
  useEffect(() => {
    dispatch(getRates(1, 99999));
  }, [dispatch]);
  const getListGroupMasters = useCallback(() => {
    dispatch(getGroupMasters(page, limit, textSearch));
  }, [dispatch, limit, page, textSearch]);
  useEffect(() => {
    getListGroupMasters();
  }, [dispatch, getListGroupMasters]);
  useEffect(() => {
    if (groupLists.data?.items?.length > 0) {
      const activeTemp: { [key: string]: boolean } = {};
      const selectTemp: { [key: string]: boolean } = {};
      groupLists.data.items.forEach((item: any) => {
        activeTemp[item.id] = item.isActive;
        selectTemp[item.id] = false;
      });
      setStateCheckPublic(activeTemp);
      setSelectDelete(selectTemp);
    }
  }, [groupLists.data]);
  useEffect(() => {
    if (
      resultUpdate.data ||
      resultDelete.data?.success ||
      resultDeleteMore.data?.success
    ) {
      getListGroupMasters();
      dispatch(resetData(AllTypeActions.UPDATE_GROUP_MASTER));
      dispatch(resetData(AllTypeActions.DELETE_GROUP_MASTER));
      dispatch(resetData(AllTypeActions.DELETE_GROUP_MASTER_MORE));
    }
  }, [
    dispatch,
    getListGroupMasters,
    resultUpdate.data,
    resultDelete.data,
    resultDeleteMore.data,
  ]);
  if (groupLists.isFetching || !groupLists.data) {
    return <Loading />;
  }
  return (
    <div className="body__box">
      <h2 className="title">USER MANAGEMENT</h2>
      <div className="list-btn">
        {!isAccountSupport() && (
          <>
            <ButtonAction
              title="Add Group Master"
              onClick={() => handleAdd()}
            />
            {checkShowBtnDelete() && (
              <ButtonAction
                title="Delete Group Master"
                color="secondary"
                onClick={() => handleDeleteFollowerMore()}
              />
            )}
          </>
        )}
      </div>
      <div className="form-search">
        <form
          onSubmit={handleSearch}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <InputSearch
            label="Group name"
            name="groupName"
            defaultValue={textSearch}
          />
          <ButtonAction
            title="Search"
            type="submit"
            style={{ marginLeft: 20, padding: "5px 25px" }}
          />
        </form>
      </div>
      {groupLists.data?.items?.length > 0 ? (
        <Fragment>
          <div className="form-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {!isAccountSupport() && (
                    <TableCell width={10}>
                      <Checkbox
                        checked={selectAllDelete}
                        color="primary"
                        onClick={() => handleSelectDeleteAll()}
                      />
                    </TableCell>
                  )}
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Public</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupLists.data?.items.map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    {!isAccountSupport() && (
                      <TableCell>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 0,
                          }}
                        >
                          <Checkbox
                            checked={selectDelete[row.id] || false}
                            color="primary"
                            onClick={() => handleSelectDelete(row.id)}
                          />
                          <IconDetail
                            children={
                              <ul>
                                <li
                                  onClick={() =>
                                    handleUpdate({
                                      id: row.id,
                                      name: row.name,
                                      rates: row.rates,
                                      public: row.isActive,
                                    })
                                  }
                                >
                                  Update Group
                                </li>
                                <li
                                  onClick={() => handleDelete(row.name, row.id)}
                                >
                                  Delete Group
                                </li>
                              </ul>
                            }
                          />
                        </Box>
                      </TableCell>
                    )}
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">
                      [ {row.rates?.map((rate: any) => rate?.name).join(", ")} ]
                    </TableCell>
                    <TableCell align="right">
                      <div className="switch-box">
                        <Switch
                          checked={stateCheckPublic?.[row.id] || false}
                          onChange={(event) => handleActionPublic(event, row)}
                          color="primary"
                          name={row.id}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="pagination_box">
            <Pagination
              limit={limit}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowInPage={handleChangeRowInPage}
              total={groupLists.data?.total_items}
            />
          </div>
        </Fragment>
      ) : (
        <EmptyData />
      )}
      <FormModal
        open={showAdd}
        handleClose={handleCloseAdd}
        style={{ width: "50vw" }}
        children={
          <AddGroup
            isUpdate={isUpdate}
            hanldeSuccess={() => handleCreateSuccess()}
          />
        }
      />
      <ConfirmModal
        open={showConfirmDelete.state}
        onDismiss={onDismissConfirm}
        onValidate={deleteGroup}
        title={
          <p>
            Are you sure to group master <b>{showConfirmDelete.name}</b>?
          </p>
        }
      />
      <ConfirmModal
        open={showConfirmPublic.state}
        onDismiss={handleCloseConfirmPublic}
        onValidate={handlePublic}
      />
      <ConfirmModal
        open={showConfirmDeleteMore}
        onDismiss={() => setShowConfirmDeleteMore(false)}
        onValidate={handleSendDeleteMore}
      />
      {(resultUpdate.isFetching ||
        resultDelete.isFetching ||
        resultDeleteMore.isFetching) && <Loading wrapper />}
    </div>
  );
};

export default GroupMaster;
