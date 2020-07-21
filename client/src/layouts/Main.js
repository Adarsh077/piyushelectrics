import React from "react";

import { Navbar } from "../components";

export default function Main(props) {
  return (
    <div>
      <Navbar />
      <div className="mt-5">{props.children}</div>
    </div>
  );
}
