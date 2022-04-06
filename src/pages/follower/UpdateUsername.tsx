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
import { IApplicationState, updateFollower } from "../../store";

interface IProps {
  data: any;
}

export const UpdateUsername = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateFollower
  );
  const initialValues = {
    email: data?.email,
    username: data?.username,
  };
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const onSubmit = async (values: any) => {
    const valuePush = {
      username: values?.username,
      email: values?.email,
    };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(updateFollower(data.id, valueFrom));
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    return errors;
  };
  return (
    <div className="form-create">
      <h4>Update username and email for {data?.username}</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ touched, errors }) => (
          <Form>
            <Box className="content">
              <InputField name="username" label="Username (*)" />
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
