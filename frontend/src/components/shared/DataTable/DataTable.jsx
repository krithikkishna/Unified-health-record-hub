// src/components/DataTable.jsx
import React from "react";
import styles from "./DataTable.module.scss";

const DataTable = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <p className="text-center text-gray-500 py-4">No data available.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} style={{ textAlign: col.align || "left" }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 1 ? styles.altRow : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  style={{ textAlign: col.align || "left" }}
                >
                  {row[col.accessor] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
