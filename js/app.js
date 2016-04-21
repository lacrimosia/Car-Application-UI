var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
   $routeProvider.
   
   when('/', {
      templateUrl: 'pages/home.html', controller: 'home'
   }).

   when('/apps', {
      templateUrl: 'pages/apps.html', controller: 'apps'
   }).

   when('/mail', {
      templateUrl: 'pages/mail.html', controller: 'mail'
   }).

   when('/phone', {
      templateUrl: 'pages/phone.html', controller: 'phone'
   }).


   when('/apps/store', {
      templateUrl: 'partials/store.html', controller: 'store'
   }).

   when('/apps/music-player', {
      templateUrl: 'partials/music-player.html', controller: 'musicPlayer'
   }).

   when('/apps/weather', {
      templateUrl: 'partials/weather.html', controller: 'weather'
   }).

   otherwise({
      redirectTo: '/'
   });
	
}]);