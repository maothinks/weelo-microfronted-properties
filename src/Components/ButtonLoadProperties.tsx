import { Button } from "@mui/material";
import React from "react";

export default function ButtonLoadProperties(props) {
  const {
    children,
    disabled = false,
    loading = false,
    className = "",
    ...remainingProps
  } = props;
  const background =
    disabled || loading ? "opacity-50 bg-secondary" : "bg-warning";
  return (<div><br></br>
    <Button disabled={disabled || loading} {...remainingProps} variant="contained" color="warning">{loading ? "Loading..." : children}</Button>
  </div>
  );
}