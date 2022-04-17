import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AppTextField } from "../../components";
import FormLogin from "../../components/FormLogin";
import { KEY_TOKEN_SIGNIN } from "../../constants";
import { IApplicationState, showMessage, SigninInput } from "../../store";
import "./style.scss";

export const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signin = useSelector((state: IApplicationState) => state.signin);
  const initialValues: SigninInput = { username: "", password: "" };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SigninInput>({
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (localStorage.getItem(KEY_TOKEN_SIGNIN)) {
      history.push("/user/group-master");
      dispatch(showMessage("Signed in successfully", "success"));
    }
  }, [dispatch, history, signin]);
  const onSubmit = async (values: SigninInput) => {
    console.log("values", values);

    // dispatch(postLogin(values));
  };
  return (
    <FormLogin>
      <Box className="box_content">
        <h2>Đăng nhập vào tài khoản của bạn</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box className="content">
            <AppTextField
              variant="outlined"
              required
              fullWidth
              control={control}
              error={"username" in errors}
              helperText={errors.username && errors.username.message}
              autoComplete="name"
              rules={{
                required: true,
              }}
              label={"Email"}
              name="username"
              id="username"
            />
            <AppTextField
              variant="outlined"
              required
              fullWidth
              control={control}
              error={"password" in errors}
              helperText={errors.password && errors.password.message}
              autoComplete="password"
              rules={{
                required: true,
              }}
              label={"Mật khẩu"}
              name="password"
              type="password"
              id="password"
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
        </form>
      </Box>
    </FormLogin>
  );
};
