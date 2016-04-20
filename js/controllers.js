'use strict';


app.controller('home', [
	'$scope', 
	'contentService', 
	'$http', function($scope, contentService, $http){

    contentService.then(function(data){
        $scope.data = data;   // access all data
    	$scope.shortcutList = $scope.data.shortcuts;  // list of shortcuts
    	$scope.name = $scope.data.user;               // user's name
    	$scope.userThumb = $scope.data.userThumb;     // user thumbnail image
    	$scope.deleted = false;         // Checks if shortcut is deleted

    	// remove desktop shortcut on click
    	$scope.deleteBox = function(index){
    		$scope.selected = index;
    		// modalService.openMenuModal('t', title, description);
    		$scope.shortcutList.splice($scope.selected, 1);
    	};
    });

}]);

app.controller('apps', ['scope', '$http', function($scope, $http){

}]);
