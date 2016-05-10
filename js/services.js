// get the json file
app.factory('contentService', ['$http', function($http) {

    // get the external json data
    var Url = "data/info.json";
    var information = $http.get(Url).then(function(response) {
        return response.data;
    });

    return information;

}]);

// get the json file of the weather
app.factory('weatherService', ['$resource', function($resource) {
    // return $resource('api.openweathermap.org/data/2.5/weather?q=:cityname',{cityname: "@cityname"});
    var factory = {};

    factory.getWeather = function() {
        return $resource("http://api.wunderground.com/api/9eb7777065b59c55/conditions/q/CA/San_Francisco.json").get();
    }
    return factory;
}]);

// modal popup service
app.factory('modalService', ['$uibModal', function($uibModal) {
    return {
        openMenuModal: function(index, title, description, templateLink, array, size, voice, type) {
            var modalObj = $uibModal.open({
                templateUrl: templateLink,
                backdrop: 'static',
                keyboard: true,
                size: size,
                animation: true,
                controller: function($scope, $uibModalInstance) {
                    $scope.title = title;
                    $scope.description = description;
                    $scope.index = index;
                    $scope.array = array;
                    $scope.voice = voice;
                    $scope.type = type;

                    $scope.ok = function(id) {
                        //Process Close Button Click
                        $uibModalInstance.close();
                    }

                    $scope.delete = function() {
                        //Process Close Button Click
                        $uibModalInstance.close();

                        if ($scope.array) {

                            if ($scope.index != -1) {
                                $scope.array.splice($scope.index, 1);
                            } else {
                                console.log("Nothing to delete");
                            }
                        };
                    }

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }
            });
        }
    };
}]);


// load goto link function
app.factory('gotoService', ['$location', function($location) {
    return {
        getLink: function(url) {
            // console.log('the service', url);
            $location.url(url);
        }
    }
}]);


// returns the current time for the clock
app.factory('timeService', ['$location', function($location) {
    return {
        getHours: function() {
            var d = new Date();
            var hours = d.getHours();
            if (hours > 12) {
                hours = 24 - 12;
            } else if (hours < 12) {
                hours = hours + 12;
            }
            return hours;
        },
        getMinutes: function() {
            var d = new Date();
            var minutes = d.getMinutes();
            if (minutes < 10) {
                return '0' + minutes;
            } else {
                return minutes;
            }

        },
        getType: function(hours) {
            /* if(hours > 12){
               return 'PM';
             }else if(hours < 12 || hours == 12){
               return 'AM';
             }*/
            var types = hours >= 12 ? 'AM' : 'PM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return types;
        },
        getCurrentMonth: function(date) {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            // return the months
            var month = monthNames[date];
            return month;
        },
        getAllDays: function(month, year) {
            var num = new Date(year, month, 0).getDate();
            var days = [];

            // generate all days for month and put into days array
            for (var n = 0; n < num; n++) {
                days.push(n + 1);
            }
            return days;
        },
        getCurrentDay: function() {
            var monthNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var date = new Date();
            var getDayName = date.getDay();
            var Day = monthNames[getDayName];
            return Day;
        },
        year: function() {
            var date = new Date();
            var year = date.getFullYear();
            return year;
        }

    }

}]);

// get Index
app.factory('getIndex', function() {
    return {
        current: function(index) {
            console.log(index);
            return index;
        }
    }
});

// delete current item from array
app.factory('arrayService', function() {
    return {
        deleteCurrent: function(index, array) {
            var currentIndex = index;
            if (currentIndex != -1) {
                array.splice(currentIndex, 1);
            } else {
                console.log("nothing to delete");
            }
        },
        addTo: function(index, currentArray, newArray) {
            var currentIndex = index;
            if (currentIndex != -1) {
                newArray.push(currentArray.splice(currentIndex, 1));
            } else {
                console.log("nothing to add");
            }

        }
    }
});
