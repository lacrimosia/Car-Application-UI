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
    	$scope.backup = [];             // when deleted, goes here in case of undo or reset

    	// remove desktop shortcut on click
    	$scope.deleteBox = function(index){
    		$scope.selected = index;
    		// modalService.openMenuModal('t', title, description);
    		if($scope.selected != -1){
    			$scope.shortcutList.splice($scope.selected, 1);
    			$scope.backup.push($scope.shortcutList[$scope.selected]);
    			console.log($scope.backup);
    		}else{
    			console.log("Nothing to delete");
    		}
    		
    	};
    });

}]);

app.controller('apps', ['$scope', '$http', function($scope, $http){

}]);
