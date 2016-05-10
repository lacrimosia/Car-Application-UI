app.directive('mainmenu', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/menu.html'
    };
});

app.directive('status', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/status-menu.html'
    };
});

app.directive('homeShortcuts', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/shortcuts.html'
    };
});

app.directive('userName', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/name.html'
    };
});

app.directive('appStore', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/store.html'
    };
});

app.directive('musicPlayer', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/music-player.html'
    };
});

// playlist widget on homepage for spotify
app.directive('spotifyWidget', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/playlist-widget.html'
    };
});

// weather main widget
app.directive('weather', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/weather.html',
        link: function($scope, element, attrs) {
            var addScript = angular.element(document.createElement('script'))
            addScript.attr({ src: 'http://oap.accuweather.com/launch.js' }) // set script when loading
            element.append(addScript)
        }
    };
});

// Weather report
app.directive('weatherReport', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/WeatherData.html',
        link: function($scope, element, attrs) {
            var addScript = angular.element(document.createElement('script'))
            addScript.attr({ src: 'http://oap.accuweather.com/launch.js' }) // set script when loading
            element.append(addScript)
        }
    };
});

// options dropdown
app.directive('options', function() {
    return {
        restrict: 'AEC',
        link: function($scope, element, attrs) {
            $(element).on("click", function(event) {
                // event.preventDefault();
                // alert("This is working");
            });
        }
    }
});

// car speed monitor
app.directive('speedMonitor', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/speed.html'
    };
});


// calendar component
app.directive('calendarWidget', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/calendar.html',
        link: function($scope, element, attrs) {}
    };
});

app.directive('realCalendar', function() {
    return {
        restrict: "E",
        templateUrl: "./partials/calendar-lg.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            // calendar
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            // select day and open dialog
            scope.select = function(day) {
                scope.selected = day.date;

            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month() + 1)).date(1);
                scope.month.month(scope.month.month() + 1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month() - 1).date(1));
                scope.month.month(scope.month.month() - 1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false,
            date = start.clone(),
            monthIndex = date.month(),
            count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});

// keyboard component
app.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function() {
                _element[0].focus();
            }, 0);
        }
    }
});

app.directive('acHeat', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/flow.html'
    }
});

app.directive('knob', function() {
    return {
        restrict: 'AEC',
        scope: {

        },
        templateUrl: './partials/knobs.html',
        link: function($scope, element, attrs) {
            // var interval = setInterval(increment, 200);
            var cool = 53;
            var heat = 0;
            var degrees = 0;
            $('#text-readout').html(cool + '&deg;');
            $('#text-readout-heat').html(heat + '&deg;');

            $('.ups').click(function() {
                coolIncrement();

                degrees-=10;
                $('.color-circle').css({
                    "-webkit-transform": "rotate("+degrees+"deg)",
                    "-moz-transform": "rotate("+degrees+"deg)",
                    "transform": "rotate("+degrees+"deg)" /* For modern browsers(CSS3)  */
                });
            });

            $('.ups-heat').click(function() {
                heatIncrement();
                degrees-=10;
                 $('.color-circle-heat').css({
                    "-webkit-transform": "rotate("+degrees+"deg)",
                    "-moz-transform": "rotate("+degrees+"deg)",
                    "transform": "rotate("+degrees+"deg)" /* For modern browsers(CSS3)  */
                });
            });

            $('.downs').click(function() {
                coolDecrement();
                 degrees+=10;
                $('.color-circle').css({
                    "-webkit-transform": "rotate("+degrees+"deg)",
                    "-moz-transform": "rotate("+degrees+"deg)",
                    "transform": "rotate("+degrees+"deg)" /* For modern browsers(CSS3)  */
                });
            });

            $('.downs-heat').click(function() {
                heatDecrement();
                 degrees+=10;
                $('.color-circle-heat').css({
                    "-webkit-transform": "rotate("+degrees+"deg)",
                    "-moz-transform": "rotate("+degrees+"deg)",
                    "transform": "rotate("+degrees+"deg)" /* For modern browsers(CSS3)  */
                });
            });

            function coolIncrement() {
                cool++;
                $('#text-readout').html(cool + '&deg;');
                if (cool == 80) { cool = 0; }
            }

            function coolDecrement() {
                $('#text-readout').html(cool + '&deg;');
                if (cool < 1) {
                    cool = 0;
                    return;
                } else {
                    cool--;
                }
            }

            function heatIncrement() {
                heat++;
                $('#text-readout-heat').html(heat + '&deg;');
                if (heat == 80) { heat = 0; }
            }

            function heatDecrement() {

                $('#text-readout-heat').html(heat + '&deg;');
                if (heat < 1) {
                    heat = 0;
                    return;
                } else {
                    heat--;
                }
            }
        }
    }
});

app.directive('drivingDirections', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/driving.html'
    };
});

app.directive('carSettings', function() {
    return {
        restrict: 'AEC',
        templateUrl: './partials/carsettings.html'
    };
});

app.directive('keyArea', function() {
    return {
        restrict: 'AE',
        templateUrl: './partials/keypad.html',
        scope:{
            number: "@",
            text: "@"
        },
        link: function(scope, element, attrs){
            scope.number = attrs.number;
            scope.text = attrs.text;
             
        }
    }
});
