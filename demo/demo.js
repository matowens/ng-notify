var app = angular.module('demo', ['ngNotify']);

app.controller('MainCtrl', ['$scope', 'ngNotify',
    function($scope, ngNotify) {
        'use strict';

        // Custom additions, helpful when testing...
        /*

        ngNotify.config({
            theme: 'pastel',
            position: 'top',
            duration: 'f',
            type: 'success',
            sticky: true,
            html: true,
            target: '#modular'
        });

        ngNotify.addTheme('newTheme', 'my-new-class');

        ngNotify.config({
            theme: 'newTheme'
        });

        */

        // ---

        /*

        ngNotify.addType('notice', 'my-notice-type');

        ngNotify.set('This is my notice type!', 'notice');

        */

        var userCallback = function() {
            console.log('Callback triggered after message fades.');
        };

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
                case 'html':
                    ngNotify.set('&iexcl;<i>You</i> should &copy;heck to make sure the <b>html</b> option is set to true!');
                    break;
                case 'modular':
                    ngNotify.set('Modular notification example, bound within our container.', {
                        target: '#modular'
                    }, userCallback);
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

        $scope.button = true;
        $scope.buttonOptions = [true, false];

        $scope.html = false;
        $scope.htmlOptions = [true, false];

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

        $scope.setDefaultButton = function() {
            ngNotify.config({
                button: $scope.button
            });
        };

        $scope.setDefaultHtml = function() {
            ngNotify.config({
                html: $scope.html
            });
        };

        $scope.dismissNotify = function() {
            ngNotify.dismiss();
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
