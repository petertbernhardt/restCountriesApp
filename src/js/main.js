var app = angular.module("restApp", []);
app.controller("MainController", function($scope, CountryService) {
	$scope.message = 'Hello!';

	$scope.search = function() {
		// take the search box's value
		// call CountryService.search and pass it the value
		// when data is received, display the search results
		console.log('Value: ', $scope.input);
		CountryService.search($scope.input).then(function(response) {
			console.log('response: ', response);
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
}]);