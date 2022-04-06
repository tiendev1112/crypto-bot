import {
  Box,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Form, Formik } from "formik";
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
  InputField,
  Loading,
  Pagination,
  SelectSearch,
  SwitchButton,
} from "../../components";
import { USER_TYPE } from "../../constants";
import { formatSqlDate } from "../../helpers";
import {
  AllTypeActions,
  changeActiveFollower,
  deleteFollower,
  deleteFollowerMore,
  getExchanges,
  getFollowers,
  getGroupMasters,
  IApplicationState,
  resetData,
} from "../../store";
import { AddFollower } from "./AddFollower";
import { ChangeGroup } from "./ChangeGroup";
import { DetailFollower } from "./DetailFollower";
import { UpdateExpiredDate } from "./UpdateExpiredDate";
import { UpdateUsername } from "./UpdateUsername";

const useStyles = makeStyles(() =>
  createStyles({
    searchBox: {
      "& >.MuiFormControl-root": {
        flexDirection: "column",
        alignItems: "flex-start",
        "& >label": {
          marginBottom: 8,
        },
        "& input": {
          fontSize: 14,
        },
      },
    },
  })
);

type ObjecType = { [key: string]: any };

const Follower = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    currentUser: { data: dataUser },
    getFollowers: followerLists,
    getGroupMasters: listGroupMaster,
    postFollower,
    updateFollower: resultUpdate,
    renewalFollower,
    deleteFollower: resultFollower,
    deleteFollowerMore: resultDeleteMore,
    changeActiveFollower: resultActive,
  } = useSelector((state: IApplicationState) => state);
  const [stateActive, setStateActive] = useState<ObjecType>({});
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState({ state: false, id: "" });
  const [showChangeGroup, setShowChangeGroup] = useState({
    state: false,
    data: {},
  });
  const [showUpdateExpiredDate, setShowUpdateExpiredDate] = useState({
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
  const [showConfirmDeleteMore, setShowConfirmDeleteMore] =
    useState<boolean>(false);
  const [valueGroupSearch, setValueGroupSearch] = useState("");
  const [selectAllDelete, setSelectAllDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState<ObjecType>({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [showConfirmActive, setShowConfirmActive] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [optionGroup, setOptionGroup] = useState([]);
  const [valueSearch, setValueSearch] = useState({
    username: "",
    expired: false,
    noExpired: false,
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
  const handleSearch = async (values: any) => {
    setValueSearch({ ...values });
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
  const handleSendActive = () => {
    setShowConfirmActive((n) => ({ ...n, state: false }));
    const { id, isActive } = showConfirmActive.data;
    dispatch(
      changeActiveFollower(id, {
        active: !isActive,
      })
    );
  };
  const handleDetailUser = (id: string) => {
    setShowDetail({ state: true, id });
  };
  const handleChangeGroup = (data: any) => {
    setShowChangeGroup({ state: true, data });
  };
  const handleUpdateExpiredDate = (data: any) => {
    setShowUpdateExpiredDate({ state: true, data });
  };
  const handleUpdateUsername = (data: any) => {
    setShowUpdateUsername({ state: true, data });
  };
  const handleDelete = (data: any) => {
    setShowConfirmDelete({ state: true, data });
  };
  const handleDeleteFollower = () => {
    dispatch(deleteFollower(showConfirmDelete.data?.id));
  };
  const handleChangeSelectSearch = (event: any) => {
    setValueGroupSearch(event.target.value);
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
    dispatch(deleteFollowerMore({ id: dataPush }));
  };
  const isAccountSupport = () => {
    const role = dataUser?.type || localStorage.getItem("role");
    return role === USER_TYPE.support;
  };
  const handleUpdateSuccess = () => {
    getFollowerList();
    setShowAdd(false);
    setShowChangeGroup({ ...showChangeGroup, state: false });
    setShowUpdateExpiredDate({ ...showUpdateExpiredDate, state: false });
    setShowConfirmDelete({ ...showConfirmDelete, state: false });
    setShowUpdateUsername({ ...showUpdateUsername, state: false });
    setShowConfirmDeleteMore(false);
    dispatch(resetData(AllTypeActions.POST_FOLLOWER));
    dispatch(resetData(AllTypeActions.UPDATE_FOLLOWER));
    dispatch(resetData(AllTypeActions.RENEWAL_FOLLOWER));
    dispatch(resetData(AllTypeActions.DELETE_FOLLOWER_MORE));
    dispatch(resetData(AllTypeActions.CHANGE_ACTIVE_FOLLOWER));
  };
  useEffect(() => {
    if (
      postFollower.data ||
      resultUpdate.data ||
      renewalFollower.data ||
      resultFollower.data ||
      resultDeleteMore.data ||
      resultActive.data
    ) {
      handleUpdateSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    postFollower.data,
    resultUpdate.data,
    renewalFollower.data,
    resultFollower.data,
    resultDeleteMore.data,
    resultActive.data,
  ]);
  const getFollowerList = useCallback(() => {
    dispatch(
      getFollowers(page, limit, {
        ...valueSearch,
        masterGroup: [valueGroupSearch],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, limit, valueSearch]);
  useEffect(() => {
    getFollowerList();
  }, [dispatch, getFollowerList]);
  useEffect(() => {
    if (followerLists.data?.items?.length > 0) {
      const activeTemp: { [key: string]: boolean } = {};
      const selectTemp: { [key: string]: boolean } = {};
      followerLists.data.items.forEach((item: any) => {
        activeTemp[item.id] = item.isActive ? true : false;
        selectTemp[item.id] = false;
      });
      setStateActive(activeTemp);
      setSelectDelete(selectTemp);
    }
  }, [followerLists.data]);
  useEffect(() => {
    dispatch(getGroupMasters(1, 99999));
    dispatch(getExchanges());
  }, [dispatch]);
  useEffect(() => {
    if (listGroupMaster.data) {
      const optionTemp = listGroupMaster.data.items?.map((group: any) => ({
        value: group.id,
        label: group.name,
      }));
      setOptionGroup(optionTemp);
    }
  }, [listGroupMaster.data]);
  if (followerLists.isFetching || !followerLists.data) {
    return <Loading />;
  }
  return (
    <div className="body__box">
      {resultDeleteMore.isFetching && <Loading wrapper />}
      <h2 className="title">USER MANAGEMENT</h2>
      <div className="list-btn">
        <ButtonAction title="Add Follower" onClick={() => handleAdd()} />
        {checkShowBtnDelete() && (
          <ButtonAction
            title="Delete follower"
            color="secondary"
            onClick={() => handleDeleteFollowerMore()}
          />
        )}
      </div>
      <div className="form-search">
        <Formik initialValues={valueSearch} onSubmit={handleSearch}>
          {({ setFieldValue }) => (
            <Form
              style={{ display: "flex", alignItems: "flex-end", gap: 20 }}
              className={classes.searchBox}
            >
              <InputField name="username" label="Username" />
              <SelectSearch
                handleChange={handleChangeSelectSearch}
                label="Group Master"
                value={valueGroupSearch}
                options={optionGroup}
              />
              <FormControlLabel
                value="expired"
                control={
                  <Checkbox
                    defaultChecked={valueSearch.expired}
                    color="primary"
                    onChange={(event) =>
                      setFieldValue("expired", event.target.checked)
                    }
                  />
                }
                label="Expired"
                labelPlacement="end"
                className="checkbox__wrapper"
                style={{ marginRight: 0 }}
              />
              <FormControlLabel
                value="noExpired"
                control={
                  <Checkbox
                    defaultChecked={valueSearch.noExpired}
                    color="primary"
                    onChange={(event) =>
                      setFieldValue("noExpired", event.target.checked)
                    }
                  />
                }
                label="Account marketing"
                labelPlacement="end"
                className="checkbox__wrapper"
              />
              <ButtonAction
                title="Search"
                type="submit"
                style={{ marginLeft: 20, padding: "5px 25px" }}
              />
            </Form>
          )}
        </Formik>
      </div>
      {followerLists.data?.items?.length > 0 ? (
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
                  <TableCell align="right">Active</TableCell>
                  <TableCell align="right">Group Master Name</TableCell>
                  <TableCell align="right">Admin Name</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Expired Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {followerLists.data.items?.map((row: any, index: number) => (
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
                                <li onClick={() => handleChangeGroup(row)}>
                                  Change Group Master
                                </li>
                              )}
                              {!isAccountSupport() && (
                                <li
                                  onClick={() => handleUpdateExpiredDate(row)}
                                >
                                  Update Expired Date
                                </li>
                              )}
                              <li onClick={() => handleUpdateUsername(row)}>
                                Update Username And Email
                              </li>
                              {!isAccountSupport() && (
                                <li onClick={() => handleDelete(row)}>
                                  Delete
                                </li>
                              )}
                            </ul>
                          }
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">
                      <SwitchButton
                        checked={stateActive?.[row.id] || false}
                        handleAction={(event) => handleActive(event, row)}
                        name={row.id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.groupMaster
                        ?.map((item: any) => item.name)
                        .join("; ")}
                    </TableCell>
                    <TableCell align="right">{row.parent?.username}</TableCell>
                    <TableCell align="right">
                      {formatSqlDate(row.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      {formatSqlDate(row.expiredAt)}
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
              total={followerLists.data?.total_items}
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
        children={<AddFollower />}
      />
      <FormModal
        open={showDetail.state}
        handleClose={() => setShowDetail({ ...showDetail, state: false })}
        style={{ width: "50vw" }}
        children={<DetailFollower id={showDetail.id} />}
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
        open={showUpdateExpiredDate.state}
        handleClose={() =>
          setShowUpdateExpiredDate({ ...showUpdateExpiredDate, state: false })
        }
        style={{ width: "50vw" }}
        children={<UpdateExpiredDate data={showUpdateExpiredDate.data} />}
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
        onValidate={() => handleDeleteFollower()}
        title={
          <p>
            Are you sure to delete follower{" "}
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
        open={showConfirmDeleteMore}
        onDismiss={() => setShowConfirmDeleteMore(false)}
        onValidate={handleSendDeleteMore}
      />
    </div>
  );
};

export default Follower;
