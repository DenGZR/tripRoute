registrationCtrl.$inject = ['$state', '$ionicPopup', '$ionicLoading', 'AuthService'];

export default function registrationCtrl ($state, $ionicPopup, $ionicLoading, AuthService) {
	var vm = this;

	this.registrationUserWithEmailAndPassword = function () {

		$ionicLoading.show({
			template:'<ion-spinner icon="lines"></ion-spinner>'
		});

		AuthService.createUserWithEmailAndPassword(vm.user.email, vm.user.password)
			.then(function (data) {
				$state.go('app.listTrips');
			})
			.catch(function (data) {
				$ionicPopup.alert({
					title: 'Error registration',
					template: data.message
				});
			})
			.finally(function () {
				$ionicLoading.hide();
			});
	}
}