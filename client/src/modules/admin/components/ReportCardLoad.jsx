import React from "react";

export const ReportCardLoad = ({ details }) => {
  return (
    <tr>
      <td className="placeholder-wave">
        <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
      </td>
      <td className="placeholder-wave">
        <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
      </td>
      <td className="placeholder-wave" style={{ width: "200px" }}>
        <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
      </td>
      <td className="placeholder-wave">
        <span className="placeholder col-6 bg-dark-subtle rounded-3 my-2"></span>
      </td>
      <td className="placeholder-wave">
        <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
      </td>
      {details && (
        <>
          <td className="placeholder-wave">
            <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
          </td>
          <td className="placeholder-wave">
            <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
          </td>
          <td className="placeholder-wave">
            <span className="placeholder col-12 bg-dark-subtle rounded-3"></span>
          </td>
        </>
      )}
    </tr>
  );
};
