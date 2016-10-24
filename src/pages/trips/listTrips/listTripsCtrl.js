import addTripModalTmpl from './addTripModal.html';

listTripsCtrl.$inject = ['$scope', '$q', 'firebaseDataService', '$ionicModal', '$ionicPopup', '$ionicLoading', 'AuthService'];

export default function listTripsCtrl ($scope, $q, firebaseDataService, $ionicModal, $ionicPopup, $ionicLoading, AuthService) {
	var vm = this;
	vm.listTrips = firebaseDataService.getListTrips();

	var addTripModal = $ionicModal.fromTemplate(addTripModalTmpl, {
		name: 'addTripModal',
		scope: $scope,
		animation: 'slide-in-up'
	});
	vm.showAddTripModal = function () {
		vm.uiStateData.showDelete = false;
		addTripModal.show();
	};

	vm.hideAddTripModal = function () {
		addTripModal.hide();
	};

	vm.addTrip = function () {
		vm.newTrip.author = AuthService.getDataUser().email;
		vm.newTrip.timestamp = new Date().getTime();

		$ionicLoading.show({
			template: '<ion-spinner icon="lines"></ion-spinner>'
		});

		firebaseDataService.addTrip(vm.newTrip).then(function (data) {
			addTripModal.hide();
			vm.newTrip = null;
		}).finally(function () {
			$ionicLoading.hide();
		});
	};

	$scope.$on('showAddTripModal', function () {
		vm.showAddTripModal();
	});


	vm.uiStateData = {
		showDelete: false
	};

	vm.showConfirmRemoveTrip = function(idTrip, dataTrip) {
		var confirmPopup = $ionicPopup.confirm({
			template: 'Remove trip:"' + dataTrip.name + '" ?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				console.log(idTrip);
				firebaseDataService.removeTrip(idTrip);
			}
		});
	};
};