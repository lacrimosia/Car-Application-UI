var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngResource', 'angular-virtual-keyboard', 'ngAudio']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
   $routeProvider.
   
   when('/', {
      templateUrl: 'pages/home.html', controller: 'home'
   }).

   when('/apps', {
      templateUrl: 'pages/apps.html', controller: 'apps'
   }).

   when('/apps/mail', {
      templateUrl: 'pages/mail.html', controller: 'mail'
   }).

   when('/mail/message/:index', {
      templateUrl: 'partials/message.html', controller: 'mail'
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

   when('/apps/weatherReport', {
      templateUrl: 'pages/weatherReport.html'
   }).

   when('/apps/calendar', {
      templateUrl: 'pages/calendar.html'
   }).

   when('/apps/:name/:index', {
      templateUrl: 'pages/frame.html'
   }).

   when('/settings', {
      templateUrl: 'pages/settings.html'
   }).

   otherwise({
      redirectTo: '/404', templateUrl: 'partials/404.html'
   });
	
}]);