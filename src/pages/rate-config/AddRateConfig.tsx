import { Box, Checkbox, FormControlLabel, FormLabel } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  InputField,
  Loading,
} from "../../components";
import { IApplicationState, postRate, updateRate } from "../../store";

interface IProp {
  isUpdate: { [key: string]: any };
  hanldeSuccess: () => void;
}

export const AddRateConfig = ({ isUpdate, hanldeSuccess }: IProp) => {
  const dispatch = useDispatch();
  const [isConfirm, setIsConfirm] = useState(false);
  const [valueFrom, setValueFrom] = useState<any>();
  const createRate = useSelector((state: IApplicationState) => state.postRate);
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateRate
  );
  const [isChecked, setIsChecked] = useState(isUpdate?.isActive);
  const initialValues = {
    value: typeof isUpdate?.value === "number" ? isUpdate?.value : "",
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    if (isUpdate?.state) {
      dispatch(
        updateRate(
          valueFrom?.value,
          isUpdate?.id,
          isChecked ? "active" : "inactive"
        )
      );
    } else {
      dispatch(postRate(valueFrom?.value));
    }
  };
  const onSubmit = (values: any) => {
    setValueFrom(values);
    setIsConfirm(true);
  };
  useEffect(() => {
    if (createRate.data || resultUpdate.data) {
      hanldeSuccess();
    }
  }, [createRate.data, hanldeSuccess, resultUpdate]);
  return (
    <div className="form-create">
      <h4>{isUpdate?.state ? "Update" : "Create"} Rate Config</h4>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <Box className="content">
              <InputField
                name="value"
                label="Rate Number (*)"
                required
                type="number"
              />
              {isUpdate?.state && (
                <div className="check-box-active">
                  <FormLabel>Active</FormLabel>
                  <Box>
                    <FormControlLabel
                      value="active"
                      control={
                        <Checkbox
                          color="primary"
                          checked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                        />
                      }
                      label="Active"
                      labelPlacement="end"
                    />
                  </Box>
                </div>
              )}
            </Box>
            <Box className="button">
              {createRate.isFetching || resultUpdate.isFetching ? (
                <Loading inner />
              ) : (
                <ButtonAction
                  title={isUpdate?.state ? "Update" : "Create"}
                  type="submit"
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
