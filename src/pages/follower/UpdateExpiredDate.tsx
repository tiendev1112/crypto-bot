import { Box } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  SelectDate,
  ShowText,
} from "../../components";
import { formatSqlDate } from "../../helpers";
import { renewalFollower } from "../../store";

interface IProps {
  data: any;
}

export const UpdateExpiredDate = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isConfirm, setIsConfirm] = useState(false);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    const now = moment(new Date()); //todays date
    const checkExpiredNow =
      moment.duration(now.diff(data?.expiredAt)).asSeconds() > 0; // if true expired, if false not expired
    const end = moment(selectedDate); // expired change date
    const dateDiff = checkExpiredNow ? now : moment.utc(data?.expiredAt);
    const durationSecond = Math.floor(
      moment.duration(end.diff(dateDiff)).asSeconds()
    );
    const dataPush = {
      timeAdded: durationSecond,
    };
    dispatch(renewalFollower(dataPush, data.id));
  };
  return (
    <div className="form-create">
      <h4>Update expired date for {data?.username}</h4>
      <Box className="form">
        <Box className="content expired-date">
          <ShowText
            label="Expired Date"
            content={formatSqlDate(data?.expiredAt)}
          />
          <SelectDate
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            label="Expired Day"
            format="dd/MM/yyyy"
            disablePast
          />
        </Box>
        <Box className="button">
          <ButtonAction title="Update" onClick={() => setIsConfirm(true)} />
        </Box>
      </Box>
      <ConfirmModal
        open={isConfirm}
        onDismiss={() => setIsConfirm(false)}
        onValidate={handleSubmit}
      />
    </div>
  );
};
