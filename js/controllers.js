var pageCounter = 0;



var index = 0;

var progressbarCount = 3.125; //Counter that adds each time the value of (100/total number of questions)

var scoreBasic = 0;
var scoreAndroid = 0;
var scoreSwift = 0;
var scoreWeb = 0;
var scorePuzzle = 0;

var applicationControllers = angular.module('applicationControllers',[]);

applicationControllers.controller('ResultController', ['$scope', '$timeout', '$location', '$http', '$routeParams', '$rootScope', 'ProjectCouch', '$cookieStore', 'viewGetter', 'ProjectCouch0', 'ProjectCouch1',
function($scope, $timeout, $location, $http, $routeParams, $rootScope, ProjectCouch, $cookieStore, viewGetter, ProjectCouch0, ProjectCouch1)
{
//$rootScope.continuee = []; 


$rootScope.answersDataBasic = []; 
$rootScope.user.answersBasic = []; 

$rootScope.answersDataAndroid = []; 
$rootScope.user.answersAndroid = []; 

$rootScope.answersDataSwift = []; 
$rootScope.user.answersSwift = []; 

$rootScope.answersDataWeb = []; 
$rootScope.user.answersWeb = []; 

$rootScope.answersDataPuzzle = []; 
$rootScope.user.answersPuzzle = []; 

$rootScope.user.scoreBasic = 0; 
$rootScope.user.scoreAndroid = 0; 
$rootScope.user.scoreSwift = 0; 
$rootScope.user.scoreWeb = 0; 
$rootScope.user.scorePuzzle = 0; 


//Asigning USER ID
$rootScope.user._id = $rootScope.user.name + " - " + Math.random() * 1000000000000000000;

$rootScope.questionnaires0 = [];

var i = 0;

$scope.lengthh = 0;


///////////////////////////////////////////databse get all.json and list questions
ProjectCouch.query(function(data) 
{
    $scope.basic = data;
	$rootScope.questionn = data;
    $rootScope.alllength = data.length;
    
	//console.log($rootScope.questionn[0].duration);

	if (i == 0)
	{
        $scope.questionn = data[0];
        $scope.lengthh = $scope.questionn.code.length;
        console.log($scope.lengthh);
    }

    $timeout($scope.init);

});





///////////////////////////////////////////Timer
$scope.init = function()
{
    $scope.counter = rootTime(i);
    $scope.stopped = false;

    $scope.onTimeout = function()
    {
    	if ($scope.counter != 0)
        	$scope.counter--;

        //Disable the checkboxes when the clock time is 00:00:00
        if ($scope.counter == 0)
        {
        	for (var c = 0; c < answersLength(i); c++)
        		document.getElementById("checkbox" + c).disabled = true;
        }

        mytimeout = $timeout($scope.onTimeout,1000);
    }

    var mytimeout = $timeout($scope.onTimeout,1000);
}





///////////////////////////////////////////PROGRESS BAR
function increaseProgressBar ()
{
    $(".progress-bar").animate(
    {
        width: progressbarCount + "%"
    }, 100);
}
//First function call
increaseProgressBar(); 



///////////////////////////////////////////Save data in the couchDB
function storeUser() 
{
    $cookieStore.put("USER", $rootScope.user);
    ProjectCouch1.save($rootScope.user, function(user) 
    {});  
}




///////////////////////////////////////////Get current question in the Json array
function root(i)
{
	return $rootScope.questionn[i];
}




///////////////////////////////////////////Get current possible question's answer length
function answersLength(i)
{
	return $rootScope.questionn[i].possibleAnswers.length;
}




///////////////////////////////////////////Get current correct question's answer length
function correctAnswersLength(i)
{
    return $rootScope.questionn[i].correctAnswers.length;
}




///////////////////////////////////////////Get current question's duration
function rootTime(i)
{
	return $rootScope.questionn[i].duration;
}


/*if (i < 31)
    $scope.showNext = true;
if (i == 31)
    $scope.showNext = false;*/


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


///////////////////////////////////////////Handling the arrow next onClick method
$scope.next = function()
{	

    if ($rootScope.questionn[i].type != "questionnaire")
    {
        progressbarCount = progressbarCount + 3.03;
        increaseProgressBar(); //increase the progress-bar's width  

        //Save the answers and the checkboxes values
        for (var ch = 0; ch < answersLength(i); ch++)
        {

            var ttt = document.getElementById("checkbox" + ch).checked == true ? true : false;

            if (ttt)
            {
                var inner = document.getElementById("answer" + ch).innerHTML;

                if ($rootScope.questionn[i].type == "basic")
                {
                    $rootScope.user.answersBasic.push(i+1 + " - " + inner);
                }
                if ($rootScope.questionn[i].type == "android")
                {
                    $rootScope.user.answersAndroid.push(i+1 + " - " + inner);
                }
                if ($rootScope.questionn[i].type == "swift")
                {
                    $rootScope.user.answersSwift.push(i+1 + " - " + inner);
                }
                if ($rootScope.questionn[i].type == "web")
                {
                    $rootScope.user.answersWeb.push(i+1 + " - " + inner);
                }
                if ($rootScope.questionn[i].type == "puzzle")
                {
                    $rootScope.user.answersPuzzle.push(i+1 + " - " + inner);
                }

                var questAnswers = $rootScope.questionn[i].correctAnswers;
        
                var val = questAnswers.indexOf(ch+1) != -1 ? "exist" : "no";

                if (val == "exist")
                {
                    if ($rootScope.questionn[i].type == "basic")
                        ++$rootScope.user.scoreBasic;
                    if ($rootScope.questionn[i].type == "android")
                        ++$rootScope.user.scoreAndroid;
                    if ($rootScope.questionn[i].type == "swift")
                        ++$rootScope.user.scoreSwift;
                    if ($rootScope.questionn[i].type == "web")
                        ++$rootScope.user.scoreWeb;
                    if ($rootScope.questionn[i].type == "puzzle")
                        ++$rootScope.user.scorePuzzle;
                }
            }//if   */
        
        }//for

        ++i;
        ++pageCounter;

        //Check the type of the question to add the new type on the progress bar
        if (i > 2)
        {

        /*if ($rootScope.questionn[i].type == "android")
        {
            var t = "&nbsp; -->&nbsp; Android Programming";
            var cur = document.getElementById("progressBar").innerHTML;
            if (cur.indexOf("Android Programming") == -1)
            {
                var currentInner = document.getElementById("progressBar").innerHTML + t;
                document.getElementById("progressBar").innerHTML = currentInner;
            }
        }
        else if ($rootScope.questionn[i].type == "swift")
        {
            var t = "&nbsp; -->&nbsp; IOS Programming";
            var cur = document.getElementById("progressBar").innerHTML;
            if (cur.indexOf("IOS Programming") == -1)
            {
                var currentInner = document.getElementById("progressBar").innerHTML + t;
                document.getElementById("progressBar").innerHTML = currentInner;
            }
        }
        else if ($rootScope.questionn[i].type == "web")
        {
            var t = "&nbsp; -->&nbsp; Web Programming";
            var cur = document.getElementById("progressBar").innerHTML;
            if (cur.indexOf("Web Programming") == -1)
            {
                var currentInner = document.getElementById("progressBar").innerHTML + t;
                document.getElementById("progressBar").innerHTML = currentInner;
            }
        }
        else if ($rootScope.questionn[i].type == "puzzle")
        {
            var t = "&nbsp; -->&nbsp; Puzzles";
            var cur = document.getElementById("progressBar").innerHTML;
            if (cur.indexOf("Puzzles") == -1)
            {
                var currentInner = document.getElementById("progressBar").innerHTML + t;
                document.getElementById("progressBar").innerHTML = currentInner;
            }
        }*/
        }

	   $scope.counter = rootTime(i);
	   $scope.questionn = root(pageCounter);
       $scope.lengthh = $scope.questionn.code.length;
       console.log($scope.lengthh);
	
    }

    if ($rootScope.questionn[i].type == "questionnaire")
    {
        //console.log("Basic: " + $rootScope.user.answersBasic);

        $rootScope.quest = i;
        //Putting Data in a cookie so they won't be lost on
        $cookieStore.put("index", i);
        $cookieStore.put("leftOver", $rootScope.alllength - i);


        for (var k = $rootScope.quest; k < $rootScope.questionn.length; k++)
        {
            if ($rootScope.questionn[k].type == "questionnaire")
            {
                $rootScope.questionnaires0.push($rootScope.questionn[k]);
            }
        }
        $cookieStore.put("questions", $rootScope.questionnaires0);

        storeUser(); //in the database

        /////Move to the questionnaire
        $location.path("/redirect");
    }

};

        
}]);














