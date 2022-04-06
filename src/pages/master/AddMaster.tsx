import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  InputField,
  ReactSelect,
  SwitchButton,
} from "../../components";
import { USER_TYPE } from "../../constants";
import { isEmailValid } from "../../helpers";
import { IApplicationState } from "../../store";
import { postMaster } from "../../store/actions/master";

interface IProp {
  hanldeSuccess: () => void;
}

export const AddMaster = ({ hanldeSuccess }: IProp) => {
  const dispatch = useDispatch();
  const [hideTransaction, setHideTransaction] = useState(false);
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const {
    getGroupMasters: groupMasterLists,
    getExchanges: listExchanges,
    postMaster: resultCreate,
    currentUser: {
      data: { type: role, exchange: exchangeParent },
    },
  } = useSelector((state: IApplicationState) => state);
  const initialValues = {
    username: "",
    fullName: "",
    masterGroup: "",
    exchange:
      role !== USER_TYPE.superadmin
        ? { value: exchangeParent?.id, label: exchangeParent?.name }
        : "",
    email: "",
  };
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
  const handleSubmit = () => {
    setIsConfirm(false);
    dispatch(postMaster(valueFrom));
  };
  const onSubmit = async (values: any) => {
    const valuePush = {
      username: values.username,
      fullName: values.fullName,
      email: values.email,
      masterGroup: values.masterGroup.value,
      exchange: values.exchange?.value || "",
      hideTransaction: hideTransaction,
    };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setHideTransaction(event.target.checked);
  };
  useEffect(() => {
    if (resultCreate.data) {
      hanldeSuccess();
    }
  }, [resultCreate.data, hanldeSuccess]);
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.fullName) {
      errors.fullName = "Full name is required";
    }
    if (values.masterGroup?.length === 0) {
      errors.masterGroup = "Group master is required";
    }
    if (values.exchange?.length === 0) {
      errors.exchange = "Allow domain is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!isEmailValid(values.email)) {
      errors.email = "Not format email";
    }
    return errors;
  };
  return (
    <div className="form-create">
      <h4>Create MASTER</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ handleBlur, setFieldValue, errors, touched }) => (
          <Form>
            <Box className="content">
              <InputField name="username" label="Username (*)" />
              {errors?.username && touched.username && (
                <p className="error">{errors?.username}</p>
              )}
              <InputField name="fullName" label="Full name (*)" />
              {errors?.fullName && touched.fullName && (
                <p className="error">{errors?.fullName}</p>
              )}
              <InputField name="email" label="Email (*)" />
              {errors?.email && touched.email && (
                <p className="error">{errors?.email}</p>
              )}
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
              <SwitchButton
                handleAction={handleSwitch}
                checked={hideTransaction}
                name="hiddenTransaction"
                label="Hidden Transactions"
              />
            </Box>
            <Box className="button">
              <ButtonAction title="Create" type="submit" />
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
