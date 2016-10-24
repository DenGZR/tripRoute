/**
 * Created by Artur on 14.09.16.
 */

import listTripsTmpl from './listTrips.html';

export default function routeTrip () {
	return {
		replace: true,
		restrict: 'E',
		scope:{},
		template: listTripsTmpl
	}
};