import React, { useEffect, useState } from "react";

export default function PropertyAttribute({ title, value }) {
  return (
    <div className="flex">
      <div style={{
      fontWeight: 'bolder'
    }}>{title}</div>
      {value ? <div>{value}</div> : <div></div>}
    </div>
  );
}