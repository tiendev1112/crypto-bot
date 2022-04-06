import { Box, Button, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { InputField } from "../../components";
import { KEY_TOKEN_SIGNIN } from "../../constants";
import { IApplicationState, postLogin, showMessage, SigninInput } from "../../store";
import "./style.scss";

export const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signin = useSelector((state: IApplicationState) => state.signin);
  const initialValues: SigninInput = { username: "", password: "" };
  useEffect(() => {
    if (localStorage.getItem(KEY_TOKEN_SIGNIN)) {
      history.push("/user/group-master");
      dispatch(showMessage("Signed in successfully", "success"));
    }
  }, [dispatch, history, signin]);
  const handleSubmit = async (
    values: any,
  ) => {
    dispatch(postLogin(values));
  };
  return (
    <Box className="signin__container">
      <Box className="box-top">
        <Typography variant="h4" className="signin__title">
          Crypto Bot
        </Typography>
        <Box>
          <Button>
            Đăng nhập
          </Button>
          <Button>
            Đăng ký
          </Button>
        </Box>
      </Box>
      <Box className="wrapper_content">
        <Box className="box_content">
          <h2>Đăng nhập vào tài khoản của bạn</h2>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Box className="content">
                  <InputField
                    placeholder="Username"
                    name="username"
                    icon={<PersonIcon />}
                    required
                  />
                  <InputField
                    placeholder="Password"
                    name="password"
                    icon={<LockIcon />}
                    type="password"
                    required
                  />
                  <div className="list-btn">
                    <p>
                      <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
                    </p>
                    <Button type="submit" color="secondary" className="button">
                      Tiếp tục
                    </Button>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};
