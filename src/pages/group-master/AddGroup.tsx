import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  InputCheckbox,
  InputField,
  Loading,
  ReactSelect,
} from "../../components";
import { ConfirmModal } from "../../components/Modal/ConfirmModal";
import {
  IApplicationState,
  postGroupMaster,
  updateGroupMaster,
} from "../../store";

interface IProp {
  isUpdate: any;
  hanldeSuccess: () => void;
}

type valueInput = {
  name: string;
  rates: { value: string; label: string }[];
  public: boolean;
};

export const AddGroup = ({ isUpdate, hanldeSuccess }: IProp) => {
  const rateLists = useSelector((state: IApplicationState) => state.getRates);
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateGroupMaster
  );
  const createGroup = useSelector(
    (state: IApplicationState) => state.postGroupMaster
  );
  const optionRates =
    rateLists.data?.items?.length > 0
      ? rateLists.data?.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const dispatch = useDispatch();

  const initialValues: valueInput = {
    name: isUpdate?.name || "",
    rates: isUpdate?.rates?.length > 0 ? isUpdate.rates.map((rate: any) => ({value: rate.id, label: rate.name})) : [],
    public: isUpdate?.state ? isUpdate?.public : true,
  };

  const handleSubmit = () => {
    setIsConfirm(false);
    if (isUpdate?.state) {
      dispatch(updateGroupMaster(isUpdate.id, valueFrom));
    } else {
      dispatch(postGroupMaster(valueFrom));
    }
  };
  const onSubmit = (values: valueInput) => {
    const valuePost = {
      name: values.name,
      state: values.public ? "active" : "inactive",
      rates: values.rates.map((item) => item.value),
    };
    setValueFrom(valuePost);
    setIsConfirm(true);
  };
  useEffect(() => {
    if (createGroup.data || resultUpdate.data) {
      hanldeSuccess();
    }
  }, [createGroup.data, hanldeSuccess, resultUpdate.data]);
  const validates = (values: valueInput) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (values.rates?.length === 0) {
      errors.rates = "Rate is required";
    }
    return errors;
  };
  return (
    <div className="form-create">
      <h4>{isUpdate?.state ? "Update" : "Create"} Group</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ errors, handleBlur, setFieldValue, touched }) => (
          <Form>
            <Box className="content">
              <InputField name="name" label="Name (*)" />
              {errors?.name && touched.name && (
                <p className="error">{errors?.name}</p>
              )}
              <ReactSelect
                options={optionRates}
                label="Rates (*)"
                name="rates"
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isSelectAll
              />
              {errors?.rates && touched.rates && (
                <p className="error">{errors?.rates}</p>
              )}
              <InputCheckbox
                name="public"
                label="Public"
                setFieldValue={setFieldValue}
                defaultChecked={initialValues.public}
              />
            </Box>
            <Box className="button">
              {createGroup.isFetching ? (
                <Loading inner />
              ) : (
                <ButtonAction
                  title={isUpdate?.state ? "Update" : "Create"}
                  type="submit"
                  disabled={createGroup.isFetching}
                />
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
