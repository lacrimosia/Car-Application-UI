'use strict';

// home page controller
app.controller('home', [
	'$scope', 
	'contentService', 
	'$http',
	'$uibModal',
	'modalService', 
	'$location',
	'$routeParams',
	'$route',
	'$window',
    'gotoService', function($scope, contentService, $http, $uibModal, modalService, $location, $routeParams, $route, $window, gotoService){

    contentService.then(function(data){
        $scope.data = data;   // access all data
    	$scope.shortcutList = $scope.data.shortcuts;  // list of shortcuts
    	$scope.name = $scope.data.user;               // user's name
    	$scope.userThumb = $scope.data.userThumb;     // user thumbnail image
    	$scope.deleted = false;         // Checks if shortcut is deleted
    	$scope.backup = [];             // when deleted, goes here in case of undo or reset

    	// change url to links
    	$scope.goTo= function(url){
            gotoService.getLink(url);
    	}

    	//$scope.reload();
    	// remove desktop shortcut on click
    	$scope.deleteBox = function(index, title, description, templateLink, array, size){
    		$scope.selected = index;
    		if($scope.selected != -1){
    			$scope.shortcutList.splice($scope.selected, 1);
    			 modalService.openMenuModal(index, title, description, templateLink, array, size);
    			//$scope.backup.push($scope.shortcutList[$scope.selected]);
    			//console.log($scope.backup);
    		}else{
    			console.log("Nothing to delete");
    		}
    		
    	};
    });

}]);

// applications controller
app.controller('apps', [
    '$scope', 
    '$http', 
    'contentService',
    'gotoService',
    'getIndex', 
    '$routeParams', 
    '$sce', function($scope, $http, contentService, gotoService, getIndex, $routeParams, $sce){
 contentService.then(function(data){
        $scope.data = data;   // access all data
        $scope.data = data;   // access all data
        $scope.appsList = $scope.data.appsList;  // list of shortcuts

        // change url to links
        $scope.goTo= function(url){
            gotoService.getLink(url);
        }

        // get index
        $scope.getIndex = function(index){
            getIndex.current(index);
        }

        // embed in iframe
        $scope.link = function(){
            $scope.indexRoute = $routeParams.index;
           return $sce.trustAsResourceUrl($scope.appsList[$scope.indexRoute].url);
        }

        $scope.system == false;
    });

}]);

// phone controller
app.controller('phone', ['$scope', '$http', function($scope, $http){

}]);

// mail controller
app.controller('mail', ['$scope', '$http', function($scope, $http){

}]);

// store controller
app.controller('store', [
    '$scope', 
    '$http',
    'gotoService', function($scope, $http, gotoService){

}]);

// music player controller
app.controller('musicPlayer', ['$scope', '$http', function($scope, $http){

}]);


//weather
app.controller('weather', [
	'$scope', 
	'$http',
	'weatherService',
	'$location',
    'gotoService', function($scope, $http, weatherService, $location, gotoService){
// $scope.weather = weatherService.get({cityname: 'Las Vegas'});
// $scope.weather = weatherService.getWeather();
   $scope.goTo = function(url){
   	    gotoService.getLink(url);
   }
}]);

//weather Report
app.controller('weather', [
	'$scope', 
	'$http',
	'weatherService',
	'$location', function($scope, $http, weatherService, $location){

}]);


// calendar controller
app.controller('calendar', [
    '$scope', 
    '$http',
    'gotoService',
    'timeService', function($scope, $http, gotoService, timeService){
   $scope.date = new Date();  // date()
    $scope.calendarDay = $scope.date.getDate(); // get the day of the month

    // get and return the month
    $scope.currentMonth = timeService.getCurrentMonth($scope.date.getMonth());

   // go to a link
    $scope.goTo = function(url){
        gotoService.getLink(url);
   }

   // get all the days of the month from the array
   // days[]
   $scope.getAllDays = timeService.getAllDays($scope.calendarDay, 2016);

   // get the current day of the month  
   $scope.getDays = timeService.getCurrentDay();

   // get the year
   $scope.getYear = timeService.year();

   // moment
   $scope.day = moment();
}]);


// Time Clock
app.controller('systemTime', [
    '$scope', 
    '$http',
    'gotoService',
    'timeService', function($scope, $http, gotoService, timeService){
        $scope.hours = timeService.getHours();  // show the hours
        $scope.minutes = timeService.getMinutes(); // show the minutes
        $scope.getType = timeService.getType($scope.hours); // am or pm
}]);

// phone controller
app.controller('phone', [
  '$scope', 
  '$http',
  'contentService', function($scope, $http, contentService){
  contentService.then(function(data){
    $scope.data = data;   // access all data
        $scope.phoneTabs = $scope.data.phonetabs;  // list of shortcuts
        $scope.contacts = $scope.data.contacts;  // list of contacts
  });
}]);