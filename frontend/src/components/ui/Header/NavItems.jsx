import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

const NavItems = () => {
  const role = useSelector((state) => state.auth.role);

  const commonLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/vitals", label: "Vitals" },
    { path: "/ecg", label: "ECG" },
    { path: "/prescriptions", label: "Prescriptions" },
    { path: "/lab-results", label: "Lab Results" },
  ];

  const adminLinks = [
    { path: "/users", label: "Users" },
    { path: "/audit", label: "Audit Logs" },
  ];

  const doctorLinks = [
    { path: "/predict/ckd", label: "CKD Risk" },
    { path: "/predict/diabetes", label: "Diabetes Risk" },
  ];

  const roleBasedLinks = {
    admin: [...commonLinks, ...adminLinks],
    doctor: [...commonLinks, ...doctorLinks],
    patient: [...commonLinks],
  };

  const linksToRender = roleBasedLinks[role] || [];

  return (
    <nav className={styles.navItems}>
      {linksToRender.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavItems;
