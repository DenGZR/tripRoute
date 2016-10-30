
import matchPassword from './matchPassword';
import validEmail from './validEmail';

angular.module('validation', [])
	.directive('matchPassword', matchPassword)
	.directive('validEmail', validEmail);