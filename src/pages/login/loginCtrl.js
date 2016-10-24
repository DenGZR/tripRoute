/**
 * Created by Artur on 02.10.16.
 */

loginCtrl.$inject = ['$state', '$ionicPopup', '$ionicLoading', 'AuthService'];

export default function loginCtrl ($state, $ionicPopup, $ionicLoading, AuthService) {
	var vm = this;

	this.singIn = function () {
		
		$ionicLoading.show({
			template:'<ion-spinner icon="lines"></ion-spinner>'
		});

		AuthService.signInUserByEmail(vm.user.email, vm.user.password)
			.then(function (data) {
				$state.go('app.listTrips');
			})
			.catch(function (data) {
				$ionicPopup.alert({
					title: 'Error Sign In',
					template: data.message
				});
			})
			.finally(function () {
				$ionicLoading.hide();
			});
	}
}