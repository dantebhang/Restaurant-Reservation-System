/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the request.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
	try {
		const response = await fetch(url, options);

		if (response.status === 204) {
			return null;
		}

		const payload = await response.json();

		if (payload.error) {
			return Promise.reject({ message: payload.error });
		}
		return payload.data;
	} catch (error) {
		if (error.name !== "AbortError") {
			console.error(error.stack);
			throw error;
		}
		return Promise.resolve(onCancel);
	}
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
	const url = new URL(`${API_BASE_URL}/reservations`);
	Object.entries(params).forEach(([key, value]) =>
		url.searchParams.append(key, value.toString()),
	);
	return await fetchJson(url, { headers, signal }, [])
		.then(formatReservationDate)
		.then(formatReservationTime);
}
/**
 * Saves reservation to the database
 * @param reservation
 *  the reservation to save, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves the saved reservation, which will now have an `id` property.
 */

export async function createReservation(reservation, signal) {
	const url = `${API_BASE_URL}/reservations`;
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify({ data: reservation }),
		signal,
	};
	return await fetchJson(url, options, reservation);
}

/**
 * Retrieves the reservation with the specified `reservation_id`
 * @param reservation_id
 *  the `id` property matching the desired reservation.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 *  a promise that resolves to the saved reservation.
 */

export async function readReservation(reservation_id, signal) {
	const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
	return await fetchJson(url, { headers, signal }, [])
		.then(formatReservationDate)
		.then(formatReservationTime);
}

/**
 * Cancels/updates the reservation with the specified `reservation_id`.
 * @param reservation_id
 *  the id of the reservation to cancel
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to an empty object.
 */

export async function cancelReservation(reservation_id, signal) {
	const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
	const options = {
		method: "PUT",
		headers,
		body: JSON.stringify({
			data: {
				status: "cancelled",
			},
		}),
		signal,
	};
	return await fetchJson(url, options, []);
}

/**
 * Updates an existing reservation
 * @param reservation
 *  the reservation to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated reservation.
 */

export async function updateReservation(reservation, signal) {
	const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
	const options = {
		method: "PUT",
		headers,
		body: JSON.stringify({ data: reservation }),
		signal,
	};
	return await fetchJson(url, options, {});
}

/**
 * Saves table to the database
 * @param table
 *  the table to save, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<deck>}
 *  a promise that resolves the saved table, which will now have an `id` property.
 */

export async function createTable(table, signal) {
	const url = `${API_BASE_URL}/tables`;
	const options = {
		method: "POST",
		headers,
		body: JSON.stringify({ data: table }),
		signal,
	};
	return await fetchJson(url, options, table);
}

/**
 * Retrieves all existing tables.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */

export async function listTables(signal) {
	const url = new URL(`${API_BASE_URL}/tables`);
	return await fetchJson(url, { signal }, []);
}

/**
 * Retrieves the card with the specified `table_id`
 * @param table_id
 *  the id of the target
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the saved table.
 */

export async function readTable(table_id, signal) {
	const url = new URL(`${API_BASE_URL}/tables/${table_id}`);
	return await fetchJson(url, { headers, signal }, []);
}
/**
 * Updates a table that has seated a reservation.
 * @param table_id
 *  the table to update, which must have an `id` property.
 * @param reservation_id
 *  the reservation to update, which must have an 'id' property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated table.
 */

export async function updateTable(table_id, reservation_id, signal) {
	const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
	const options = {
		method: "PUT",
		headers,
		body: JSON.stringify({ data: { reservation_id } }),
		signal,
	};
	return await fetchJson(url, options);
}

/**
 * Deletes the table with the specified `table_id` after being seated.
 * @param table_id
 *  the id of the table to delete/finish
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to an empty object.
 */

export async function finishTable(table_id, signal) {
	const url = `${API_BASE_URL}/tables/${table_id}/seat`;
	const options = {
		method: "DELETE",
		headers,
		signal,
	};
	return await fetchJson(url, options, {});
}

