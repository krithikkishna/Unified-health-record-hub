import React from "react";
import styles from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className={styles.userMenu}>
      {user ? (
        <>
          <span className={styles.username}>Hi, {user?.name || "User"}</span>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            Logout
          </button>
        </>
      ) : (
        <span className={styles.username}>Guest</span>
      )}
    </div>
  );
};

export default UserMenu;
