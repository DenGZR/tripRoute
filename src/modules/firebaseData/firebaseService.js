import firebase from 'firebase';

firebaseDataService.$inject = ['$firebaseObject', '$firebaseArray'];

export default function firebaseDataService ($firebaseObject, $firebaseArray) {
	var rootRef = firebase.database().ref();
	var tripsListRef = firebase.database().ref('tripsList');
	// var tripsListRef = firebase.database().ref('userList');

	return {
		getListTrips: function () {
			return $firebaseObject(tripsListRef);
		},
		
		getTrip: function (idTrip) {
			return $firebaseObject(tripsListRef.child(idTrip));
		},

		getPointsTrip: function (idTrip) {
			return $firebaseObject(tripsListRef.child(idTrip).child('tripPoints'));
		},

		addTrip: function (dataTrip) {
			return $firebaseArray(tripsListRef).$add(dataTrip);
		},

		addPointTrip: function (idTrip, dataPoint) {
			return $firebaseArray(tripsListRef.child(idTrip).child('tripPoints')).$add(dataPoint);
		},

		removeTrip: function (idTrip) {
			return $firebaseObject(tripsListRef.child(idTrip)).$remove();
		}
	}
};

