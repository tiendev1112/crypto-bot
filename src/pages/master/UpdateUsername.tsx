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
import { isEmailValid } from "../../helpers";
import { IApplicationState, updateMaster } from "../../store";

interface IProps {
  data: any;
}

export const UpdateUsername = ({ data }: IProps) => {
  const initialValues = {
    username: data?.username || "",
    email: data?.email || "",
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
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!isEmailValid(values.email)) {
      errors.email = "Not format email";
    }
    return errors;
  };
  const onSubmit = async (values: any) => {
    setValueFrom(values);
    setIsConfirm(true);
  };
  return (
    <div className="form-create">
      <h4>
        Update username and email for <u>{data?.username}</u>
      </h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ touched, errors }) => (
          <Form>
            <Box className="content">
              <InputField name="username" label="Username (*)" required />
              {errors?.username && touched.username && (
                <p className="error">{errors?.username}</p>
              )}
              <InputField name="email" label="Email (*)" />
              {errors?.email && touched.email && (
                <p className="error">{errors?.email}</p>
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
