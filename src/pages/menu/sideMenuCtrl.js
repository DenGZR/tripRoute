/**
 * Created by Artur on 13.10.16.
 */

sideMenuCtrl.$inject = ['$scope', '$q', '$state', 'AuthService'];

export default function sideMenuCtrl ($scope, $q, $state, AuthService) {
	var vm = this;

	vm.singOut = function () {
		AuthService.signOut();
		$state.go('login');
	};

	vm.showAddTripModal = function () {
		$state.go('app.listTrips').then(function () {
			$scope.$broadcast('showAddTripModal');
		});
	};
}