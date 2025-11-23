import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  style = {},
  className = "",
  ...rest
}) => {
  const baseStyle = {
    padding: size === "sm" ? "6px 12px" : size === "lg" ? "12px 24px" : "8px 16px",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    gap: "8px",
    backgroundColor:
      variant === "primary"
        ? "#007bff"
        : variant === "secondary"
        ? "#6c757d"
        : variant === "danger"
        ? "#dc3545"
        : variant === "outline"
        ? "transparent"
        : "#007bff",
    color: variant === "outline" ? "#007bff" : "#fff",
    border: variant === "outline" ? "2px solid #007bff" : "none",
    opacity: disabled ? 0.6 : 1,
    transition: "background-color 0.3s ease",
    ...style,
  };

  const spinnerStyle = {
    width: 16,
    height: 16,
    border: "2px solid #fff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={baseStyle}
      className={className}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span style={spinnerStyle} aria-label="Loading" />
      ) : (
        <>
          {icon && <span style={{ marginRight: "4px" }}>{icon}</span>}
          {children}
        </>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default Button;
