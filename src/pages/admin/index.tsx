import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
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
  Loading,
  Pagination,
  SwitchButton,
} from "../../components";
import { USER_TYPE } from "../../constants";
import { formatSqlDate } from "../../helpers";
import {
  AllTypeActions,
  changeActiveUser,
  deleteUser,
  getGroupMasters,
  getUsers,
  IApplicationState,
  resetData,
} from "../../store";
import { AddAdmin } from "./AddAdmin";
import { ChangeGroupLimit } from "./ChangeGroupLimit";
import { ChangePassword } from "./ChangePassword";
import { DetailUser } from "./DetailUser";

type ObjecType = { [key: string]: any };

const Admin = () => {
  const dispatch = useDispatch();
  const {
    getUsers: listUsers,
    postUser: resultCreate,
    updateUser: resultUpdate,
    deleteUser: resultDelete,
    changePassword: resultChangePW,
    changeActiveUser: resultActive,
    currentUser: { data: dataUser },
    changeGroupLimit: resultChangeGroup,
  } = useSelector((state: IApplicationState) => state);
  const role = dataUser?.type || localStorage.getItem("role");
  const [stateActive, setStateActive] = useState<ObjecType>({});
  const [showConfirmActive, setShowConfirmActive] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [showChangeGroupLimit, setShowChangeGroupLimit] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [showDetailUser, setShowDetailUser] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [textSearch, setTextSearch] = useState("");
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
  const handleSendActive = () => {
    setShowConfirmActive((n) => ({ ...n, state: false }));
    dispatch(
      changeActiveUser(showConfirmActive.data.id, {
        active: !showConfirmActive.data.isActive,
      })
    );
  };
  const handleChangePassword = (data: any) => {
    setShowChangePassword({ state: true, data });
  };
  const handleChangeGroupLimit = (data: any) => {
    setShowChangeGroupLimit({ state: true, data });
  };
  const handleDelete = (data: any) => {
    setShowConfirmDelete({ state: true, data });
  };
  const handleDeleteUser = () => {
    dispatch(
      deleteUser(showConfirmDelete.data?.id, showConfirmDelete.data?.type)
    );
    setShowConfirmDelete({ ...showConfirmDelete, state: false });
  };
  const handleChangePage = (_event: any, pageNext: number) => {
    setPage(pageNext);
  };
  const handleChangeRowInPage = (value: any) => {
    setLimit(value.target.value);
  };
  const handleDetailUser = (data: any) => {
    setShowDetailUser({ state: true, data });
  };
  useEffect(() => {
    dispatch(getGroupMasters(1, 99999));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getListUsers = useCallback(() => {
    dispatch(getUsers(page, limit, textSearch, ["sub-admin", "support"]));
  }, [dispatch, limit, page, textSearch]);
  useEffect(() => {
    getListUsers();
  }, [getListUsers]);
  const handleUpdateSuccess = () => {
    getListUsers();
    setShowAdd(false);
    setShowChangePassword({ ...showChangePassword, state: false });
    setShowChangeGroupLimit({ ...showChangeGroupLimit, state: false });
    dispatch(resetData(AllTypeActions.POST_USER));
    dispatch(resetData(AllTypeActions.UPDATE_USER));
    dispatch(resetData(AllTypeActions.DELETE_USER));
    dispatch(resetData(AllTypeActions.CHANGE_PASSWORD));
    dispatch(resetData(AllTypeActions.CHANGE_ACTIVE_USER));
    dispatch(resetData(AllTypeActions.CHANGE_GROUP_LIMIT));
  };
  useEffect(() => {
    if (
      resultCreate.data ||
      resultUpdate.data ||
      resultDelete.data ||
      resultChangePW.data ||
      resultActive.data ||
      resultChangeGroup.data
    ) {
      handleUpdateSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resultCreate.data,
    resultUpdate.data,
    resultDelete.data,
    resultChangePW.data,
    resultActive.data,
    resultChangeGroup.data,
  ]);
  useEffect(() => {
    if (listUsers.data?.items?.length > 0) {
      const activeTemp: { [key: string]: boolean } = {};
      listUsers.data.items.forEach((item: any) => {
        activeTemp[item.id] = item.state === "active" ? true : false;
      });
      setStateActive(activeTemp);
    }
  }, [listUsers.data]);
  if (listUsers.isFetching || !listUsers.data) {
    return <Loading />;
  }
  return (
    <div className="body__box">
      <h2 className="title">USER MANAGEMENT</h2>
      <div className="list-btn">
        <ButtonAction title="Add Admin" onClick={() => handleAdd()} />
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
      {listUsers.data?.items?.length > 0 ? (
        <Fragment>
          <div className="form-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={10}></TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Active</TableCell>
                  <TableCell align="right">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUsers.data?.items.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <IconDetail
                        children={
                          <ul>
                            <li onClick={() => handleDetailUser(row)}>
                              Detail
                            </li>
                            {row.groupLimit &&
                              role === USER_TYPE.superadmin && (
                                <li onClick={() => handleChangeGroupLimit(row)}>
                                  Change Group Limit
                                </li>
                              )}
                            <li onClick={() => handleChangePassword(row)}>
                              Change Password
                            </li>
                            <li onClick={() => handleDelete(row)}>Delete</li>
                          </ul>
                        }
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">
                      <SwitchButton
                        checked={stateActive?.[row.id] || false}
                        handleAction={(event) => handleActive(event, row)}
                        name={row.id}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {formatSqlDate(row.createdAt)}
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
              total={listUsers.data?.total_items}
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
        children={<AddAdmin />}
      />
      <FormModal
        open={showChangePassword.state}
        handleClose={() =>
          setShowChangePassword({ ...showChangePassword, state: false })
        }
        style={{ width: "50vw" }}
        children={<ChangePassword data={showChangePassword.data} />}
      />
      <FormModal
        open={showChangeGroupLimit.state}
        handleClose={() =>
          setShowChangeGroupLimit({ ...showChangeGroupLimit, state: false })
        }
        style={{ width: "50vw" }}
        children={<ChangeGroupLimit data={showChangeGroupLimit.data} />}
      />
      <FormModal
        open={showDetailUser.state}
        handleClose={() =>
          setShowDetailUser({ ...showDetailUser, state: false })
        }
        style={{ width: "50vw" }}
        children={<DetailUser data={showDetailUser.data} />}
      />
      <ConfirmModal
        open={showConfirmDelete.state}
        onDismiss={() =>
          setShowConfirmDelete({ ...showConfirmDelete, state: false })
        }
        onValidate={() => handleDeleteUser()}
        title={
          <p>
            Are you sure to delete <b>{showConfirmDelete.data?.username}</b>?
          </p>
        }
      />
      <ConfirmModal
        open={showConfirmActive.state}
        onDismiss={handleCloseConfirmActive}
        onValidate={handleSendActive}
      />
    </div>
  );
};

export default Admin;
