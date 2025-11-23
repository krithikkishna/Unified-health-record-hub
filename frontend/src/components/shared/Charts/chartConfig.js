// src/config/chartConfig.js

// Centralized color palette for charts
export const chartColors = {
  primary: "#4e73df",
  success: "#1cc88a",
  danger: "#e74a3b",
  warning: "#f6c23e",
  info: "#36b9cc",
  light: "#f8f9fc",
  dark: "#5a5c69",
  ckd: "#9b59b6",        // CKD-specific color
  diabetes: "#ff7300",   // Diabetes-specific color
};

// Common margins for chart layout
export const commonMargins = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 10,
};

// Shared axis label/tick style
export const axisStyle = {
  fontSize: 12,
  fill: "#4a4a4a",
};

// Grid line styling
export const gridStyle = {
  strokeDasharray: "3 3",
};

// Tooltip styling
export const tooltipStyle = {
  wrapperStyle: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 12,
  },
};

// Default Y-axis config
export const defaultYAxis = {
  tick: axisStyle,
  label: {
    angle: -90,
    position: "insideLeft",
    style: axisStyle,
  },
};

// Default X-axis config
export const defaultXAxis = {
  tick: axisStyle,
};
