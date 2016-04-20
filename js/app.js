var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/', {
      templateUrl: 'pages/home.html', controller: 'home'
   }).

   when('/apps', {
      templateUrl: 'pages/apps.html', controller: 'apps'
   }).

   otherwise({
      redirectTo: '/'
   });
	
}]);