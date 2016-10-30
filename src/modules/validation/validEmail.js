/**
 * Created by Artur on 30.10.16.
 */

export default function validEmail () {
	var EMAIL_REGEXP = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	return {
		require: 'ngModel',
		scope: {},
		link: function (scope, elm, attrs, ngModel) {
			ngModel.$validators.email = function (modelValue, viewValue) {
				return EMAIL_REGEXP.test(viewValue);
			};
		}
	}
}
