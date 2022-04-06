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
import { IApplicationState, updateFollower } from "../../store";

interface IProps {
  data: any;
}

export const ChangeGroup = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const groupMasterLists = useSelector(
    (state: IApplicationState) => state.getGroupMasters
  );
  const resultUpdate = useSelector(
    (state: IApplicationState) => state.updateFollower
  );
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const optionGroupMaster =
    groupMasterLists.data?.items?.length > 0
      ? groupMasterLists.data?.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  const initialValues = {
    masterGroup:
      data.groupMaster?.length > 0
        ? data.groupMaster.map((group: any) => ({
            value: group.id,
            label: group.name,
          }))
        : [],
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
      groupMaster: values?.masterGroup.map((item: any) => item?.value),
    };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(updateFollower(data.id, valueFrom));
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
                isSelectAll
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
