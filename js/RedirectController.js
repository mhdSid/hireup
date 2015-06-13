angular.module('applicationControllers')
.controller('RedirectController', ['$scope', '$cookieStore','$http', '$location', '$rootScope', 'ProjectCouch0', 'ProjectCouch1', 'viewGetter', 'updateUser', '$routeParams', function($scope, $cookieStore, $http, $location, $rootScope, ProjectCouch0, ProjectCouch1, viewGetter, updateUser, $routeParams)
{

$scope.userData1 = $cookieStore.get("USER");

}]);

 