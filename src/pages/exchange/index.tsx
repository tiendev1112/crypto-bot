import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
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
import { formatSqlDate } from "../../helpers";
import {
  AllTypeActions,
  deleteExchange,
  getExchanges,
  IApplicationState,
  resetData,
} from "../../store";
import { AddExchange } from "./AddExchange";

type ObjecType = { [key: string]: any };

const Exchange = () => {
  const dispatch = useDispatch();
  const exchangeLists = useSelector(
    (state: IApplicationState) => state.getExchanges
  );
  const resultDelete = useSelector(
    (state: IApplicationState) => state.deleteExchange
  );
  const resultCreate = useSelector(
    (state: IApplicationState) => state.postExchange
  );
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateExchange
  );
  const [showAdd, setShowAdd] = useState<ObjecType>({
    state: false,
    data: null,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<ObjecType>({
    state: false,
    data: {},
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const handleDelete = (data: any) => {
    setShowConfirmDelete({ state: true, data });
  };
  const handleEdit = (data: any) => {
    setShowAdd({ state: true, data });
  };
  const handleAdd = () => {
    setShowAdd({ state: true });
  };
  const handleCloseAdd = () => {
    setShowAdd({ state: false });
  };

  const handleCloseConfirm = () => {
    setShowConfirmDelete((n) => ({ ...n, state: false }));
  };
  const handleDeleteRate = () => {
    dispatch(deleteExchange(showConfirmDelete.data?.id));
    handleCloseConfirm();
  };
  const handleChangePage = (_event: any, pageNext: number) => {
    setPage(pageNext);
  };
  const handleChangeRowInPage = (value: any) => {
    setLimit(value.target.value);
  };
  const handleSuccess = () => {
    dispatch(getExchanges());
    setShowAdd({ state: false });
    setShowConfirmDelete((n) => ({ ...n, state: false }));
    dispatch(resetData(AllTypeActions.POST_EXCHANGE));
    dispatch(resetData(AllTypeActions.DELETE_EXCHANGE));
  };
  useEffect(() => {
    if (resultCreate.data || resultDelete?.data?.success || resultUpdate.data) {
      handleSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultCreate.data, resultDelete.data, resultUpdate.data]);
  useEffect(() => {
    dispatch(getExchanges());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (exchangeLists.isFetching || !exchangeLists.data) {
    return <Loading />;
  }

  return (
    <div className="body__box">
      <h2 className="title">EXCHANGE MANAGEMENT</h2>
      {exchangeLists.data?.items?.length === 0 ? (
        <div className="list-btn">
          <ButtonAction title="Add exchange" onClick={() => handleAdd()} />
        </div>
      ) : (
        ""
      )}
      {exchangeLists.data?.items?.length > 0 ? (
        <Fragment>
          <div className="form-search"></div>
          <div className="form-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={10}></TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Domain</TableCell>
                  <TableCell align="right">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exchangeLists.data?.items
                  .slice((page - 1) * limit, (page - 1) * limit + limit)
                  .map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <IconDetail
                          children={
                            <ul>
                              <li onClick={() => handleEdit(row)}>Edit</li>
                              <li onClick={() => handleDelete(row)}>Delete</li>
                            </ul>
                          }
                        />
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.domain}</TableCell>
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
              total={exchangeLists.data?.total_items}
            />
          </div>
        </Fragment>
      ) : (
        <EmptyData />
      )}
      <FormModal
        open={showAdd.state}
        handleClose={handleCloseAdd}
        style={{ width: "50vw" }}
        children={<AddExchange data={showAdd?.data} />}
      />
      <ConfirmModal
        open={showConfirmDelete.state}
        onDismiss={handleCloseConfirm}
        onValidate={handleDeleteRate}
        title={
          <p>
            Are you sure to delete <b>{showConfirmDelete.data?.name}</b>?
          </p>
        }
      />
    </div>
  );
};

export default Exchange;
