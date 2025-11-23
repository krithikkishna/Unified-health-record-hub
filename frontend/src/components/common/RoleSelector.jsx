import React from "react";

const roles = [
  { label: "Doctor", value: "doctor" },
  { label: "Patient", value: "patient" },
  { label: "Admin", value: "admin" }
];

const RoleSelector = ({
  selectedRole,
  onChange,
  className = "",
  showPlaceholder = true,
  label = "Select Role:"
}) => {
  return (
    <div className={className}>
      <label
        htmlFor="role"
        style={{
          fontWeight: "bold",
          display: "block",
          marginBottom: "8px"
        }}
      >
        {label}
      </label>
      <select
        id="role"
        name="role"
        value={selectedRole}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem"
        }}
      >
        {showPlaceholder && (
          <option value="" disabled>
            -- Choose a role --
          </option>
        )}
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelector;
