import React from "react";
import useQuery from "../utils/useQuery";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./errors/NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "../reservations/CreateReservation";
import CreateTable from "../tables/CreateTable";
import SeatReservation from "../reservations/SeatReservation";
import SearchMobile from "../search/SearchMobile";
import EditReservation from "../reservations/EditReservation";

/**
 * Defines all the routes for the application.
 *
 *
 * @returns {JSX.Element}
 */
function Routes() {
	const query = useQuery();
	const date = query.get("date");

	return (
		<Switch>
			<Route exact={true} path="/">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route exact={true} path="/reservations">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route path="/search">
				<SearchMobile />
			</Route>
			<Route path="/reservations/new">
				<CreateReservation />
			</Route>
			<Route path="/reservations/:reservation_id/seat">
				<SeatReservation />
			</Route>
			<Route path="/reservations/:reservation_id/edit">
				<EditReservation />
			</Route>
			<Route path="/tables/new">
				<CreateTable />
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
