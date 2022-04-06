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
import { IApplicationState, postExchange, updateExchange } from "../../store";

interface IProps {
  data: any;
}

export const AddExchange = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const [isConfirm, setIsConfirm] = useState(false);
  const [valueFrom, setValueFrom] = useState<any>();
  const createExchange = useSelector(
    (state: IApplicationState) => state.postExchange
  );
  const resultUpdateExchange = useSelector(
    (state: IApplicationState) => state.updateExchange
  );
  const initialValues = {
    name: data ? data?.name : "",
    domain: data ? data?.domain : "",
    description: data ? data?.description : "",
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    if (data) {
      dispatch(updateExchange(data?.id, { ...valueFrom, state: "active" }));
    } else {
      dispatch(postExchange({ ...valueFrom, state: "active" }));
    }
  };
  const onSubmit = (values: any) => {
    setValueFrom(values);
    setIsConfirm(true);
  };
  return (
    <div className="form-create">
      <h4>{data ? "Edit" : "Create"} Exchange</h4>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <Box className="content">
              <InputField name="name" label="Name (*)" required />
              <InputField name="domain" label="Domain (*)" required />
              <InputField name="description" label="Description" />
            </Box>
            <Box className="button">
              {createExchange.isFetching || resultUpdateExchange.isFetching ? (
                <Loading inner />
              ) : (
                <ButtonAction title={data ? "Save" : "Create"} type="submit" />
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
