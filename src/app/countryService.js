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