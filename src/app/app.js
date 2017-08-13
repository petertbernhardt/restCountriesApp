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