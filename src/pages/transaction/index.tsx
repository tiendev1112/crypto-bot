import {
  FormLabel,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { EmptyData, Loading, Pagination } from "../../components";
import { formatSqlDate } from "../../helpers";
import { getTransactionMasters, getTransactions, IApplicationState } from "../../store";

const optionsAll = [
  {
    value: "all",
    label: "All",
  },
];

const useStyles = makeStyles(() => ({
  selectUsername: {
    width: 250,
    marginTop: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    '& label': {
      fontSize: 14
    },
  },
}));

const Transaction = () => {
  const classes = useStyles();
  const transactionLists = useSelector(
    (state: IApplicationState) => state.getTransactions
  );
  const masterLists = useSelector(
    (state: IApplicationState) => state.getTransactionMasters
  );
  const dispatch = useDispatch();
  const [optionsSelectSearch, setOptionsSelectSearch] = useState<any[]>();
  const [valueGroupSearch, setValueGroupSearch] = useState(optionsAll[0]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const handleChangeSelectSearch = (option: any) => {
    setValueGroupSearch(option);
  };
  const handleChangePage = (_event: any, pageNext: number) => {
    setPage(pageNext);
  };
  const handleChangeRowInPage = (value: any) => {
    setLimit(value.target.value);
  };
  useEffect(() => {
    dispatch(getTransactionMasters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (valueGroupSearch?.value === optionsAll[0]?.value) {
      dispatch(getTransactions(page, limit, []));
    } else {
      dispatch(getTransactions(page, limit, [valueGroupSearch?.value]));
    }
  }, [dispatch, limit, page, valueGroupSearch]);
  useEffect(() => {
    if (masterLists.data?.length > 0) {
      const valueTemp = masterLists.data?.map((item: any) => ({
        value: item.id,
        label: item.username,
      }));
      setOptionsSelectSearch([...optionsAll, ...valueTemp]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterLists]);
  if (
    transactionLists.isFetching ||
    !transactionLists.data ||
    masterLists.isFetching ||
    !masterLists.data
  ) {
    return <Loading />;
  }
  return (
    <div className="body__box">
      <h2 className="title">TRANSACTION HISTORY</h2>
      <div className="form-search">
        <form className={classes.selectUsername}>
          <FormLabel>Master</FormLabel>
          <Select
            options={optionsSelectSearch}
            closeMenuOnSelect
            onChange={handleChangeSelectSearch}
            value={valueGroupSearch}
            isSearchable
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 2 }) }}
          />
        </form>
      </div>
      {transactionLists.data?.items?.length > 0 ? (
        <Fragment>
          <div className="form-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">BO</TableCell>
                  <TableCell align="right">Master</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">Create At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionLists.data.items.map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">
                      {row.command.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">{masterLists.data?.length > 0 ? masterLists.data?.find((item: any) => item?.id === row.masterId)?.username : row.masterId}</TableCell>
                    <TableCell align="right">{row.volume}</TableCell>
                    <TableCell align="right">
                      {formatSqlDate(row.updatedAt)}
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
              total={transactionLists.data?.total_items}
            />
          </div>
        </Fragment>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default Transaction;
