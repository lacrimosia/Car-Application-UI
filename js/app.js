var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
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