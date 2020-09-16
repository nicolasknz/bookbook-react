import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routesNotAuth, routesAuth } from './helper.js';
import { useSelector } from 'react-redux';
import Main from '../defaultPage/main/';

/*
Vinicius - 14/09/20 (concluído)
Routes:
- Criar rotas para usuário não autenticado/autenticado
- Receber o token como estado e utilizar para permitir rotas autenticadas

*/

const Routes = (props) => {
  const session = useSelector((state) => state.session);
  const routesRender = !session.token ? routesNotAuth : routesAuth;
  //   const routesRender = routesNotAuth;

  return (
    <Switch>
      {routesRender.map((item, index) => (
        <Route key={index} exact path={item.path}>
          {session.token && <Main />}
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
