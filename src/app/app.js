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