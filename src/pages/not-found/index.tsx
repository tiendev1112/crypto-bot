import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export const NotFound = () => {
  return (
    <div style={{ paddingTop: "30vh" }}>
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <ErrorOutlineIcon color="secondary" fontSize="large" />
        404 Page not found
      </h3>
    </div>
  );
};
