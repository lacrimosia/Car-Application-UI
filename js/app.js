var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/', {
      templateUrl: 'pages/apps.html', controller: 'test'
   }).

   otherwise({
      redirectTo: '/'
   });
	
}]);