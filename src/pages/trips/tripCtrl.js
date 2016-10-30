/**
 * Created by Artur on 19.09.16.
 */

import editPointModalTmpl from './editPointModal.html';

tripCtrl.$inject = ['$scope', '$stateParams', '$timeout', '$ionicModal', '$ionicActionSheet', '$ionicPopup', 'toolsService', 'mapFactory', 'firebaseDataService'];

export default function tripCtrl ($scope, $stateParams, $timeout, $ionicModal, $ionicActionSheet, $ionicPopup, toolsService, mapFactory, firebaseDataService) {
	var vm = this;
	vm.idTrip = $stateParams.id;
	$scope.newPoint = {};

	vm.currentTrip = firebaseDataService.getTrip(vm.idTrip);

	vm.mapOptipns = {
		center: {
			lat: 48.2246,
			lng: 17.0507,
			zoom: 5
		}
	};

	vm.currentTrip.$loaded().then(function () {
		mapFactory.mapQuest.routing(vm.currentTrip.tripPoints);
	});

	vm.uiStateData = {
		showDelete: false
	};

	vm.deletePointFromList = function (index) {
		vm.currentTrip.tripPoints.splice(index, 1);
		mapFactory.mapQuest.routing(vm.currentTrip.tripPoints);
	};

	vm.movePointFromList = function (point, fromIndex, toIndex) {
		vm.currentTrip.tripPoints.splice(fromIndex, 1);
		vm.currentTrip.tripPoints.splice(toIndex, 0, point);
		mapFactory.mapQuest.routing(vm.currentTrip.tripPoints);
	};

	$scope.editPointModal = $ionicModal.fromTemplate(editPointModalTmpl, {
		name: 'editPointModal',
		scope: $scope,
		animation: 'slide-in-up'
	});

	var NewPoint = function () {
		if (!(this instanceof NewPoint)) {
			return new NewPoint();
		}
		this.lat = "";
		this.lng = "";
		this.name = "";
		this.descriptions = "";
		this.draggable = true;
	};

	$scope.$on('leafletDirectiveMap.tripMap.contextmenu', function (event, locationEvent) {

		$scope.positionNewPointOnList = "finish";
		$scope.newPoint = new NewPoint();
		$scope.newPoint.lat = locationEvent.leafletEvent.latlng.lat;
		$scope.newPoint.lng = locationEvent.leafletEvent.latlng.lng;

		mapFactory.nominatim.reverse($scope.newPoint.lat, $scope.newPoint.lng).then(function (respond) {
			$scope.newPoint.data = respond.data;
			$scope.newPoint.descriptions = respond.data.display_name;
		});
		$scope.editPointModal.show();
	});

	$scope.$on('leafletDirectiveMarker.tripMap.dragend', function (event, args) {
		vm.currentTrip.tripPoints[args.modelName].lat = args.model.lat;
		vm.currentTrip.tripPoints[args.modelName].lng = args.model.lng;
		mapFactory.mapQuest.routing(vm.currentTrip.tripPoints);
	});

	$scope.$on('leafletDirectiveMarker.tripMap.contextmenu', function (event, args) {
		console.log('leafletDirectiveMarker.tripMap.contextmenu');
		$ionicActionSheet.show({
			buttons: [
				{text: '<i class="icon ion-edit"></i> Edit Point'}
			],
			destructiveText: 'Delete',
			cancelText: 'Cancel',
			buttonClicked: function (index) {
				console.log('BUTTON CLICKED', index);
				return true;
			},
			destructiveButtonClicked: function () {
				vm.currentTrip.tripPoints.splice(args.modelName, 1);
				mapFactory.mapQuest.routing(vm.currentTrip.tripPoints);
				return true;
			}
		});
	});

	$scope.addPointTrip = function () {

		var length = toolsService.lengthObject(vm.currentTrip.tripPoints);

		var data = {};

		if (!vm.currentTrip.tripPoints) {
			vm.currentTrip.tripPoints = [];
		}

		console.log(length);

		vm.currentTrip.tripPoints[length] = $scope.newPoint;

		vm.currentTrip.$save();

		$scope.editPointModal.hide();

		mapFactory.mapQuest.routing(vm.currentTrip.tripPoints);
	}
}
