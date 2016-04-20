'use strict';


app.controller('home', ['$scope', 'contentService', '$http', function($scope, contentService, $http){

    contentService.then(function(data){
        $scope.data = data;
    	$scope.shortcutList = $scope.data.shortcuts;
    });

}]);

app.controller('apps', ['scope', '$http', function($scope, $http){

}]);
