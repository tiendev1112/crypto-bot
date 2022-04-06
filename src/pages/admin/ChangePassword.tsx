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
import { changePassword, IApplicationState } from "../../store";

interface IProps {
  data: any;
}

export const ChangePassword = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.changePassword
  );
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const initialValues = {
    password: "",
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const onSubmit = async (values: any) => {
    const valuePush = { ...values };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(changePassword(data?.id, valueFrom));
  };
  return (
    <div className="form-create">
      <h4>Change password for {data?.username}</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ touched, errors }) => (
          <Form>
            <Box className="content">
              <InputField
                name="password"
                label="Password (*)"
              />
              {errors?.password && touched.password && (
                <p className="error">{errors?.password}</p>
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
