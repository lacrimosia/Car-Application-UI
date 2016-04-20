// get the json file
app.factory('contentService',['$http', function($http){
	// get the external json data
	var Url  = "data/info.json";
    var information = $http.get(Url).then(function(response){
        return response.data;
    });
    return information; 
}]);

// modal popup service
/*app.factory('modalService',['$uibModal', function($uibModal){
	return {
      openMenuModal: function(index, title, description) {
        var modalObj = $uibModal.open({
          templateUrl: 'partials/modal.html',
          backdrop: 'static',
          keyboard: true,
          size: 'sm',
          controller: function($scope, $modalInstance){
            $scope.title = title;
            $scope.description = description;

            $scope.ok = function(id){
              //Process Close Button Click
              $modalInstance.close(); 
            }
            $scope.cancel = function(){
              $modalInstance.dismiss('cancel');
            }
           }
        });
      }
    };
}]);*/