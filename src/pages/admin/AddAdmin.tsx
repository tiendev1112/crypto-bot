import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonAction,
  ConfirmModal,
  ImageUpload,
  InputField,
  ReactSelect,
} from "../../components";
import { USER_TYPE } from "../../constants";
import { getExchanges, IApplicationState, postUser } from "../../store";

const dataRole = [
  {
    value: USER_TYPE.subAdmin,
    label: "Sub admin",
  },
  {
    value: USER_TYPE.support,
    label: "Support",
  },
];

export const AddAdmin = () => {
  const dispatch = useDispatch();
  const exchangesData = useSelector(
    (state: IApplicationState) => state.getExchanges
  );
  const {
    currentUser: { data: dataUser },
    getGroupMasters: groupMasterLists,
  } = useSelector((state: IApplicationState) => state);
  const role = dataUser?.type || localStorage.getItem("role");
  const initialValues = {
    username: "",
    password: "",
    exchange:
      role !== USER_TYPE.superadmin
        ? { value: dataUser?.exchange?.id, label: dataUser?.exchange?.name }
        : "",
    groupLimit: 10,
    type:
      role === USER_TYPE.subAdmin
        ? { value: USER_TYPE.support, label: "Support" }
        : "",
    groupMaster: [],
  };
  const [listExchanges, setListExchanges] = useState([]);
  const [valueFrom, setValueFrom] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectRoleSupport, setSelectRoleSupport] = useState(
    role === USER_TYPE.subAdmin
  );
  const optionGroupMaster =
    groupMasterLists.data?.items?.length > 0
      ? groupMasterLists.data?.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  const onSubmit = async (values: any) => {
    const valuePush = {
      ...values,
      exchange: values?.exchange?.value,
      groupMaster: values.groupMaster.map((item: any) => item?.value),
    };
    setValueFrom(valuePush);
    setIsConfirm(true);
  };
  const handleSubmit = () => {
    setIsConfirm(false);
    const { type, ...value } = valueFrom;
    dispatch(postUser(value, type.value));
  };
  useEffect(() => {
    dispatch(getExchanges());
  }, [dispatch]);
  useEffect(() => {
    if (exchangesData.data?.items?.length > 0) {
      const dataTemp = exchangesData.data.items.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setListExchanges(dataTemp);
    }
  }, [exchangesData.data]);
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password at least 8 characters";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.exchange) {
      errors.exchange = "Exchange is required";
    }
    if (!values.type) {
      errors.type = "Type is required";
    }
    if (!values.groupLimit && !selectRoleSupport) {
      errors.groupLimit = "Limit group is required";
    }
    if (values.groupMaster?.length === 0 && selectRoleSupport) {
      errors.groupMaster = "Group master is required";
    }
    if (values.type) {
      if (values.type?.value === USER_TYPE.support) {
        setSelectRoleSupport(true);
      } else {
        setSelectRoleSupport(false);
      }
    }
    return errors;
  };
  return (
    <div className="form-create">
      <h4>Create ADMIN</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validates}
      >
        {({ handleBlur, setFieldValue, errors, touched }) => (
          <Form>
            <Box className="content" style={{ marginTop: 10 }}>
              <InputField name="username" label="Username (*)" />
              {errors?.username && touched.username && (
                <p className="error">{errors?.username}</p>
              )}
              <InputField name="password" label="Password (*)" />
              {errors?.password && touched.password && (
                <p className="error">{errors?.password}</p>
              )}
              {!selectRoleSupport && (
                <InputField
                  name="groupLimit"
                  label="Limit group master (*)"
                  type="number"
                />
              )}
              {errors?.groupLimit && touched.groupLimit && (
                <p className="error">{errors?.groupLimit}</p>
              )}
              <ReactSelect
                options={dataRole}
                label="Type (*)"
                name="type"
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                disabled={role === USER_TYPE.subAdmin}
              />
              {errors?.type && touched.type && (
                <p className="error">{errors?.type}</p>
              )}
              <ReactSelect
                options={listExchanges}
                label="Exchange (*)"
                name="exchange"
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                disabled={role !== USER_TYPE.superadmin}
              />
              {errors?.exchange && touched.exchange && (
                <p className="error">{errors?.exchange}</p>
              )}
              <ReactSelect
                options={optionGroupMaster}
                label={`Group master ${selectRoleSupport ? "(*)" : ""}`}
                name="groupMaster"
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                isMulti
              />
              {errors?.groupMaster && touched.groupMaster && (
                <p className="error">{errors?.groupMaster}</p>
              )}
            </Box>
            {!selectRoleSupport && (
              <Box style={{ display: "flex", gap: 10, marginTop: 15 }}>
                <ImageUpload
                  title="LOGO TEAM"
                  name="groupPhoto"
                  setFieldValue={setFieldValue}
                />
                <ImageUpload
                  title="LOGO EXCHANGE"
                  name="exchangePhoto"
                  setFieldValue={setFieldValue}
                />
                <ImageUpload
                  title="BACKGROUND"
                  name="backgroundPhoto"
                  setFieldValue={setFieldValue}
                />
              </Box>
            )}
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
