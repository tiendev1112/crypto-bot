import { Box, createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, ShowText, SwitchButton } from "../../components";
import { formatSqlDate } from "../../helpers";
import { getMaster, IApplicationState } from "../../store";

interface IProps {
  id: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    detailMaster: {
      "& .show-text": {
        "& span": {
          border: "1px solid #e1e1e1",
          height: 35,
          lineHeight: "35px",
          paddingLeft: 10,
          borderRadius: 4,
        },
      },
    },
  })
);
export const DetailUser = ({ id }: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isFetching, data } = useSelector(
    (state: IApplicationState) => state.getMaster
  );
  const { data: groupMastersList } = useSelector(
    (state: IApplicationState) => state.getGroupMasters
  );
  const { data: exchangeList } = useSelector(
    (state: IApplicationState) => state.getExchanges
  );
  useEffect(() => {
    dispatch(getMaster(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="form-create">
      <h4>Detail MASTER</h4>
      {isFetching || !data ? (
        <Loading inner />
      ) : (
        <form className={classes.detailMaster}>
          <Box className="content" style={{ marginTop: 10 }}>
            <ShowText label="Id" content={data?.id} />
            <ShowText label="Username" content={data?.username} />
            <ShowText label="Email" content={data?.email} />
            <ShowText label="Full name" content={data?.fullName} />
            <ShowText label="Type" content={data?.type} />
            <ShowText
              label="Domain allow"
              content={exchangeList?.items
                ?.filter((exchange: any) => exchange.id === data?.exchange)
                .map((item: any) => item.name)
                .join("; ")}
            />
            <ShowText label="Admin name" content={data?.admin?.username} />
            <ShowText
              label="Group master name"
              content={
                data?.masterGroup
                  ? groupMastersList.items
                      ?.filter((item: any) => item?.id === data?.masterGroup)
                      .map((group: any) => group?.name)
                  : ""
              }
            />
            <SwitchButton
              checked={data?.active}
              name="active"
              label="Active"
              disabled
            />
            <SwitchButton
              checked={data?.hideTransaction}
              name="hiddenTransaction"
              label="Hidden Transaction"
              disabled
            />
            <ShowText
              label="Created At"
              content={formatSqlDate(data?.createdAt)}
            />
            <ShowText
              label="Updated At"
              content={formatSqlDate(data?.updatedAt)}
            />
          </Box>
        </form>
      )}
    </div>
  );
};
