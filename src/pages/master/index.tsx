import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ButtonAction,
  ConfirmModal,
  EmptyData,
  FormModal,
  IconDetail,
  InputSearch,
  Loading,
  Pagination,
  SwitchButton,
} from "../../components";
import { AddMaster } from "./AddMaster";
import { ChangeGroup } from "./ChangeGroup";
import { DetailUser } from "./DetailUser";
import { UpdateUsername } from "./UpdateUsername";
import { useDispatch, useSelector } from "react-redux";
import {
  AllTypeActions,
  getExchanges,
  getGroupMasters,
  IApplicationState,
  resetData,
  getMasters,
  deleteMaster,
  updateMaster,
  changeActiveMaster,
  deleteMasterMore,
} from "../../store";
import { ChangeFullname } from "./ChangeFullname";
import { USER_TYPE } from "../../constants";

type ObjecType = { [key: string]: any };

const Master = () => {
  const dispatch = useDispatch();
  const {
    getMasters: masterLists,
    getGroupMasters: masterGroup,
    deleteMaster: resultDelete,
    deleteMasterMore: resultDeleteMore,
    updateMaster: resultUpdate,
    changeActiveMaster: resultActive,
    currentUser: { data: dataUser },
  } = useSelector((state: IApplicationState) => state);
  const [stateActive, setStateActive] = useState<ObjecType>({});
  const [stateHiddenTrans, setStateHiddenTrans] = useState<ObjecType>({});
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [selectAllDelete, setSelectAllDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState<ObjecType>({});
  const [showConfirmDeleteMore, setShowConfirmDeleteMore] =
    useState<boolean>(false);
  const [showDetail, setShowDetail] = useState({ state: false, id: "" });
  const [showChangeGroup, setShowChangeGroup] = useState({
    state: false,
    data: {},
  });
  const [showChangeFullname, setShowChangeFullname] = useState({
    state: false,
    data: {},
  });
  const [showUpdateUsername, setShowUpdateUsername] = useState({
    state: false,
    data: {},
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [textSearch, setTextSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [showConfirmActive, setShowConfirmActive] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [showConfirmHiddenTrans, setShowConfirmHiddenTrans] =
    useState<ObjecType>({
      state: false,
      data: {},
    });
  const handleChangePage = (_event: any, pageNext: number) => {
    setPage(pageNext);
  };
  const handleChangeRowInPage = (value: any) => {
    setLimit(value.target.value);
  };
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleSearch = (event: any) => {
    event.preventDefault();
    setTextSearch(event.target[0].value);
  };
  const handleActive = (event: ChangeEvent<HTMLInputElement>, data: any) => {
    setStateActive({
      ...stateActive,
      [event.target.name]: event.target.checked,
    });
    setShowConfirmActive({ data, state: true });
  };
  const handleCloseConfirmActive = () => {
    const id = showConfirmActive.data?.id;
    setShowConfirmActive((n) => ({ ...n, state: false }));
    setStateActive({ ...stateActive, [id]: !stateActive[id] });
  };
  const handleCloseConfirmHiddenTrans = () => {
    const id = showConfirmHiddenTrans.data?.id;
    setShowConfirmHiddenTrans((n) => ({ ...n, state: false }));
    setStateHiddenTrans({ ...stateHiddenTrans, [id]: !stateHiddenTrans[id] });
  };
  const handleSendActive = () => {
    setShowConfirmActive((n) => ({ ...n, state: false }));
    const { id, isActive } = showConfirmActive.data;
    dispatch(changeActiveMaster(id, { active: !isActive }));
  };
  const handleSendHiddenTrans = () => {
    setShowConfirmHiddenTrans((n) => ({ ...n, state: false }));
    const { id, hideTransaction } = showConfirmHiddenTrans.data;
    const valueUpdate = {
      hideTransaction: hideTransaction ? false : true,
    };
    dispatch(updateMaster(id, valueUpdate));
  };
  const handleHiddenTrans = (
    event: ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setStateHiddenTrans({
      ...stateHiddenTrans,
      [event.target.name]: event.target.checked,
    });
    setShowConfirmHiddenTrans({ data, state: true });
  };
  const handleDetailUser = (id: string) => {
    setShowDetail({ state: true, id });
  };
  const handleChangeGroup = (data: any) => {
    setShowChangeGroup({ state: true, data });
  };
  const handleChangeFullname = (data: any) => {
    setShowChangeFullname({ state: true, data });
  };
  const handleUpdateUsername = (data: any) => {
    setShowUpdateUsername({ state: true, data });
  };
  const handleDelete = (data: any) => {
    setShowConfirmDelete({ state: true, data });
  };
  const handleDeleteMaster = () => {
    dispatch(deleteMaster(showConfirmDelete.data?.id));
    setShowConfirmDelete({ ...showConfirmDelete, state: false });
  };
  const handleCreateSuccess = () => {
    setShowAdd(false);
    getMasterList();
    dispatch(resetData(AllTypeActions.POST_MASTER));
  };
  const handleUpdateSuccess = () => {
    setShowChangeGroup({ ...showChangeGroup, state: false });
    setShowChangeFullname({ ...showChangeFullname, state: false });
    setShowUpdateUsername({ ...showUpdateUsername, state: false });
    getMasterList();
    dispatch(resetData(AllTypeActions.UPDATE_MASTER));
    dispatch(resetData(AllTypeActions.CHANGE_ACTIVE_MASTER));
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
    dispatch(deleteMasterMore({ id: dataPush }));
    setShowConfirmDeleteMore(false);
  };
  useEffect(() => {
    if (resultUpdate.data || resultActive.data) {
      handleUpdateSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultUpdate.data, resultActive.data]);
  const getMasterList = useCallback(() => {
    dispatch(getMasters(page, limit, textSearch));
  }, [dispatch, page, limit, textSearch]);
  useEffect(() => {
    getMasterList();
  }, [dispatch, getMasterList]);
  useEffect(() => {
    dispatch(getGroupMasters(1, 99999));
    dispatch(getExchanges());
  }, [dispatch]);
  useEffect(() => {
    if (resultDelete.data?.success || resultDeleteMore.data?.success) {
      getMasterList();
      dispatch(resetData(AllTypeActions.DELETE_MASTER));
      dispatch(resetData(AllTypeActions.DELETE_MASTER_MORE));
    }
  }, [dispatch, getMasterList, resultDelete.data, resultDeleteMore.data]);
  useEffect(() => {
    if (masterLists.data?.items?.length > 0) {
      const activeTemp: { [key: string]: boolean } = {};
      const hiddenTransTemp: { [key: string]: boolean } = {};
      const selectTemp: { [key: string]: boolean } = {};
      masterLists.data.items.forEach((item: any) => {
        activeTemp[item.id] = item.isActive ? true : false;
        hiddenTransTemp[item.id] = item.hideTransaction;
        selectTemp[item.id] = false;
      });
      setStateActive(activeTemp);
      setStateHiddenTrans(hiddenTransTemp);
      setSelectDelete(selectTemp);
    }
  }, [masterLists.data]);
  if (masterLists.isFetching || !masterLists.data) {
    return <Loading />;
  }
  return (
    <div className="body__box">
      <h2 className="title">USER MANAGEMENT</h2>
      <div className="list-btn">
        <ButtonAction title="Add Master" onClick={() => handleAdd()} />
        {checkShowBtnDelete() && (
          <ButtonAction
            title="Delete Master"
            color="secondary"
            onClick={() => handleDeleteFollowerMore()}
          />
        )}
      </div>
      <div className="form-search">
        <form
          onSubmit={handleSearch}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <InputSearch
            label="Username"
            name="username"
            defaultValue={textSearch}
          />
          <ButtonAction
            title="Search"
            type="submit"
            style={{ marginLeft: 20, padding: "5px 25px" }}
          />
        </form>
      </div>
      {masterLists.data?.items?.length > 0 ? (
        <Fragment>
          <div className="form-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={10}>
                    {!isAccountSupport() && (
                      <Checkbox
                        checked={selectAllDelete}
                        color="primary"
                        onClick={() => handleSelectDeleteAll()}
                      />
                    )}
                  </TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Group Master name</TableCell>
                  <TableCell align="right">Admin name</TableCell>
                  <TableCell align="right">Active</TableCell>
                  <TableCell align="right">Hidden Trans</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {masterLists.data?.items?.map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: 0,
                        }}
                      >
                        {!isAccountSupport() && (
                          <Checkbox
                            checked={selectDelete[row.id] || false}
                            color="primary"
                            onClick={() => handleSelectDelete(row.id)}
                          />
                        )}
                        <IconDetail
                          children={
                            <ul>
                              <li onClick={() => handleDetailUser(row.id)}>
                                Detail
                              </li>
                              {!isAccountSupport() && (
                                <>
                                  <li onClick={() => handleChangeGroup(row)}>
                                    Change Group Master
                                  </li>
                                  <li onClick={() => handleChangeFullname(row)}>
                                    Change Name
                                  </li>
                                  <li onClick={() => handleUpdateUsername(row)}>
                                    Update Username And Email
                                  </li>
                                  <li onClick={() => handleDelete(row)}>
                                    Delete
                                  </li>
                                </>
                              )}
                            </ul>
                          }
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">
                      {row.masterGroup
                        ? masterGroup.data?.items
                            .filter(
                              (group: any) => group.id === row.masterGroup
                            )
                            .map((item: any) => item.name)
                        : ""}
                    </TableCell>
                    <TableCell align="right">{row?.admin?.username}</TableCell>
                    <TableCell align="right">
                      <SwitchButton
                        checked={stateActive?.[row.id] || false}
                        handleAction={(event) => handleActive(event, row)}
                        name={row.id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <SwitchButton
                        checked={stateHiddenTrans?.[row.id] || false}
                        handleAction={(event) => handleHiddenTrans(event, row)}
                        name={row.id}
                      />
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
              total={masterLists.data?.total_items}
            />
          </div>
        </Fragment>
      ) : (
        <EmptyData />
      )}
      <FormModal
        open={showAdd}
        handleClose={() => setShowAdd(false)}
        style={{ width: "50vw" }}
        children={<AddMaster hanldeSuccess={() => handleCreateSuccess()} />}
      />
      <FormModal
        open={showDetail.state}
        handleClose={() => setShowDetail({ ...showDetail, state: false })}
        style={{ width: "50vw" }}
        children={<DetailUser id={showDetail.id} />}
      />
      <FormModal
        open={showChangeGroup.state}
        handleClose={() =>
          setShowChangeGroup({ ...showChangeGroup, state: false })
        }
        style={{ width: "50vw" }}
        children={<ChangeGroup data={showChangeGroup.data} />}
      />
      <FormModal
        open={showChangeFullname.state}
        handleClose={() =>
          setShowChangeFullname({ ...showChangeFullname, state: false })
        }
        style={{ width: "50vw" }}
        children={<ChangeFullname data={showChangeFullname.data} />}
      />
      <FormModal
        open={showUpdateUsername.state}
        handleClose={() =>
          setShowUpdateUsername({ ...showUpdateUsername, state: false })
        }
        style={{ width: "50vw" }}
        children={<UpdateUsername data={showUpdateUsername.data} />}
      />
      <ConfirmModal
        open={showConfirmDelete.state}
        onDismiss={() =>
          setShowConfirmDelete({ ...showConfirmDelete, state: false })
        }
        onValidate={() => handleDeleteMaster()}
        title={
          <p>
            Are you sure to delete master{" "}
            <b>{showConfirmDelete.data?.username}</b>?
          </p>
        }
      />
      <ConfirmModal
        open={showConfirmActive.state}
        onDismiss={handleCloseConfirmActive}
        onValidate={handleSendActive}
      />
      <ConfirmModal
        open={showConfirmHiddenTrans.state}
        onDismiss={handleCloseConfirmHiddenTrans}
        onValidate={handleSendHiddenTrans}
      />
      <ConfirmModal
        open={showConfirmDeleteMore}
        onDismiss={() => setShowConfirmDeleteMore(false)}
        onValidate={handleSendDeleteMore}
      />
      {(resultDelete.isFetching || resultDeleteMore.isFetching) && (
        <Loading wrapper />
      )}
    </div>
  );
};

export default Master;
