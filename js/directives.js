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