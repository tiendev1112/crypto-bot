import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  InputField,
  Loading
} from "../../components";
import { changeGroupLimit, IApplicationState } from "../../store";

interface IProps {
  data: any;
}

export const ChangeGroupLimit = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const resultChangeGroup = useSelector(
    (state: IApplicationState) => state.changeGroupLimit
  );
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const initialValues = {
    groupLimit: data?.groupLimit || '',
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.groupLimit || values.groupLimit === '0') {
      errors.groupLimit = "Group limit is required";
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
    dispatch(changeGroupLimit(data?.id, valueFrom));
  };
  return (
    <div className="form-create">
      <h4>Change group master limit for {data?.username}</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ touched, errors }) => (
          <Form>
            <Box className="content">
              <InputField
                name="groupLimit"
                label="Group limit (*)"
              />
              {errors?.groupLimit && touched.groupLimit && (
                <p className="error">{errors?.groupLimit}</p>
              )}
            </Box>
            <Box className="button">
              {resultChangeGroup.isFetching ? (
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
