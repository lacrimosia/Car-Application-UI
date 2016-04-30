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
    'gotoService', function($scope, $http, contentService, gotoService){
 contentService.then(function(data){
        $scope.data = data;   // access all data
        $scope.data = data;   // access all data
        $scope.appsList = $scope.data.appsList;  // list of shortcuts


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
    'gotoService', function($scope, $http, gotoService){
    $scope.date = new Date();  // date()
    $scope.calendarDay = $scope.date.getDate(); // get the day of the month

    // get and return the month
    $scope.getCurrentMonth = function(){

    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
       // return the months
        $scope.month = monthNames[$scope.date.getMonth()];
        return $scope.month;
    };

   // go to a link
    $scope.goTo = function(url){
        gotoService.getLink(url);
   }
}]);
