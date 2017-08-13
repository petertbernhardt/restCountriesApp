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