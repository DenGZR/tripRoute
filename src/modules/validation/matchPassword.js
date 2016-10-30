/**
 * Created by Artur on 30.10.16.
 */

export default function matchPassword () {
	return {
		require: 'ngModel',
		scope: {
			password: '=matchPassword'
		},
		link: function (scope, elm, attrs, ngModel) {
			ngModel.$validators.matchPassword = function (modelValue, viewValue) {
				return scope.password === viewValue;
			};

			scope.$watch("password", function() {
				ngModel.$validate();
			});
		}
	}
}