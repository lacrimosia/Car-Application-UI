'use strict';

// home page controller
app.controller('home', [
    '$scope',
    'contentService',
    '$http',
    '$uibModal',
    'modalService',
    '$location',
    '$routeParams',
    '$route',
    '$window',
    'gotoService',
    function($scope, contentService, $http, $uibModal, modalService, $location, $routeParams, $route, $window, gotoService) {

        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.shortcutList = $scope.data.shortcuts; // list of shortcuts
            $scope.name = $scope.data.user; // user's name
            $scope.userThumb = $scope.data.userThumb; // user thumbnail image
            $scope.deleted = false; // Checks if shortcut is deleted
            $scope.backup = []; // when deleted, goes here in case of undo or reset

            // change url to links
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            }

            //$scope.reload();
            // remove desktop shortcut on click
            $scope.deleteBox = function(index, title, description, templateLink, array, size) {
                $scope.selected = index;
                if ($scope.selected != -1) {
                    $scope.shortcutList.splice($scope.selected, 1);
                    modalService.openMenuModal(index, title, description, templateLink, array, size);
                    //$scope.backup.push($scope.shortcutList[$scope.selected]);
                    //console.log($scope.backup);
                } else {
                    console.log("Nothing to delete");
                }

            };
        });

    }
]);

// applications controller
app.controller('apps', [
    '$scope',
    '$http',
    'contentService',
    'gotoService',
    'getIndex',
    '$routeParams',
    '$sce',
    function($scope, $http, contentService, gotoService, getIndex, $routeParams, $sce) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.data = data; // access all data
            $scope.appsList = $scope.data.appsList; // list of shortcuts

            // change url to links
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            }

            // get index
            $scope.getIndex = function(index) {
                getIndex.current(index);
            }

            // embed in iframe
            $scope.link = function() {
                $scope.indexRoute = $routeParams.index;
                return $sce.trustAsResourceUrl($scope.appsList[$scope.indexRoute].url);
            }

            $scope.system == false;
        });

    }
]);

// mail controller
// phone controller
app.controller('mail', [
    '$scope',
    '$http',
    'contentService',
    'arrayService',
    'ngAudio',
    'gotoService',
    '$routeParams',
    function($scope, $http, contentService, arrayService, ngAudio, gotoService, $routeParams) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.inbox = $scope.data.inbox; // list of shortcuts
            $scope.contacts = $scope.data.contacts; // list of contacts
            $scope.mailsTabs = $scope.data.mailtabs; // mail tabs
            $scope.message = 0;
            $scope.show = false;

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };

            // change url to links
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            };

            $scope.getIndex = function(index) {
                $scope.message = index;
                return $scope.message;
            };


        });
    }
]);

// store controller
app.controller('store', [
    '$scope',
    '$http',
    'gotoService',
    function($scope, $http, gotoService) {

    }
]);

// music player controller
app.controller('musicPlayer', [
    '$scope',
    '$http',
    'contentService',
    'arrayService',
    'ngAudio',
    function($scope, $http, contentService, arrayService, ngAudio) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.musicList = $scope.data.musicplaylist;
            $scope.musicTabs = $scope.data.musictabs;
            $scope.Song = 0;
            $scope.playing = false;

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };

            // audio settings 
            $scope.audio = {
                loadAudio: function(song) {
                    $scope.song = ngAudio.load(song);
                    $scope.song.play();
                },
                stopAudio: function(song) {
                    $scope.song.stop();
                },
                pauseAudio: function(song) {
                    $scope.song.pause();
                },
                nextTrack: function(song) {
                    if ($scope.Song >= $scope.musicList.length - 1) {
                        // auto restart if $scope.Song=0;
                        $scope.Song = $scope.musicList.length - 1;
                    } else {
                        $scope.Song++;
                    }
                },
                prevTrack: function() {
                    if ($scope.Song === 0) {
                        $scope.Song = 0;
                    } else {
                        $scope.Song--;
                    }

                },
                playSelectedTrack: function(index) {
                    $scope.Song = index;
                    return $scope.Song;
                }
            };


        });
    }
]);


//weather
app.controller('weather', [
    '$scope',
    '$http',
    'weatherService',
    '$location',
    'gotoService',
    function($scope, $http, weatherService, $location, gotoService) {
        // $scope.weather = weatherService.get({cityname: 'Las Vegas'});
        // $scope.weather = weatherService.getWeather();
        $scope.goTo = function(url) {
            gotoService.getLink(url);
        }
    }
]);


// calendar controller
app.controller('calendar', [
    '$scope',
    '$http',
    'gotoService',
    'timeService',
    function($scope, $http, gotoService, timeService) {
        $scope.date = new Date(); // date()
        $scope.calendarDay = $scope.date.getDate(); // get the day of the month

        // get and return the month
        $scope.currentMonth = timeService.getCurrentMonth($scope.date.getMonth());

        // go to a link
        $scope.goTo = function(url) {
            gotoService.getLink(url);
        }

        // get all the days of the month from the array
        // days[]
        $scope.getAllDays = timeService.getAllDays($scope.calendarDay, 2016);

        // get the current day of the month  
        $scope.getDays = timeService.getCurrentDay();

        // get the year
        $scope.getYear = timeService.year();

        // moment
        $scope.day = moment();
    }
]);


// Time Clock
app.controller('systemTime', [
    '$scope',
    '$http',
    'gotoService',
    'timeService',
    function($scope, $http, gotoService, timeService) {
        $scope.hours = timeService.getHours(); // show the hours
        $scope.minutes = timeService.getMinutes(); // show the minutes
        $scope.getType = timeService.getType($scope.hours); // am or pm
    }
]);

// phone controller
app.controller('phone', [
    '$scope',
    '$http',
    'contentService',
    'arrayService',
    'ngAudio',
    function($scope, $http, contentService, arrayService, ngAudio) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.phoneTabs = $scope.data.phonetabs; // list of shortcuts
            $scope.contacts = $scope.data.contacts; // list of contacts

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };


        });
    }
]);

// phone controller
app.controller('driving', [
    '$scope',
    '$http',
    'contentService',
    'arrayService',
    'ngAudio',
    function($scope, $http, contentService, arrayService, ngAudio) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.phoneTabs = $scope.data.phonetabs; // list of shortcuts
            $scope.contacts = $scope.data.contacts; // list of contacts
            $scope.driving = $scope.data.directionsList; // list of contacts

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };


        });
    }
]);

// phone controller
app.controller('settings', [
    '$scope',
    '$http',
    'contentService',
    'arrayService',
    'ngAudio',
    'gotoService',
    function($scope, $http, contentService, arrayService, ngAudio, gotoService) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.phoneTabs = $scope.data.phonetabs; // list of shortcuts
            $scope.contacts = $scope.data.contacts; // list of contacts
            $scope.settingToggle = $scope.data.toggleList; // list of toggles for short home
            $scope.performance = "red !important";
            $scope.vehicle = "yellow !important";
            $scope.security = "#05958A !important";

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };

            // go to a link
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            }

        });
    }
]);
