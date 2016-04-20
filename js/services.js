app.factory('contentService',['$http', function($http){
	var Url  = "data/info.json";
    var information = $http.get(Url).then(function(response){
        return response.data;
    });

    return information; 
}]);