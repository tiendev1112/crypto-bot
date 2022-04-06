import { Box, Button, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { ButtonAction, FormModal, InputField, Loading } from "../../components";
import { KEY_TOKEN_SIGNIN, USER_TYPE } from "../../constants";
import { getCurrentAdmin, IApplicationState, postSticky } from "../../store";
import Admin from "../admin";
import Exchange from "../exchange";
import Follower from "../follower";
import GroupMaster from "../group-master/index";
import Master from "../master";
import { NotFound } from "../not-found";
import RateConfig from "../rate-config";
import Transaction from "../transaction";
import PrivateRoute from "./PrivateRoute";
import { Sidebar } from "./Sidebar";
import "./style.scss";

export const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    currentUser: { data: dataUser },
    postSticky: resultPostSticky,
  } = useSelector((state: IApplicationState) => state);
  const [showNotices, setShowNotices] = useState(false);
  const initialValues = {
    message: dataUser?.message || "",
  };
  const handleSubmit = async (values: any) => {
    dispatch(postSticky(values));
  };
  const DashboardPage = () => {
    return (
      <Box style={{ paddingTop: 50, textAlign: "center" }}>
        <img src="/images/logo.png" alt="logo" style={{ height: 50 }} />
        <Typography style={{ fontSize: 20, marginTop: 30 }}>
          Dashboard
        </Typography>
      </Box>
    );
  };
  const handleShowNotices = () => {
    setShowNotices(true);
  };
  const validates = (values: any) => {
    const errors: any = {};
    if (!values.message) {
      errors.message = "Trường bắt buộc";
    } else if (values.message.length > 2000) {
      errors.message = "Vui lòng nhập ít hơn 2000 ký tự";
    }
    return errors;
  };
  useEffect(() => {
    if (!localStorage.getItem(KEY_TOKEN_SIGNIN)) {
      history.push("/signin");
    } else {
      dispatch(getCurrentAdmin());
    }
  }, [dispatch, history]);
  useEffect(() => {
    if (resultPostSticky?.data) {
      setShowNotices(false);
      dispatch(getCurrentAdmin());
    }
  }, [dispatch, resultPostSticky?.data]);
  const role = dataUser?.type || localStorage.getItem("role");
  return (
    <div className="main-container">
      <Box className="brand-top">
        <img src={"/images/logo.png"} alt="logo" />
        <Button
          className="btn-notices"
          color="primary"
          variant="outlined"
          onClick={handleShowNotices}
        >
          THÔNG BÁO
        </Button>
      </Box>
      <Sidebar />
      <div className="main-body">
        <div className="body__container">
          <Switch>
            <Route exact strict path="/" component={DashboardPage} />
            <Route exact path="/user/group-master" component={GroupMaster} />
            <Route exact path="/user/master" component={Master} />
            <Route exact path="/user/follower" component={Follower} />
            <PrivateRoute
              exact
              path="/user/admin"
              component={Admin}
              isAcceptRole={
                role === USER_TYPE.superadmin ||
                role === USER_TYPE.subAdmin
              }
            />
            <PrivateRoute
              exact
              path="/exchange/exchanges"
              component={Exchange}
              isAcceptRole={role === USER_TYPE.superadmin}
            />
            <PrivateRoute
              exact
              path="/transaction/transactions"
              component={Transaction}
              isAcceptRole={role === USER_TYPE.superadmin}
            />
            <PrivateRoute
              exact
              path="/rate/config"
              component={RateConfig}
              isAcceptRole={role === USER_TYPE.superadmin}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div className="app-footer">
          <div className="app-footer__inner">
            <p>© MK CopyTrade. All rights reserved.</p>
          </div>
        </div>
      </div>
      <FormModal
        open={showNotices}
        handleClose={() => setShowNotices(false)}
        style={{ width: "50vw" }}
        children={
          <div className="form-create">
            <h4>Thông báo</h4>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validates}
            >
              {({ touched, errors }) => (
                <Form>
                  <Box className="content lable-not-center">
                    <InputField
                      name="message"
                      type="textarea"
                      label="Nội dung thông báo"
                      required
                      placeholder="Hãy viết nội dung thông báo (ít hơn 2000 ký tự)"
                      minRows={4}
                      maxRows={8}
                    />
                    {errors?.message && touched.message && (
                      <p className="error">{errors?.message}</p>
                    )}
                  </Box>
                  <Box className="button">
                    {resultPostSticky.isFetching ? (
                      <Loading inner />
                    ) : (
                      <ButtonAction title="Update" type="submit" />
                    )}
                  </Box>
                </Form>
              )}
            </Formik>
          </div>
        }
      />
    </div>
  );
};
