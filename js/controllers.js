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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

            // change url to links
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            }

            //$scope.reload();
            // remove desktop shortcut on click
            $scope.deleteBox = function(index, title, description, templateLink, array, size, voice, type) {
                modalService.openMenuModal(index, title, description, templateLink, array, size, voice, type);
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
    'modalService',
    function($scope, $http, contentService, gotoService, getIndex, $routeParams, $sce, modalService) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.data = data; // access all data
            $scope.appsList = $scope.data.appsList; // list of apps
            $scope.shortcutList = $scope.data.shortcuts; // list of shortcuts
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

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

            $scope.addBox = function(index, title, description, templateLink, array, size, voice, type, link) {
                modalService.openMenuModal(index, title, description, templateLink, array, size, voice, type, link);
            };

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
    'getIndex',
    function($scope, $http, contentService, arrayService, ngAudio, gotoService, $routeParams, getIndex) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.inbox = $scope.data.inbox; // list of shortcuts
            $scope.contacts = $scope.data.contacts; // list of contacts
            $scope.mailsTabs = $scope.data.mailtabs; // mail tabs
            $scope.message = 0;
            $scope.show = false;
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };

            // change url to links
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            };

            $scope.getIndex = function(index) {
                $scope.message = getIndex.current(index);
                return $scope.message;
            };


        });
    }
]);

// store controller
app.controller('store', [
    '$scope',
    '$http',
    'contentService',
    'gotoService',
    'getIndex',
    '$routeParams',
    '$sce',
    'modalService',
    function($scope, $http, contentService, gotoService, getIndex, $routeParams, $sce, modalService) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.data = data; // access all data
            $scope.appsList = $scope.data.appsList; // list of apps
            $scope.shortcutList = $scope.data.shortcuts; // list of shortcuts
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

            // change url to links
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            }

            $scope.addBox = function(index, title, description, templateLink, array, size, voice, type, link) {
                modalService.openMenuModal(index, title, description, templateLink, array, size, voice, type, link);
            };

            $scope.system == false;
        });

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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

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
        $scope.voice = responsiveVoice;
        $scope.voice.setDefaultVoice("US English Female");
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

        $scope.voice = responsiveVoice;
        $scope.voice.setDefaultVoice("US English Female");
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
        $scope.voice = responsiveVoice;
        $scope.voice.setDefaultVoice("US English Female");

        // go to a link
        $scope.goTo = function(url) {
            gotoService.getLink(url);
        }
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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");
            $scope.phone = $scope.data.phonePad; // key numbers
            $scope.voicemail = $scope.data.voiceMail; // voicemail
            $scope.number;

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };

            $scope.getNum = function(number){
              $scope.number = number;
              console.log(number);
              return $scope.number;
            };


        });
    }
]);

// browser controller
app.controller('browser', [
    '$scope',
    '$http',
    'contentService',
    'arrayService',
    'ngAudio',
    '$sce',
    function($scope, $http, contentService, arrayService, ngAudio, $sce) {
        contentService.then(function(data) {
            $scope.data = data; // access all data
            $scope.phoneTabs = $scope.data.phonetabs; // list of shortcuts
            $scope.contacts = $scope.data.contacts; // list of contacts
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");
            $scope.phone = $scope.data.phonePad; // key numbers
            $scope.voicemail = $scope.data.voiceMail; // voicemail
            $scope.links = $sce.trustAsResourceUrl("http://www.dell.com/");

            // delete current item
            $scope.deleteFavorites = function(index, array) {
                arrayService.deleteCurrent(index, array);
            };

            $scope.go = function(){
              $scope.links = $sce.trustAsResourceUrl("http://www.yelp.com/");
                return $scope.links;
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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

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


// menu controller
app.controller('mainMenu', [
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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

        });
    }
]);

// ac heat controls
app.controller('controls', [
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
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

            // go to a link
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            };

        });
    }
]);


// ac heat controls
app.controller('gps', [
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
            $scope.driving = $scope.data.directionsList; // list of contacts
            $scope.voice = responsiveVoice;
            $scope.voice.setDefaultVoice("US English Female");

            // go to a link
            $scope.goTo = function(url) {
                gotoService.getLink(url);
            };

        });
    }
]);
