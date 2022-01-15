import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PropertiesPage from "./Components/PropertiesPage"

export default function Root(props) {
  return <BrowserRouter><Route path="/properties" component={PropertiesPage} />
  </BrowserRouter>
}