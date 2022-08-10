import type { coordinate } from '../interfaces/Website';
import { alcoholPricesVisible, askLocationButtonVisible, coordinates, website } from '../stores';
import { get } from 'svelte/store';

export function showLocation(position: GeolocationPosition) {
	const location: coordinate = {
		lat: position.coords.latitude,
		lon: position.coords.longitude
	};
	if (isUserInside(location)) {
		alcoholPricesVisible.set(true);
	} else {
		alert('You are not within the boundary of the location. Unable to fetch prices.');
	}
	askLocationButtonVisible.set(false);
}

function showLocationAuto(position: GeolocationPosition) {
	const location: coordinate = {
		lat: position.coords.latitude,
		lon: position.coords.longitude
	};
	if (isUserInside(location)) {
		alcoholPricesVisible.set(true);
	}
	askLocationButtonVisible.set(false);
}

export function errorHandler(error: GeolocationPositionError) {
	if (error.code == 1) {
		alert('Error: Access to position is denied! Unable to fetch prices.');
	} else if (error.code == 2) {
		alert('Error: Position is unavailable! Unable to fetch prices.');
	} else if (error.code == 3) {
		alert('Error: Timeout! Unable to fetch prices.');
	}
}

export function isUserInside(currentLocation: coordinate): boolean {
	const vs: Array<coordinate> = [];
	const defaultCoord: coordinate = { lat: 0, lon: 0 };
	vs.push(
		get(website).locationBoundary1 || defaultCoord,
		get(website).locationBoundary2 || defaultCoord,
		get(website).locationBoundary3 || defaultCoord,
		get(website).locationBoundary4 || defaultCoord
	);
	const x = currentLocation.lon,
		y = currentLocation.lat;

	let inside = false;
	for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		const xi = vs[i].lon,
			yi = vs[i].lat;
		const xj = vs[j].lon,
			yj = vs[j].lat;

		const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}

	return inside;
}

export function checkGeolocationPermissions() {
	if (navigator.permissions) {
		navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
			if (result.state === 'granted') {
				askLocationButtonVisible.set(false);
				navigator.geolocation.getCurrentPosition(showLocationAuto, errorHandler);
			} else if (result.state === 'denied') {
				askLocationButtonVisible.set(false);
			} else if (result.state === 'prompt') {
				askLocationButtonVisible.set(true);
			}
		});
	} else {
		askLocationButtonVisible.set(true);
	}
}
