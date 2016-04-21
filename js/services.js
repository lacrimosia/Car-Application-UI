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
app.factory('modalService',['$uibModal', function($uibModal){
	return {
      openMenuModal: function(index, title, description, templateLink, array, size) {
        var modalObj = $uibModal.open({
          templateUrl: templateLink,
          backdrop: 'static',
          keyboard: true,
          size: size,
          animation: true,
          controller: function($scope, $uibModalInstance){
            $scope.title = title;
            $scope.description = description;
            $scope.index = index;
            $scope.array = array;

            $scope.ok = function(id){
              //Process Close Button Click
              $uibModalInstance.close(); 
            }

            $scope.cancel = function(){
              $uibModalInstance.dismiss('cancel');
            }
           }
        });
      }
    };
}]);