import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  InputCheckbox,
  InputField,
  Loading,
  ReactSelect,
} from "../../components";
import { USER_TYPE } from "../../constants";
import { isEmailValid } from "../../helpers";
import { IApplicationState, postFollower } from "../../store";

export const AddFollower = () => {
  const dispatch = useDispatch();

  const {
    getGroupMasters: groupMasterLists,
    getExchanges: listExchanges,
    postFollower: resultCreate,
    currentUser: {
      data: { type: role, exchange: exchangeParent },
    },
  } = useSelector((state: IApplicationState) => state);
  const initialValues = {
    prefixName: { value: "1", label: "Mr" },
    fullName: "",
    username: "",
    email: "",
    groupMaster: [],
    exchange:
    role !== USER_TYPE.superadmin
      ? { value: exchangeParent?.id, label: exchangeParent?.name }
      : "",
    noExpired: false,
  };
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const optionGroupMaster =
    groupMasterLists.data?.items?.length > 0
      ? groupMasterLists.data?.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  const optionExchange =
    listExchanges.data?.items?.length > 0
      ? listExchanges.data?.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  const onSubmit = async (values: any) => {
    const valueTemp = {
      ...values,
      exchange: values.exchange.value,
      groupMaster: values.groupMaster.map((item: any) => item?.value),
      prefixName: values.prefixName?.label
    };
    setValueFrom(valueTemp);
    setIsConfirm(true);
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!isEmailValid(values.email)) {
      errors.email = "Not format email";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (values.username.indexOf(" ") !== -1) {
      errors.username = "Username must not contain space";
    }
    if (values.groupMaster.length === 0) {
      errors.groupMaster = "Master group is required";
    }
    if (values.exchange.length === 0) {
      errors.exchange = "Domain is required";
    }
    if (!values.fullName) {
      errors.fullName = "Full name is required";
    }
    return errors;
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(postFollower(valueFrom));
  };
  return (
    <div className="form-create">
      <h4>Create FOLLOWER</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ handleBlur, setFieldValue, errors, touched }) => (
          <Form>
            <Box className="content">
              <ReactSelect
                options={[
                  { value: "Mr", label: "Mr" },
                  { value: "Ms", label: "Ms" },
                  { value: "Mrs", label: "Mrs" },
                ]}
                label="Appellation"
                name="prefixName"
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
              />
              <InputField name="fullName" label="Full name (*)" />
              {errors?.fullName && touched.fullName && (
                <p className="error">{errors?.fullName}</p>
              )}
              <InputField name="username" label="Username (*)" />
              {errors?.username && touched.username && (
                <p className="error">{errors?.username}</p>
              )}
              <InputField name="email" label="Email (*)" />
              {errors?.email && touched.email && (
                <p className="error">{errors?.email}</p>
              )}
              <ReactSelect
                options={optionGroupMaster}
                label="Group master (*)"
                name="groupMaster"
                isMulti
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                isSelectAll
              />
              {errors?.groupMaster && touched.groupMaster && (
                <p className="error">{errors?.groupMaster}</p>
              )}
              <ReactSelect
                options={optionExchange}
                label="Allow domain (*)"
                name="exchange"
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                disabled={role !== USER_TYPE.superadmin}
              />
              {errors?.exchange && touched.exchange && (
                <p className="error">{errors?.exchange}</p>
              )}
              <InputCheckbox
                name="noExpired"
                label="Account Marketing"
                setFieldValue={setFieldValue}
                defaultChecked={initialValues.noExpired}
              />
            </Box>
            <Box className="button">
              {resultCreate.isFetching ? (
                <Loading inner />
              ) : (
                <ButtonAction title="Create" type="submit" />
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
