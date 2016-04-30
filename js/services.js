// get the json file
app.factory('contentService',['$http', function($http){

	// get the external json data
	var Url  = "data/info.json";
    var information = $http.get(Url).then(function(response){
        return response.data;
    });

    return information; 

}]);

// get the json file of the weather
app.factory('weatherService',['$resource', function($resource){
  // return $resource('api.openweathermap.org/data/2.5/weather?q=:cityname',{cityname: "@cityname"});
  var factory={};

     factory.getWeather = function(){
         return $resource("http://api.wunderground.com/api/9eb7777065b59c55/conditions/q/CA/San_Francisco.json").get();
     }
    return factory;
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


// load goto link function
app.factory('gotoService', ['$location', function($location){
  return{
    getLink: function(url){
     // console.log('the service', url);
        $location.url(url);
    }
  }
}]);
