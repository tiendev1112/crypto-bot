import { Box, createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, ShowText, SwitchButton } from "../../components";
import { USER_TYPE } from "../../constants";
import { formatSqlDate } from "../../helpers";
import { getExchanges, getGroupMasters, IApplicationState } from "../../store";

interface IProps {
  data: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    detailMaster: {
      "& .show-text": {
        "& span": {
          border: "1px solid #e1e1e1",
          minHeight: 35,
          lineHeight: "35px",
          paddingLeft: 10,
          borderRadius: 4,
        },
      },
    },
  })
);
export const DetailUser = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { getExchanges: exchangesData, getGroupMasters: groupMasterData } =
    useSelector((state: IApplicationState) => state);
  useEffect(() => {
    if (!exchangesData.data) {
      dispatch(getExchanges());
    }
    if (!groupMasterData.data) {
      dispatch(getGroupMasters(1, 99999));
    }
  }, [dispatch, exchangesData.data, groupMasterData.data]);
  const showExchangeName = (id: string): string => {
    if (exchangesData.data?.items?.length > 0) {
      const exchangeResult = exchangesData.data?.items?.find(
        (item: any) => item?.id === id
      );
      return exchangeResult?.name;
    }
    return id;
  };
  const showGroupMaster = (listId: [string]): any => {
    if (groupMasterData.data?.items?.length > 0) {
      const groupMasterResult = groupMasterData.data?.items?.filter(
        (item: any) => listId.includes(item?.id)
      );
      return groupMasterResult;
    }
    return listId;
  };
  return (
    <div className="form-create">
      <h4>Detail USER</h4>
      {exchangesData.isFetching || groupMasterData.isFetching ? (
        <Loading />
      ) : (
        <form className={classes.detailMaster}>
          <Box className="content" style={{ marginTop: 10 }}>
            <ShowText label="Id" content={data?.id} />
            <ShowText label="Username" content={data?.username} />
            <ShowText label="Type" content={data?.type} />
            <ShowText
              label="Domain allow"
              content={showExchangeName(data?.exchange)}
            />
            <ShowText label="Admin name" content={data?.parent?.username} />
            <ShowText
              label="Group master name"
              content={
                data?.groupMaster?.length > 0
                  ? showGroupMaster(data?.groupMaster)
                      .map((group: any) => group?.name)
                      .join("; ")
                  : ""
              }
            />
            <SwitchButton
              checked={data?.isActive}
              name="active"
              label="Active"
              disabled
            />
            {data?.type === USER_TYPE.subAdmin && (
              <ShowText label="Group limit" content={data?.groupLimit} />
            )}
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
