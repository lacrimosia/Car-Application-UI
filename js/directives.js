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

// playlist widget on homepage for spotify
app.directive('spotifyWidget', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/playlist-widget.html'
	};
});

// weather main widget
app.directive('weather', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/weather.html',
		link: function($scope, element, attrs){
			var addScript = angular.element(document.createElement('script'))
                        addScript.attr({src:'http://oap.accuweather.com/launch.js'}) // set script when loading
                        element.append(addScript)
		}
	};
});

// Weather report
app.directive('weatherReport', function(){
	return{
		restrict: 'AEC',
		templateUrl: './partials/WeatherData.html',
		link: function($scope, element, attrs){
			var addScript = angular.element(document.createElement('script'))
                        addScript.attr({src:'http://oap.accuweather.com/launch.js'}) // set script when loading
                        element.append(addScript)
		}
	};
});
