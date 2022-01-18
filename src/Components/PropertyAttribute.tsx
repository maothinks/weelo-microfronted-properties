import React, { useEffect, useState } from "react";

export default function PropertyAttribute({ title, value }) {
  return (
    <div className="flex">
      <div style={{ fontSize:"20px",
        fontWeight: 'bolder'
      }}>{title}:</div> {value ? <div style={{ fontSize:"20px",
    }}>{value}</div> : <div></div>}
    </div>
  );
}