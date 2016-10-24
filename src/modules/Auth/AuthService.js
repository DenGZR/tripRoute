import firebase from 'firebase';

AuthService.$inject = ['$firebaseAuth', '$localStorage', '$q'];

export default function AuthService ($firebaseAuth, $localStorage, $q) {
	var auth = $firebaseAuth(firebase.auth());
	var authUser;

	/*
	 if ($localStorage.authUser) {
	 authUser = $localStorage.authUser
	 } else {
	 authUser = {
	 status: false,
	 data: false
	 }
	 }
	 */

	return {
		isLoggedIn: function isLoggedIn () {
			var data = auth.$getAuth();
			if (auth.$getAuth() === null) {
				return false
			} else {
				return true
			}
		},

		signInUserByEmail: function (email, password) {
			return auth.$signInWithEmailAndPassword(email, password);
		},

		signOut: function () {
			auth.$signOut();
		},

		getDataUser: function () {
			return auth.$getAuth();
		}
	}
};

