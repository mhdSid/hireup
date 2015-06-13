angular.module('applicationControllers')
.controller('HomeController', ['$scope', '$cookieStore','$http', '$location', '$rootScope', 'ProjectCouch0', 'ProjectCouch1', 'viewGetter', 'updateUser', '$routeParams', function($scope, $cookieStore, $http, $location, $rootScope, ProjectCouch0, ProjectCouch1, viewGetter, updateUser, $routeParams)
{

///////////////////////////////////////////Save data in the couchDB
/*function save() 
{
	$scope.user.type = "applicant";
	$rootScope.user = $scope.user; //saving the name so we can find the id of that name and update the couchDB document with the scores and the answers

    ProjectCouch1.save($scope.user, function(user) 
    {
      	alert("Data Saved");
      	$scope.user = user;
    });	 
}*/

$scope.show = 0;
$scope.showErr = false;

$scope.next = function() 
{
	var a = document.forms["myForm"]["username"].value;
    var b = document.forms["myForm"]["dob"].value;
    var c = document.forms["myForm"]["uni"].value;
    var d = document.forms["myForm"]["gender"].value;
    var e = document.forms["myForm"]["hobby"].value;
    var f = document.forms["myForm"]["phone"].value;
    var g = document.forms["myForm"]["email"].value;
    var h = document.forms["myForm"]["address"].value;

    if ( (a == null || a == "") || (b == null || b == "") ||(c == null || c == "") || (d == null || d == "") || (e == null || e == "") || (f == null || f == "") || (g == null || g == "") || (h == null || h == "") ) 
    {
        //alert("Plese fill out all the fields.");
        //setTimeout(function() { $scope.showErr = true;}, 666);
        $scope.showErr = true;
        return false;
        setTimeout(function() { $scope.showErr = false;}, 2000);
    }

	
	else
	{
		$scope.user.type = "applicant";
		$rootScope.user = $scope.user;
		//save();
		$location.path("/result");
	}
}



///////////////////////////////////////////Enter button press
window.document.onkeydown = function (e)
{
	if (!e)
		e = event;
    if (e.keyCode == 13)
    {
        $scope.next();   
    }
}

}]);

 