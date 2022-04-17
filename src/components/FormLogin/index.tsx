import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

interface IProps {
  children: React.ReactChild;
}

const FormLogin = ({ children }: IProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box className="signin__container">
        <Box className="box-top">
          <Typography variant="h4" className="signin__title">
            Crypto Bot
          </Typography>
          <Box className="btn-top">
            <Link to={"/"}>Đăng nhập</Link>
            <Link to={"/"}>Đăng ký</Link>
          </Box>
        </Box>
        <Box className="wrapper_content">{children}</Box>
      </Box>
    </Box>
  );
};

export default FormLogin;
