var app = angular.module("restApp", []);
app.component("countryInfo", {
	templateUrl: 'app/countryInfo.tpl.html',
	controller: "countryInfoController"
}).controller("countryInfoController", function(CountryService) {
	var ctrl = this;

	ctrl.showCountryInfo = false;
	ctrl.showError = false;
	ctrl.countryInfo = []; // array of objects for the country data

	ctrl.search = function() {
		// Hide country info
		ctrl.showCountryInfo = false;
		ctrl.showError = false;
		// take the search box's value
		// call CountryService.search and pass it the value
		// when data is received, display the search results
		CountryService.search(ctrl.input).then(function(response) {
			// success
			ctrl.data = response.data[0];
			ctrl.countryInfo = CountryService.populateCountryInfo(ctrl.data);
			ctrl.showCountryInfo = true;
		}, function(error) {
			// error
			ctrl.showError = true;
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
app.controller("MainController", function($scope) {
	$scope.message = 'Hello!';
});