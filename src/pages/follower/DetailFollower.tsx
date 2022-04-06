import { Box, createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, ShowText, SwitchButton } from "../../components";
import { formatSqlDate } from "../../helpers";
import { getFollower, IApplicationState } from "../../store";

interface IProps {
  id: string;
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
export const DetailFollower = ({ id }: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isFetching, data } = useSelector(
    (state: IApplicationState) => state.getFollower
  );
  useEffect(() => {
    dispatch(getFollower(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="form-create">
      <h4>Detail FOLLOWER</h4>
      {isFetching || !data ? (
        <Loading inner />
      ) : (
        <form className={classes.detailMaster}>
          <Box className="content" style={{ marginTop: 10 }}>
            <ShowText label="Id" content={data?.id} />
            <ShowText label="Appellation" content={data?.prefixName} />
            <ShowText label="Full name" content={data?.fullName} />
            <ShowText label="Username" content={data?.username} />
            <ShowText label="Email" content={data?.email} />
            <ShowText label="Type" content={data?.type} />
            <ShowText label="Domain allow" content={data?.exchange?.name} />
            <ShowText label="Admin name" content={data?.parent?.username} />
            <ShowText
              label="Group master name"
              content={
                data?.groupMaster?.length > 0
                  ? data?.groupMaster.map((group: any) => group?.name).join("; ")
                  : ""
              }
            />
            <SwitchButton
              checked={data?.isActive}
              name="active"
              label="Active"
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
            <ShowText
              label="Expired At"
              content={formatSqlDate(data?.expiredAt)}
            />
            <ShowText
              label="Account Marketing"
              content={data?.noExpired ? "Yes" : "No"}
            />
          </Box>
        </form>
      )}
    </div>
  );
};
