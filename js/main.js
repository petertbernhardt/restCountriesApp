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
		var countryObjectArray = {};
		var keys = Object.keys(data);
		var countryInfoKeys = ['name', 'nativeName', 'translations', 'capital', 'population', 'flag']
		// loop through keys
		// grab data for nativeName, translations, capital, population, and flag
		// create an object with the key as a name property and the element as a data property
		keys.forEach(function (key) {
			// check if the key is in countryInfoKeys
			if (countryInfoKeys.indexOf(key) > -1) {
				// add it to countryObjectArray
				if (key === 'translations') {
					// translations are special, need to add them differently
					var translationKeys = Object.keys(data[key]);
					var translationsArray = [];
					translationKeys.forEach(function(translationKey) {
						var translation = data[key][translationKey];
						var translationObject = {
							'code': translationKey,
							'translation': translation
						};
						translationsArray.push(translationObject);
					});
					countryObjectArray[key] = translationsArray;
				} else {
					countryObjectArray[key] = data[key];
				}
			}
		});
		return countryObjectArray;
	};
}]);
app.controller("MainController", function($scope) {
	$scope.message = 'Hello!';
});