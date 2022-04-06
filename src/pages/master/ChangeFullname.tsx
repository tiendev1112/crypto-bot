import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  InputField,
  Loading,
} from "../../components";
import { IApplicationState, updateMaster } from "../../store";

interface IProps {
  data: any;
}

export const ChangeFullname = ({ data }: IProps) => {
  const initialValues = {
    fullName: data?.fullName || "",
  };
  const dispatch = useDispatch();
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateMaster
  );
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(updateMaster(data.id, valueFrom));
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.fullName) {
      errors.fullName = "Fullname is required";
    }
    return errors;
  };
  const onSubmit = async (values: any) => {
    const valuePush = {
      fullName: values.fullName,
    };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  return (
    <div className="form-create">
      <h4>Change full name of {data?.username}</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validates={validates}
      >
        {({ touched, errors }) => (
          <Form>
            <Box className="content">
              <InputField name="fullName" label="Fullname (*)" />
              {errors?.fullName && touched.fullName && (
                <p className="error">{errors?.fullName}</p>
              )}
            </Box>
            <Box className="button">
              {resultUpdate.isFetching ? (
                <Loading inner />
              ) : (
                <ButtonAction title="Update" type="submit" />
              )}
            </Box>
          </Form>
        )}
      </Formik>
      <ConfirmModal
        open={isConfirm}
        onDismiss={() => setIsConfirm(false)}
        onValidate={handleSubmit}
      />
    </div>
  );
};
