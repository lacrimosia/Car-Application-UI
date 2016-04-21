app.directive('mainmenu', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/menu.html'
	};
});

app.directive('status', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/status-menu.html'
	};
});

app.directive('homeShortcuts', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/shortcuts.html'
	};
});

app.directive('userName', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/name.html'
	};
});

app.directive('appStore', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/store.html'
	};
});

app.directive('musicPlayer', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/music-player.html'
	};
});

app.directive('weather', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/weather.html'
	};
});