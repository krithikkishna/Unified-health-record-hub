import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Sidebar.module.scss";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";

const SidebarItem = ({ item }) => {
  const { name, path, icon: Icon, tooltip, children = [] } = item;
  const [open, setOpen] = useState(false);
  const hasChildren = children.length > 0;

  const handleToggle = () => {
    if (hasChildren) setOpen((prev) => !prev);
  };

  return (
    <div className={styles.sidebarItem}>
      <div
        className={clsx(styles.linkWrapper, { [styles.expandable]: hasChildren })}
        onClick={handleToggle}
        title={tooltip || name}
        role={hasChildren ? "button" : undefined}
        tabIndex={hasChildren ? 0 : -1}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
      >
        <NavLink
          to={path}
          className={({ isActive }) =>
            clsx(styles.link, { [styles.active]: isActive })
          }
        >
          <Icon className={styles.icon} size={18} />
          <span className={styles.label}>{name}</span>
        </NavLink>

        {hasChildren &&
          (open ? (
            <ChevronDown className={styles.chevron} size={16} />
          ) : (
            <ChevronRight className={styles.chevron} size={16} />
          ))}
      </div>

      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            className={styles.submenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children.map((subItem, index) => (
              <NavLink
                key={index}
                to={subItem.path}
                className={({ isActive }) =>
                  clsx(styles.sublink, { [styles.active]: isActive })
                }
                title={subItem.name}
              >
                {subItem.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarItem;
