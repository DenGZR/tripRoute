// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

import angular from 'angular';
import animate from 'angular-animate';
import sanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';

import 'ionic';
import 'ionic-angular';
import 'ionic.css';

import firebase from 'firebase';
import 'angularfire';

require("./css/index.less");
import toolsService from './toolsService';

import routing from './routing';

//service
import mapFactory from './pages/trips/mapFactory.js';
import listTripsService from './pages/trips/listTrips/listTripsService';

//modules
import Auth from './modules/Auth';
import firebaseData from './modules/firebaseData';
import validation from './modules/validation';


angular.module('routeTrip', ['ionic', 'firebase', 'leaflet-directive', 'ngStorage', 'Auth', 'firebaseData', 'validation'])
	.run(function ($ionicPlatform, FirebaseDB) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});

		//initialize Firebase
		FirebaseDB.initialize();
	})
	.run(function ($state, $rootScope, AuthService) {
		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
			console.log("stateChangeStart triggered");
			if (!AuthService.isLoggedIn()) {
				if (toState.name !== 'login' && toState.name !== 'registration') {
					event.preventDefault();
					$state.go('login');
				}
			}
		});
	})
	.config(routing)
	.factory('mapFactory', mapFactory)
	.factory('listTripsService', listTripsService)
	.factory('toolsService', toolsService)
	.factory('FirebaseDB', function ($q, $state, $timeout) {
		var instance, storageInstance, unsubscribe, currentUser = null;
		var initialized = false;

		return {
			initialize: function () {

				// Not initialized so... initialize Firebase

				var config = {
					apiKey: "AIzaSyB_HBrfpwb4o0fQD-C2cDPYTfqYYu8T3os",
					authDomain: "planner-trip.firebaseapp.com",
					databaseURL: "https://planner-trip.firebaseio.com",
					storageBucket: "planner-trip.appspot.com",
					messagingSenderId: "815670440239"
				};

				// initialize database and storage
				instance = firebase.initializeApp(config);
				storageInstance = firebase.storage();

			}
		}
	});
