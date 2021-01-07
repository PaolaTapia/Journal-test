import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          {/*
               //router ... no va.. 
               path= "/auth/login"
               componente= {loginScreen}

               path= "/auth/register"
               componente= {RegisterScreen}

               // Redirect to path= "/auth/login"
               componente= {LoginScreen}
               */}

          <Route exact path="/auth/login" component={LoginScreen} />

          <Route exact path="/auth/register" component={RegisterScreen} />
          <Redirect to="/auth/register" />
        </Switch>
      </div>
    </div>
  );
};
