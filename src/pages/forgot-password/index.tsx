import { Box, Button, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { InputField } from "../../components";
import { KEY_TOKEN_SIGNIN } from "../../constants";
import { hideLoading, showLoading } from "../../store";

type LoginInput = {
  email: string;
};

export const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sentRequest, setSentRequest] = useState(false);
  const initialValues: LoginInput = { email: "" };
  useEffect(() => {
    if (localStorage.getItem(KEY_TOKEN_SIGNIN)) {
      history.push("/");
    }
  }, [history]);
  const handleSubmit = async (
    values: any,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    dispatch(showLoading());
    setTimeout(async () => {
      dispatch(hideLoading());
      setSentRequest(true);
    }, 2000);
  };
  return (
    <Box className="signin__container">
      <Box className="box_content">
        <h2>Forgot password</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Box className="content">
                {!sentRequest ? (
                  <>
                    <Typography
                      style={{ textAlign: "center", marginBottom: -20 }}
                    >
                      Please enter email to reset password
                    </Typography>
                    <InputField
                      placeholder="Email Address"
                      name="email"
                      icon={<PersonIcon />}
                      required
                      type="email"
                    />
                    <div className="list-btn">
                      <p>
                        <Link to={"/signin"}>Sign in?</Link>
                      </p>
                      <Button
                        type="submit"
                        color="secondary"
                        className="button"
                      >
                        Send
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Typography
                      style={{ textAlign: "center", marginBottom: -20 }}
                    >
                      Please check inbox email to reset password
                    </Typography>
                    <p style={{ textAlign: "right" }}>
                      <Link to={"/signin"}>Sign in?</Link>
                    </p>
                  </>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
