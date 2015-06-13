angular.module('applicationControllers')
.controller('QuestionnaireController', ['$scope', '$compile', '$http', '$location', '$rootScope', 'ProjectCouch0', 'ProjectCouch1', 'viewGetter', 'updateUser', '$routeParams', '$cookieStore', '$timeout', function($scope, $compile, $http, $location, $rootScope, ProjectCouch0, ProjectCouch1, viewGetter, updateUser, $routeParams, $cookieStore, $timeout)
{

$rootScope.questionnaires = $cookieStore.get("questions");
var x = $cookieStore.get("index");
var counter = 0;
var ballCount = 1;
$scope.userData1 = $cookieStore.get("USER");
$rootScope.continuee = [];
$rootScope.continuee.answersQuestionnaire = [];

//console.log($rootScope.questionnaires);

$scope.questionss = root(counter);
$scope.answersQuestionnaire = [];

//console.log($scope.questionss);
//$scope.textarea = 0;


$scope.next = function ()
{
	if (counter < $cookieStore.get("leftOver") - 1)
	{
		$scope.textarea = 0;
		document.getElementById("ball" + ballCount).style.background = "#ECE317";
		++x;   
		++counter;
		++ballCount; 

		//Store the question and it's corresponding answer
		if ($scope.questionss.possibleAnswers.length == 1)
		{
			var innerText = document.getElementById("textarea").value;
			/*console.log("Q: " + $scope.questionss.question);
			console.log("A: " + innerText);*/
			$scope.answersQuestionnaire.push("Q: " + $scope.questionss.question + " - " + "A: " + innerText);
			document.getElementById("textarea").value = "";
		}
		else 
		{
			//alert($scope.questionss.question);
			//var innerText = document.getElementById("textarea").value;
			/*console.log("Q: " + $scope.questionss.question);
			console.log("A: " + innerText);*/
			
			$scope.answersQuestionnaire.push("Q: " + $scope.questionss.question + " - " + "A: " + event.target.value);
		}

		$scope.questionss = root(counter);
		$scope.lengthh = $scope.questionss.possibleAnswers.length;

		//Show textarea and hide buttons 
		if ($scope.questionss.possibleAnswers.length == 1)
			$scope.textarea = 33;
		else {}

	}
	else
	{
		//alert("alright");
		var innerText = document.getElementById("textarea").value;
		/*console.log("Q: " + $scope.questionss.question);
		console.log("A: " + innerText);*/
		$scope.answersQuestionnaire.push("Q: " + $scope.questionss.question + " - " + "A: " + innerText);
		//console.log($scope.answersQuestionnaire);
		//console.log(" ");

		$routeParams.QUEST = $scope.answersQuestionnaire;
		updateNew();
		$timeout(saveNew());

		//Deleting everything from the cache when done
		$rootScope.continuee = null;
		$scope.questionss = null;
		$routeParams.QUEST = null;
		$scope.userData1 = null;
		$rootScope.user = null;
		$cookieStore.remove('index');
		$cookieStore.remove('USER');
		$cookieStore.remove('questions');
		$location.path("cinemoz.com");
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


///////////////////////////////////////////GSetting the first ball color to green after loading the DOM element
$scope.init = function()
{
    $scope.onTimeout = function()
    {
		document.getElementById("ball0").style.background = "#ECE317";
        mytimeout = $timeout($scope.onTimeout,50);
    }
    var mytimeout = $timeout($scope.onTimeout,50);
}
$timeout($scope.init);




///////////////////////////////////////////Get current question in the Json array
function root(i)
{
	return $rootScope.questionnaires[i];
}


///////////////////////////////////////////get the user ids and names. 
viewGetter.get(function(data) 
{
    $rootScope.users = data;
    /*for (var k = 0; k < $rootScope.users.rows.length; k++)
    {
        //console.log("ID: " + $rootScope.users.rows[k].value + "      Name: " + $rootScope.users.rows[k].key);
    }*/
});



//First we save the user info and then we update the couchDB document with the score so we use these to fuctions to store the data for this ID
//////////////////////////////////////////////////////////////////////////Update user data at a certain id
function updateNew()
{
    var id = $scope.userData1._id;
    //$routeParams.usser = $rootScope.user;

    //Store the ID of the name entered in the text area
    for (var k = 0; k < $rootScope.users.rows.length; k++)
    {
        //console.log("ID: " + $rootScope.userData.rows[k].value + "      Name: " + $rootScope.userData.rows[k].key);
        if (id == $rootScope.users.rows[k].id)
        {
            var IIDD = $rootScope.users.rows[k].id;
            $routeParams.UID = IIDD;
        }
    }

    //console.log(" Name: " + name);
    //console.log(" ID: " + $routeParams.UID);

    var self = this;
    ProjectCouch0.get({q: $routeParams.UID}, function(user) 
    {
        self.original = user;
        $rootScope.continuee = new ProjectCouch0(self.original);
        $rootScope.continuee.answersQuestionnaire = $scope.answersQuestionnaire;
       //console.log($rootScope.continuee);

    });
}

function saveNew() 
{
	$scope.onTimeoutt = function()
    {
		$rootScope.continuee.update(function() { });
	} 
	var mytimeoutt = $timeout($scope.onTimeoutt,50);
};





}]);



 