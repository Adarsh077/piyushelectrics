import React from "react";
import { Redirect, Switch } from "react-router-dom";

// Core Components
import { RouteWithLayout } from "./components";
import { Clients, SingleClient } from "./pages";

// Layouts
import { Main } from "./layouts";

// Providers
import { ClientProvider } from "./context/ClientContext";

function App() {
  return (
    <ClientProvider>
      <Switch>
        <RouteWithLayout path="/clients" component={Clients} layout={Main} />
        <RouteWithLayout
          path="/client/:id"
          component={SingleClient}
          layout={Main}
        />
        <Redirect path="/" to="/clients" />
      </Switch>
    </ClientProvider>
  );
}

export default App;
