var app = angular.module("restApp", []);
app.controller("MainController", function($scope, CountryService) {
	$scope.message = 'Hello!';

	$scope.showCountryInfo = false;
	$scope.countryInfo = []; // array of objects for the country data

	$scope.search = function() {
		// Hide country info
		$scope.showCountryInfo = false;
		// take the search box's value
		// call CountryService.search and pass it the value
		// when data is received, display the search results
		console.log('Value: ', $scope.input);
		CountryService.search($scope.input).then(function(response) {
			$scope.data = response.data[0];
			$scope.countryInfo = CountryService.populateCountryInfo($scope.data);
			$scope.showCountryInfo = true;
		});
	};
});
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