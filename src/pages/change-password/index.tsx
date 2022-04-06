import { Box, Button, Typography } from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { InputField } from "../../components";
import { KEY_TOKEN_SIGNIN } from "../../constants";
import { hideLoading, showLoading } from "../../store";
import LockIcon from "@material-ui/icons/Lock";

type InputType = {
  newPassword: string;
  newPasswordConfirmation: string;
};

export const ChangePassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sentRequest, setSentRequest] = useState(false);
  const initialValues: InputType = {
    newPassword: "",
    newPasswordConfirmation: "",
  };
  useEffect(() => {
    if (localStorage.getItem(KEY_TOKEN_SIGNIN)) {
      history.push("/");
    }
  }, [history]);
  const handleSubmit = async (
    values: any,
    { setErrors }: FormikHelpers<InputType>
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
        <h2>Change password</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Box className="content">
                {!sentRequest ? (
                  <>
                    <InputField
                      placeholder="New password"
                      name="newPassword"
                      icon={<LockIcon />}
                      type="password"
                      required
                    />
                    <InputField
                      placeholder="New confirm password"
                      name="newPasswordConfirmation"
                      icon={<LockIcon />}
                      type="password"
                      required
                    />
                    <div className="list-btn">
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
                    <Typography style={{ textAlign: "center" }}>
                      Changed password successfully. Please{" "}
                      <Link to={"/signin"}>Sign in?</Link>
                    </Typography>
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
