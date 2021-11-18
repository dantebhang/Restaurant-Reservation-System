import React, { useState, useEffect } from "react";
import useQuery from "../utils/useQuery"
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "../reservations/CreateReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date") || today()
  console.log(query.get("date"), date)

  // const query = useQuery();
  //const getDate = query.get("date");

  // useEffect(() => {
  //   setDate(getDate)
  // }, [getDate])

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/reservations/new">
        <CreateReservation/>
      </Route>

      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
