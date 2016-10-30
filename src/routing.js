/**
 * Created by Artur on 16.09.16.
 */
import loginTmpl from './pages/login/login.html';
import loginCtrl from './pages/login/loginCtrl';

import registrationTmpl from './pages/registration/registration.html';
import registrationCtrl from './pages/registration/registrationCtrl';


import sideMenuTmpl from './pages/menu/sideMenu.html';
import sideMenuCtrl from './pages/menu/sideMenuCtrl.js';

import listTrips from './pages/trips/listTrips/listTrips.html';
import listTripsCtrl from './pages/trips/listTrips/listTripsCtrl.js';

import tabTripTmpl from './pages/trips/tabTrip.html';
import tripCtrl from './pages/trips/tripCtrl';

import tripMapTmpl from './pages/trips/tripRoute/tripMap.html';
import tripPointsTmpl from './pages/trips/tripPoints/tripPoints.html';
import tripTodoTmpl from './pages/trips/tripTodo/tripTodo.html';
import tripOptionsTmpl from './pages/trips/tripOptions/tripOptions.html';






export default function routing ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			abstract: true,
			template: sideMenuTmpl,
			controller: sideMenuCtrl,
			controllerAs: 'sideMenuCtrl'
		})
		.state('login', {
			url: '/login',
			template: loginTmpl,
			controller: loginCtrl,
			controllerAs: 'loginCtrl'
		})
		.state('registration', {
			url: '/registration',
			template: registrationTmpl,
			controller: registrationCtrl,
			controllerAs: 'registrationCtrl'
		})
		.state('app.addTrip', {
			url: '/add-trip'
			//template: tmplHome
		})
		.state('app.listTrips', {
			url: '/list-trips',
			template: listTrips,
			controller: listTripsCtrl,
			controllerAs: 'listTripsCtrl'
		})
		.state('app.trip', {
			abstract: true,
			url: '/trip/:id',
			template: tabTripTmpl,
			cache: false,
			controller: tripCtrl,
			controllerAs: 'tripCtrl'
		})
		.state('app.trip.map', {
			url: '/map',
			views:{
				'tab-trip-map':{
					template: tripMapTmpl
				}
			}
		})
		.state('app.trip.points', {
			url: '/points',
			views:{
				'tab-trip-points':{
					template: tripPointsTmpl
				}
			}

		})
		.state('app.trip.todo', {
			url: '/todo',
			views:{
				'tab-trip-todo':{
					template: tripTodoTmpl
				}
			}
		})
		.state('app.trip.options', {
			url: '/options',
			views:{
				'tab-trip-options':{
					template: tripOptionsTmpl
				}
			}
		})
		/*.state('app.trip.listPIO', {
		 url: '/trip:id/list-pio',
		 template: tmplHome
		 })
		 .state('app.trip.info', {
		 url: '/trip:id/info',
		 template: tmplHome
		 })
		 .state('app.trip.options', {
		 url: '/trip:id/options',
		 template: tmplHome
		 })
		 .state('app.searchPIO', {
		 url: '/search-pio',
		 template: tmplHome
		 })
		 .state('app.profile', {
		 url: '/profile',
		 template: tmplHome
		 })*/;
	$urlRouterProvider.otherwise('/list-trips')
};