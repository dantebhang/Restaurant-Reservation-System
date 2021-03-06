import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

/**
 * Lists all rows for reservations of each day with options to seat, edit or cancel
 * @param reservation
 * prop passed from Reservation Table to map each row
 * @param onCancel
 * prop passed from Dashboard to Reservation Table
 * @returns {JSX.Element}
 * reservation rows and buttons for each row
 */

function ReservationList({ reservation, onCancel }) {
	function cancelHandler({ target }) {
		const reservationId = target.dataset.reservationIdCancel;
		if (
			window.confirm(
				"Do you want to cancel this reservation? This cannot be undone",
			)
		) {
			onCancel(reservationId);
		} else {
			return null;
		}
	}
	const formatDate = moment(reservation.reservation_date).format("MM-DD-Y");
	
	return (
		<tbody>
			<tr>
				<th scope="row">{reservation.reservation_id}</th>
				<td>{reservation.first_name}</td>
				<td>{reservation.last_name}</td>
				<td>{reservation.mobile_number}</td>
				<td>{formatDate}</td>
				<td>{reservation.reservation_time.slice(0, 5)}</td>
				<td>{reservation.people}</td>
				<td data-reservation-id-status={reservation.reservation_id}>
					{reservation.status}
				</td>
				<>
					{reservation.status === "booked" ? (
						<>
							<td>
								<Link to={`/reservations/${reservation.reservation_id}/seat`}>
									<button className="btn btn-sm btn-purple" style={{color: 'white'}}>seat</button>
								</Link>
							</td>
							<td>
								<Link to={`/reservations/${reservation.reservation_id}/edit`}>
									<button
										className="btn btn-sm btn-outline"
										style={{ color: "#88439a" }}
									>
										edit
									</button>
								</Link>
							</td>
							<td>
								<Link to={`/dashboard?date=${reservation.reservation_date}`}>
									<button
										className="btn btn-sm btn-outline"
										style={{ color: "#88439a" }}
										data-reservation-id-cancel={reservation.reservation_id}
										onClick={cancelHandler}
									>
										cancel
									</button>
								</Link>
							</td>
						</>
					) : null}
				</>
			</tr>
		</tbody>
	);
}

export default ReservationList;
