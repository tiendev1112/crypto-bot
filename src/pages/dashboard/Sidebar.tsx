import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ConfirmModal } from "../../components";
import {
  KEY_TOKEN_SIGNIN,
  // TIME_SESSION_LOGOUT,
  USER_TYPE,
} from "../../constants";
// import IdleTimer from "../../helpers/IdleTimer";
import { MenuParentItem } from "./MenuParentItem";
import { MenuSingleItem } from "./MenuSingleItem";
import dataPackage from "../../../package.json";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";

export const Sidebar = () => {
  const history = useHistory();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const {
    currentUser: { data: dataUser },
  } = useSelector((state: IApplicationState) => state);
  // useEffect(() => {
  //   const timer = new IdleTimer({
  //     timeout: TIME_SESSION_LOGOUT * 60, //time expire
  //     onTimeout: () => {
  //       localStorage.removeItem(KEY_TOKEN_SIGNIN);
  //       localStorage.removeItem("_expiredTime");
  //       localStorage.removeItem("role");
  //       history.push("/signin");
  //     },
  //     onExpired: () => {
  //       //do something if expired on load
  //       console.log("expired");
  //     },
  //   });
  //   return () => {
  //     timer.cleanUp();
  //   };
  // }, [history]);
  const handleLogout = () => {
    history.push("/signin");
    localStorage.removeItem(KEY_TOKEN_SIGNIN);
    localStorage.removeItem("_expiredTime");
    localStorage.removeItem("role");
  };
  const role = dataUser?.type || localStorage.getItem("role");
  return (
    <div className="main-sidebar">
      {dataUser && (
        <div className="login-info">
          <h3>{dataUser?.username}</h3>
          <h4>{dataUser?.email}</h4>
          <h4>{role}</h4>
        </div>
      )}
      <div className="main-nav">
        <ul>
          <MenuParentItem text="User management" canAccess>
            <ul>
              <MenuSingleItem text="Group Master" link="/user/group-master" />
              <MenuSingleItem text="Master" link="/user/master" />
              <MenuSingleItem text="Follower" link="/user/follower" />
              <MenuSingleItem
                text="Admin"
                link="/user/admin"
                canAccess={
                  role === USER_TYPE.superadmin || role === USER_TYPE.subAdmin
                }
              />
            </ul>
          </MenuParentItem>
          <MenuParentItem
            text="Exchange management"
            canAccess={role === USER_TYPE.superadmin}
          >
            <ul>
              <MenuSingleItem
                text="Exchange"
                link="/exchange/exchanges"
              />
            </ul>
          </MenuParentItem>
          <MenuParentItem
            text="Transaction management"
            canAccess={role === USER_TYPE.superadmin}
          >
            <ul>
              <MenuSingleItem
                text="Transaction"
                link="/transaction/transactions"
              />
            </ul>
          </MenuParentItem>
          <MenuParentItem
            text="Rate management"
            canAccess={role === USER_TYPE.superadmin}
          >
            <ul>
              <MenuSingleItem text="Rate config" link="/rate/config" />
            </ul>
          </MenuParentItem>
        </ul>
        <Button className="btn-logout" onClick={() => setConfirmLogout(true)}>
          LOGOUT
        </Button>
      </div>
      <div className="app-version">
        <span>{dataPackage?.version}</span>
      </div>
      <ConfirmModal
        open={confirmLogout}
        onDismiss={() => setConfirmLogout(false)}
        onValidate={handleLogout}
        title="Are you sure to logout?"
      />
    </div>
  );
};
