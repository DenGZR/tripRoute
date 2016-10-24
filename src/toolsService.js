
export default function toolsService() {
	return{
		lengthObject: function (obj) {
			var count = 0;

			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					count++;
				}
			}
			return count;
		}
	}
}