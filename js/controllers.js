'use strict';

// home page controller
app.controller('home', [
	'$scope', 
	'contentService', 
	'$http',
	'$uibModal',
	'modalService', 
	'$location', function($scope, contentService, $http, $uibModal, modalService, $location){

    contentService.then(function(data){
        $scope.data = data;   // access all data
    	$scope.shortcutList = $scope.data.shortcuts;  // list of shortcuts
    	$scope.name = $scope.data.user;               // user's name
    	$scope.userThumb = $scope.data.userThumb;     // user thumbnail image
    	$scope.deleted = false;         // Checks if shortcut is deleted
    	$scope.backup = [];             // when deleted, goes here in case of undo or reset

    	// change url to links
    	$scope.goTo= function(url){
    		console.log(url);
    		$location.url(url);
    	}

    	// remove desktop shortcut on click
    	$scope.deleteBox = function(index, title, description, templateLink, array, size){
    		$scope.selected = index;
    		if($scope.selected != -1){
    			$scope.shortcutList.splice($scope.selected, 1);
    			 modalService.openMenuModal(null, title, description, templateLink, array, size);
    			//$scope.backup.push($scope.shortcutList[$scope.selected]);
    			//console.log($scope.backup);
    		}else{
    			console.log("Nothing to delete");
    		}
    		
    	};
    });

}]);

// applications controller
app.controller('apps', ['$scope', '$http', 'contentService', function($scope, $http, contentService){
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
app.controller('store', ['$scope', '$http', function($scope, $http){

}]);

// music player controller
app.controller('musicPlayer', ['$scope', '$http', function($scope, $http){

}]);

//weather
// music player controller
app.controller('weather', ['$scope', '$http','weatherService', function($scope, $http, weatherService){

// $scope.weather = weatherService.get({cityname: 'Las Vegas'});
$scope.weather = weatherService.getWeather().get();

}]);
