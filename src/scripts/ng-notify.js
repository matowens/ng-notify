/**
 * @license ng-notify v0.1.0
 * http://matowens.github.io/ng-notify
 * (c) 2014 MIT License, matowens.com
 */
(function() {
    'use strict';

    /**
     * @description
     *
     * This module provides any AngularJS application with a simple, lightweight
     * system for displaying notifications of varying degree to it's users. 
     *
     */
     var module = angular.module('ngNotify', []);

     module.provider('ngNotify', function() {

        this.$get = ['$document', '$compile', '$rootScope', '$timeout', '$interval', 

            function($document, $compile, $rootScope, $timeout, $interval) {

                var notifyTimeout;
                var notifyInterval;
                var options = {
                    theme: 'pure',
                    position: 'bottom',
                    duration: 3000,
                    defaultType: 'info',
                };

                var notifyScope = $rootScope.$new();
                var tpl = $compile('<div class="ng-notify" ng-class="ngNotify.notifyClass">{{ ngNotify.notifyMessage }}</div>')(notifyScope);

                $document.find('body').append(tpl);

                var notifyObject = {

                    config: function(params) {
                        params = params || {};
                        angular.extend(options, params);
                    },

                    set: function(message, type) {

                        if (!message) {
                            return;
                        }

                        $interval.cancel(notifyInterval);
                        $timeout.cancel(notifyTimeout);

                        // Check if we have a type provided (or set as default if not provided) 
                        // If it's valid, use it... otherwise use info.
                        var notifyClass = setClass(options.defaultType, type) + ' ' + 
                                          setTheme(options.theme) + ' ' +
                                          setPosition(options.position);
                        var duration = angular.isNumber(options.duration) ? options.duration : 3500;

                        notifyScope.ngNotify = {
                            notifyClass: notifyClass,
                            notifyMessage: message
                        };

                        var el = fadeLib(tpl);

                        el.fadeIn(200, function() {
                            notifyTimeout = $timeout(function() {
                                el.fadeOut(500, function() {
                                    notifyReset();
                                });
                            }, duration);
                        });
                    }
                };

                // Provider configurables...

                var setClass = function(defaultType, providedType) {

                    var classes = {
                        infoClass: 'ng-notify-info',
                        errorClass: 'ng-notify-error',
                        successClass: 'ng-notify-success',
                        warnClass: 'ng-notify-warn',
                        grimaceClass: 'ng-notify-grimace'
                    };

                    // Set to user provided type if available, otherwise try the default.
                    var type = (providedType || defaultType) + 'Class';

                    return classes[type] || classes.infoClass;
                };

                // TODO
                var addClass = function() {};

                var setTheme = function(theme) {

                    var themes = {
                        pure: '',
                        prime: 'ng-notify-prime',
                        pastel: 'ng-notify-pastel',
                        pitchy: 'ng-notify-pitchy'
                    };

                    return themes[theme] || '';
                };

                // TODO
                var addTheme = function() {};

                var setPosition = function(position) {

                    var positions = {
                        bottom: 'ng-notify-bottom',
                        top: 'ng-notify-top'
                    };

                    return positions[position] || positions.bottom;
                };

                // TODO
                var addPosition = function() {};

                // Provider helpers...

                var notifyReset = function() {
                    notifyScope.ngNotify = {
                        notifyClass: '',
                        notifyMessage: ''
                    };
                };

                // Pure JS fade functionality...

                var fadeLib = function(el) {
                    return new fadeLib.fn(el);
                };

                fadeLib.fn = function(el) {
                    this.el = el;
                };

                fadeLib.fn.prototype._fade = function(mode, opacity, duration, callback) {
                    var interval = 25;
                    var gap = interval / duration;
                    var el = this.el;

                    el.css('opacity', opacity);

                    var func = function() {
                        opacity = opacity + mode * gap;
                        el.css('opacity', opacity);

                        if(opacity <= 0 || opacity >= 1) {
                            $interval.cancel(notifyInterval);

                            if(opacity <= 0) {
                                el.oldDisplay = el.css('display');
                                el.css('display', 'none');
                            }

                            if(callback) { 
                                callback(); 
                            }
                        }
                    };

                    notifyInterval = $interval(func, interval);

                    return;
                };

                fadeLib.fn.prototype.fadeIn = function(duration, callback) {
                    this.el.css('display', this.el.oldDisplay);
                    return this._fade(1, 0, duration, callback);
                };

                fadeLib.fn.prototype.fadeOut = function(duration, callback) {
                    return this._fade(-1, 1, duration, callback);
                };

                return notifyObject;
            }
        ];
     });
})();
