import React from "react";
import { Route } from "react-router-dom";

export default function RouteWithLayout(props) {
  const { layout: Layout = <div></div>, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        );
      }}
    />
  );
}
