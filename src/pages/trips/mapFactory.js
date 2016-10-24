/**
 * Created by Artur on 21.09.16.
 */

import iconMQmarker from './img/point_w.png';

mapFactory.$inject = ['$http', '$q', 'leafletData', '$ionicLoading'];

export default function mapFactory ($http, $q, leafletData, $ionicLoading) {
	var urlNominatimReverse = 'http://nominatim.openstreetmap.org/reverse';
	var query = {
		format: 'json',
		zoom: 18,
		addressdetails: 1
	};

	var cache = true;

	var resultRouting;
	var oldRouteLayer;

	return {
		nominatim: {
			reverse: function (lat, lon) {
				var params = angular.copy(query);
				var config = {
					params: params,
					cache: cache
				};

				config.params.lat = lat;
				config.params.lon = lon;

				return $http.get(urlNominatimReverse, config);
			}
		},
		mapQuest:{
			routing: function (tripPoints) {
				var that = this;

				var locations = [];

				tripPoints.forEach(function (point) {
					locations.push({latLng: {lat: point.lat, lng: point.lng}});
				});

				resultRouting = $q.defer();

				if (that.tripRouting) {
					oldRouteLayer = that.tripRouting;
				}

				$ionicLoading.show({
					template: '<ion-spinner icon="lines"></ion-spinner>'
				});
				
				if (locations.length > 1) {
					if (!this.dir) {
						this.dir = MQ.routing.directions()
							.on('error', function (info) {
								$ionicLoading.hide();
								if (info.type === 'error') {
									resultRouting.resolve({
										error: true,
										message: info.message
									})
								}
							})
							.on('success:route', function (info) {
								that._removeRoutingLayer();
								$ionicLoading.hide();

								resultRouting.resolve({
									error: false,
									info: info
								});
							});
					}

					that.dir.route({
						locations: locations
					});

					leafletData.getMap('tripMap')
						.then(function (map) {
							var CustomRouteLayer = MQ.Routing.RouteLayer.extend({
								createStopMarker: function (location, stopNumber) {
									var custom_icon,
										marker;

									custom_icon = L.icon({
										iconUrl: iconMQmarker,
										iconSize: [1, 1]
									});

									marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
									return marker;
								}
							});

							that.tripRouting = new CustomRouteLayer({
								directions: that.dir,
								fitBounds: true,
								draggable: false
							});
							// console.log(that.tripRouting);
							map.addLayer(that.tripRouting);

						});

				} else {
					that._removeRoutingLayer();
					$ionicLoading.hide();
					resultRouting.reject({
						error: true
					})
				}
				return resultRouting.promise;
			},
			_removeRoutingLayer: function () {
				leafletData.getMap().then(function (map) {
					if (oldRouteLayer) {
						map.removeLayer(oldRouteLayer);
					}
				});
			}
		},
		centerPoints:{}
		
	}
}