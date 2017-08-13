app.service('CountryService', ['$http', function($http) {
	var baseUrl = 'https://restcountries.eu/rest/v2/';

	this.search = function(input) {
		// full text search syntax:
		// https://restcountries.eu/rest/v2/name/{SEARCH_INPUT}?fullText=true
		var queryUrl = baseUrl + 'name/' + input + '?fullText=true';
		return $http.get(queryUrl);
	};

	this.populateCountryInfo = function(data) {
		var countryObjectArray = [];
		var keys = Object.keys(data);
		// loop through keys
		// grab its corresponding element
		// create an object with the key as a name property and the element as a data property
		keys.forEach(function (key) {
			var element = data[key];
			var countryInfoObject = {
				'name': key,
				'data': element
			};
			countryObjectArray.push(countryInfoObject);
		});
		return countryObjectArray;
	};
}]);