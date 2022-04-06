import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  Pagination,
} from "../../components";
import { Loading } from "../../components/Loading";
import {
  AllTypeActions,
  getRates,
  IApplicationState,
  resetData,
} from "../../store";
import { AddRateConfig } from "./AddRateConfig";
import { deleteRate, updateRate } from "../../store/actions/rate";

type ObjecType = { [key: string]: any };

const RateConfig = () => {
  const dispatch = useDispatch();
  const rateLists = useSelector((state: IApplicationState) => state.getRates);
  const resultDelete = useSelector(
    (state: IApplicationState) => state.deleteRate
  );
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateRate
  );
  const [stateCheck, setStateCheck] = useState<ObjecType>({});
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<ObjecType>({
    state: false,
    value: "",
    id: "",
    isActive: false,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<ObjecType>({
    state: false,
    name: "",
    id: "",
  });
  const [showConfirmActive, setShowConfirmActive] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const handleDelete = (name: string, id: string) => {
    setShowConfirmDelete({ state: true, name, id });
  };
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleUpdateConfig = (value: string, id: string, isActive: boolean) => {
    setShowAdd(true);
    setIsUpdate({ state: true, value, id, isActive });
  };
  const handleAction = (event: ChangeEvent<HTMLInputElement>, data: any) => {
    setStateCheck({ ...stateCheck, [event.target.name]: event.target.checked });
    setShowConfirmActive({ data, state: true });
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
    setTimeout(() => {
      setIsUpdate({ state: false, value: "", id: "", isActive: false });
    }, 500);
  };
  const handleCreateSuccess = () => {
    handleCloseAdd();
    getRatePagination();
    dispatch(resetData(AllTypeActions.POST_RATE));
    dispatch(resetData(AllTypeActions.UPDATE_RATE));
  };
  const handleCloseConfirm = () => {
    setShowConfirmDelete((n) => ({ ...n, state: false }));
  };
  const handleDeleteRate = () => {
    dispatch(deleteRate(showConfirmDelete.id));
    handleCloseConfirm();
  };
  const handleCloseConfirmActive = () => {
    const id = showConfirmActive.data?.id;
    setShowConfirmActive((n) => ({ ...n, state: false }));
    setStateCheck({ ...stateCheck, [id]: !stateCheck[id] });
  };
  const handleActive = () => {
    setShowConfirmActive((n) => ({ ...n, state: false }));
    const { id, value, isActive } = showConfirmActive.data;
    dispatch(updateRate(value, id, !isActive ? "active" : "inactive"));
  };
  const handleChangePage = (_event: any, pageNext: number) => {
    setPage(pageNext);
  };
  const handleChangeRowInPage = (value: any) => {
    setLimit(value.target.value);
  };
  const getRatePagination = useCallback(() => {
    dispatch(getRates(page, limit));
  }, [dispatch, page, limit]);
  useEffect(() => {
    if (rateLists.data?.items?.length > 0) {
      const activeTemp: ObjecType = {};
      rateLists.data.items.forEach((item: any) => {
        activeTemp[item.id] = item.isActive;
      });
      setStateCheck(activeTemp);
    }
  }, [rateLists.data]);
  useEffect(() => {
    getRatePagination();
  }, [getRatePagination]);
  useEffect(() => {
    if (resultDelete.data?.success) {
      getRatePagination();
      dispatch(resetData(AllTypeActions.DELETE_RATE));
    }
  }, [resultDelete.data, getRatePagination, dispatch]);
  useEffect(() => {
    if (resultUpdate.data) {
      getRatePagination();
      dispatch(resetData(AllTypeActions.UPDATE_RATE));
    }
  }, [dispatch, getRatePagination, resultUpdate.data]);
  if (rateLists.isFetching || !rateLists.data) {
    return <Loading />;
  }

  return (
    <div className="body__box">
      <h2 className="title">RATE CONFIGURATION</h2>
      <div className="list-btn">
        <ButtonAction title="Add Rate Config" onClick={() => handleAdd()} />
      </div>
      {rateLists.data?.items?.length > 0 ? (
        <Fragment>
          <div className="form-search"></div>
          <div className="form-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={10}></TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Rate Number</TableCell>
                  <TableCell align="right">Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rateLists.data?.items.map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <IconDetail
                        children={
                          <ul>
                            <li
                              onClick={() =>
                                handleUpdateConfig(
                                  row.value,
                                  row.id,
                                  row.isActive
                                )
                              }
                            >
                              Update Rate
                            </li>
                            <li
                              onClick={() =>
                                handleDelete(`${row.value}%`, row.id)
                              }
                            >
                              Delete
                            </li>
                          </ul>
                        }
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.value}%</TableCell>
                    <TableCell align="right">
                      <div className="switch-box">
                        <Switch
                          checked={stateCheck?.[row.id] || false}
                          onChange={(event) => handleAction(event, row)}
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
              total={rateLists.data?.total_items}
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
          <AddRateConfig
            isUpdate={isUpdate}
            hanldeSuccess={() => handleCreateSuccess()}
          />
        }
      />
      <ConfirmModal
        open={showConfirmDelete.state}
        onDismiss={handleCloseConfirm}
        onValidate={handleDeleteRate}
        title={
          <p>
            Are you sure to delete rate <b>{showConfirmDelete.name}</b>?
          </p>
        }
      />
      <ConfirmModal
        open={showConfirmActive.state}
        onDismiss={handleCloseConfirmActive}
        onValidate={handleActive}
      />
    </div>
  );
};

export default RateConfig;
