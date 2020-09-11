import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routesNotAuth, routesAuth } from "./helper.js";

const Routes = (props) => {
  // Incluir aqui a variável de estado autenticada com nome statusAuth, deve ser true ou false
  // const routesRender = statusAuth ? routesAuth : routesNotAuth
  return (
    <Switch>
      {routesRender.map((item, index) => (
        <Route key={index} exact path to={item.path}>
          <item.page />
        </Route>
      ))}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
