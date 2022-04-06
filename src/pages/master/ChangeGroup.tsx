import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  Loading,
  ReactSelect,
} from "../../components";
import { IApplicationState, updateMaster } from "../../store";

interface IProps {
  data: any;
}

export const ChangeGroup = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const groupMasterLists = useSelector(
    (state: IApplicationState) => state.getGroupMasters
  );
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateMaster
  );
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(updateMaster(data.id, valueFrom));
  };
  const optionGroupMaster =
    groupMasterLists.data?.items?.length > 0
      ? groupMasterLists.data?.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  const initialValues = {
    masterGroup: data.masterGroup
      ? optionGroupMaster.filter(
          (group: any) => group.value === data.masterGroup
        )
      : "",
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (values.masterGroup?.length === 0) {
      errors.masterGroup = "Group master is required";
    }
    return errors;
  };
  const onSubmit = async (values: any) => {
    const valuePush = {
      masterGroup: values.masterGroup.value,
    };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  return (
    <div className="form-create">
      <h4>Change group master for {data?.username}</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ handleBlur, setFieldValue, touched, errors }) => (
          <Form>
            <Box className="content">
              <ReactSelect
                options={optionGroupMaster}
                label="Group master (*)"
                name="masterGroup"
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
              />
              {errors?.masterGroup && touched.masterGroup && (
                <p className="error">{errors?.masterGroup}</p>
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
