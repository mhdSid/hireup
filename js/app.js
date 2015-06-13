var myApp = angular.module('myApp',['ngRoute', 'ngCookies', 'applicationControllers', 'appFilters', 'lengthFilter', 'CouchDB0', 'CouchDB', 'CouchDB1', 'CouchDB3', 'CouchDB4']);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/home',{
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	}).
	when('/result',{
		templateUrl: 'partials/result.html',
		controller: 'ResultController'
	}).
	when('/questionnaire',{
		templateUrl: 'partials/questionnaire.html',
		controller: 'QuestionnaireController'
	}).
	when('/redirect',{
		templateUrl: 'partials/redirect.html',
		controller: 'RedirectController'
	}).
	otherwise({
		redirectTo: '/home'
	});

}]);




