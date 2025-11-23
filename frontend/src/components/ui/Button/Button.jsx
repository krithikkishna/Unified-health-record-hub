// src/components/ui/Button/Button.jsx
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "@/components/ui/Button/Button.scss";

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  fullWidth = false,
  ...rest
}) => {
  const btnClass = classNames(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    { "btn-full": fullWidth }
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={btnClass}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="spinner" aria-label="Loading" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
};

export default Button;
