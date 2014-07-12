var app = angular.module('demo', ['ngNotify']);

app.controller('MainCtrl', ['$scope', 'ngNotify', 
    function($scope, ngNotify) {
        'use strict';

        // Custom additons...

        /*

        ngNotify.addTheme('newtheme', 'my-new-class');

        ngNotify.config({
            theme: 'newtheme'
        });

        */

        // ---

        /*

        ngNotify.addType('notice', 'my-notice-type');

        ngNotify.set('This is my notice type!', 'notice');

        */
       
    ngNotify.set('The site will be down for maintenance tomorrow all day.', {
        position: 'top',
        sticky: true
    });       
        // Demo notifications...

        $scope.displayNotify = function(notify) {
            switch(notify) {
                case 'success':
                    ngNotify.set('You have successfully logged in!', {
                        type: 'success'
                    });
                    break;
                case 'info':
                    ngNotify.set('You have a new message in your inbox.', 'info');
                    break;
                case 'warn': 
                    ngNotify.set('Please login before accessing that part of the site.', 'warn');
                    break;
                case 'error':
                    ngNotify.set('The action you are trying to take does not exist.', 'error');
                    break;
                case 'grimace':
                    ngNotify.set('An additional notification type to use.', 'grimace');
                    break;
                default:
                    ngNotify.set('This is the current default message type.');
                    break;
            }
        };

        // Configuration options...

        $scope.theme = 'pure';
        $scope.themeOptions = ['pure', 'pastel', 'prime', 'pitchy'];

        $scope.duration = 4000;
        $scope.durationOptions = [
            { id: 500, value: '500 ms' }, 
            { id: 1000, value: '1000 ms' }, 
            { id: 2000, value: '2000 ms' }, 
            { id: 4000, value: '4000 ms' }, 
            { id: 8000 , value: '8000 ms'}
        ];

        $scope.position = 'bottom';
        $scope.positionOptions = ['bottom', 'top'];

        $scope.defaultType = 'info';
        $scope.defaultOptions = ['info', 'success', 'warn', 'error', 'grimace'];

        $scope.sticky = false;
        $scope.stickyOptions = [true, false];

        // Configuration actions...

        $scope.setDefaultType = function() {
            ngNotify.config({
                type: $scope.defaultType
            });
        };

        $scope.setDefaultPosition = function() {
            ngNotify.config({
                position: $scope.position
            });
        };

        $scope.setDefaultDuration = function() {
            ngNotify.config({
                duration: $scope.duration
            });
        };

        $scope.setDefaultTheme = function() {
            ngNotify.config({
                theme: $scope.theme
            });
        };

        $scope.setDefaultSticky = function() {
            ngNotify.config({
                sticky: $scope.sticky
            });
        };
    }
]);

/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-52145715-3', 'matowens.github.io');
ga('send', 'pageview');
/* jshint ignore:end */
