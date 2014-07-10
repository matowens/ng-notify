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

                // Defaults...

                var notifyTimeout;
                var notifyInterval;
                var options = {
                    theme: 'pure',
                    position: 'bottom',
                    duration: 3000,
                    type: 'info'
                };

                var themes = {
                    pure: '',
                    prime: 'ngn-prime',
                    pastel: 'ngn-pastel',
                    pitchy: 'ngn-pitchy'
                };

                var types = {
                    infoClass: 'ngn-info',
                    errorClass: 'ngn-error',
                    successClass: 'ngn-success',
                    warnClass: 'ngn-warn',
                    grimaceClass: 'ngn-grimace'
                };

                var positions = {
                    bottom: 'ngn-bottom',
                    top: 'ngn-top'
                };

                // Create our own scope and element, add to app.
                var notifyScope = $rootScope.$new();
                var tpl = $compile('<div class="ngn" ng-class="ngNotify.notifyClass">{{ ngNotify.notifyMessage }}</div>')(notifyScope);

                $document.find('body').append(tpl);

                var notifyObject = {

                    // Allow user to customize params.
                    config: function(params) {
                        params = params || {};
                        angular.extend(options, params);
                    },

                    // Set up and trigger our notification.
                    set: function(message, type) {

                        if (!message) {
                            return;
                        }

                        // Kill off any currently running notifications if we trigger another before it completes.
                        $interval.cancel(notifyInterval);
                        $timeout.cancel(notifyTimeout);

                        // Set our notification options.
                        var notifyClass = setType(options.type, type) + ' ' + 
                                          setTheme(options.theme) + ' ' +
                                          setPosition(options.position);
                        var duration = angular.isNumber(options.duration) ? options.duration : 3500;

                        notifyScope.ngNotify = {
                            notifyClass: notifyClass,
                            notifyMessage: message
                        };

                        // Add our fade prototype to our element.
                        var el = fadeLib(tpl);

                        // Fade functionality for notifications.
                        el.fadeIn(200, function() {
                            notifyTimeout = $timeout(function() {
                                el.fadeOut(500, function() {
                                    notifyReset();
                                });
                            }, duration);
                        });
                    },

                    // User customizations...

                    addTheme: function(id, name) {
                        if(!id || !name) { return; }
                        themes[id] = name;
                    },

                    addType: function(id, name) {
                        if(!id || !name) { return; }
                        types[id + 'Class'] = name;
                    }

                };

                // Provider configurables...

                var setType = function(defaultType, providedType) {
                    var type = (providedType || defaultType) + 'Class';
                    return types[type] || types.infoClass;
                };

                var setTheme = function(theme) {
                    return themes[theme] || '';
                };

                var setPosition = function(position) {
                    return positions[position] || positions.bottom;
                };

                // Provider helpers...

                var notifyReset = function() {
                    notifyScope.ngNotify = {
                        notifyClass: '',
                        notifyMessage: ''
                    };
                };

                // Pure JS fade functionality, support for IE8 included...

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

                        el.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')'); // IE8
                        el.css('opacity', opacity);

                        if(opacity <= 0 || opacity >= 1) {
                            $interval.cancel(notifyInterval);

                            if(opacity <= 0) {
                                el.css('display', 'none');
                            }

                            if(callback) { 
                                callback(); 
                            }
                        }
                    };

                    notifyInterval = $interval(func, interval);
                };

                fadeLib.fn.prototype.fadeIn = function(duration, callback) {
                    this.el.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)');
                    this.el.css('display', 'block');
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
