angular.module('appFilters', []).filter('startFrom', function() {
	return function(input, start) {
   		if (input === undefined || input === null || input.length === 0) return [];
   		start = +start;		
        return input.slice(start);
    }
});
