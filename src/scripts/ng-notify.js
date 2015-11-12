/**
 * @license ng-notify v0.6.2
 * http://matowens.github.io/ng-notify
 * (c) 2014 MIT License, MatOwens.com
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

    /**
     * Check to see if the ngSanitize script has been included by the user.
     * If so, pull it in and allow for it to be used when user has specified.
     */
    var hasSanitize = false;

    try {

        /* istanbul ignore else  */
        if (angular.module('ngSanitize')) {

            // Note on the requires array from module() source code:
            // Holds the list of modules which the injector will load before the current module is loaded.

            // A sort of lazy load for our dependency on ngSanitize, only if the module exists.
            angular.module('ngNotify').requires.push('ngSanitize');

            hasSanitize = true;
        }

    } catch (err) {
        // Ignore error, we'll disable any sanitize related functionality...
    }

    // Generate ngNotify template and add it to cache...

    var html =
        '<div class="ngn" ng-class="ngNotify.notifyClass" ng-style="ngNotify.notifyStyle">' +
            '<span ng-show="ngNotify.notifyButton" class="ngn-dismiss" ng-click="dismiss()">&times;</span>' +
            '<span ng-if="ngNotify.notifyHtml" ng-bind-html="ngNotify.notifyMessage"></span>' + // Display HTML notifications.
            '<span ng-if="!ngNotify.notifyHtml" ng-bind="ngNotify.notifyMessage"></span>' + // Display escaped notifications.
        '</div>';

    module.run(['$templateCache',

        function($templateCache) {

            $templateCache.put('templates/ng-notify/ng-notify.html', html);
        }
    ]);

    module.provider('ngNotify', function() {

        this.$get = ['$document', '$compile', '$log', '$rootScope', '$timeout', '$interval', '$templateCache',

            function($document, $compile, $log, $rootScope, $timeout, $interval, $templateCache) {

                // Constants...

                var EMPTY = '';
                var SPACER = ' ';
                var DEFAULT_DURATION = 3000;
                var STICKY_CLASS = 'ngn-sticky';

                var FADE_IN_MODE = 1;
                var FADE_OUT_MODE = -1;
                var FADE_IN_DURATION = 200;
                var FADE_OUT_DURATION = 500;
                var FADE_INTERVAL = 25;

                var OPACITY_MIN = 0;
                var OPACITY_MAX = 1;

                // Defaults...

                var defaultOptions = {
                    theme: 'pure',
                    position: 'bottom',
                    duration: DEFAULT_DURATION,
                    type: 'info',
                    sticky: false,
                    button: true,
                    html: false
                };

                var defaultScope = {
                    notifyClass: '',
                    notifyMessage: '',
                    notifyStyle: {
                        display: 'none',
                        opacity: OPACITY_MIN
                    }
                };

                // Options...

                var themes = {
                    pure: EMPTY,
                    prime: 'ngn-prime',
                    pastel: 'ngn-pastel',
                    pitchy: 'ngn-pitchy'
                };

                var types = {
                    info: 'ngn-info',
                    error: 'ngn-error',
                    success: 'ngn-success',
                    warn: 'ngn-warn',
                    grimace: 'ngn-grimace'
                };

                var positions = {
                    bottom: 'ngn-bottom',
                    top: 'ngn-top'
                };

                // Fade params...

                var notifyTimeout;
                var notifyInterval;

                // Template and scope...

                var notifyScope = $rootScope.$new();
                var tpl = $compile($templateCache.get('templates/ng-notify/ng-notify.html'))(notifyScope);

                // Init our scope params...

                notifyScope.ngNotify = angular.extend({}, defaultScope);

                // Add the template to the page...

                $timeout(function() {
                    $document.find('body').append(tpl);
                });

                // Private methods...

                /**
                 * Gets what type of notification do display, eg, error, warning, etc.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {String} - the type that will be assigned to this notification.
                 */
                var getType = function(userOpts) {
                    var type = userOpts.type || defaultOptions.type;
                    return (types[type] || types.info) + SPACER;
                };

                /**
                 * Gets the theme for a notification, eg, pure, pastel, etc.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {String} - the theme that will be assigned to this notification.
                 */
                var getTheme = function(userOpts) {
                    var theme = userOpts.theme || defaultOptions.theme;
                    return (themes[theme] || themes.pure) + SPACER;
                };

                /**
                 * Gets the position of the notification, eg, top or bottom.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {String} - the position that will be assigned to this notification.
                 */
                var getPosition = function(userOpts) {
                    var position = userOpts.position || defaultOptions.position;
                    return (positions[position] || positions.bottom) + SPACER;
                };

                /**
                 * Gets how long (in ms) to display the notification for.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {Number} - the number of ms a fade on this notification will last.
                 */
                var getDuration = function(userOpts) {
                    var duration = userOpts.duration || defaultOptions.duration;
                    return angular.isNumber(duration) ? duration : DEFAULT_DURATION;
                };

                /**
                 * Gets our notification's sticky state, forcing manual dismissal when true.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {Boolean} - whether we'll be showing a sticky notification or not.
                 */
                var getSticky = function(userOpts) {
                    var sticky = userOpts.sticky !== undefined ? userOpts.sticky : defaultOptions.sticky;
                    return sticky ? true : false;
                };

                /**
                 * Gets whether or not we'd like to show the close button on our sticky notification.
                 * Notification is required to be sticky.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 * @param {Boolean} isSticky - bool whether we'll be showing a sticky notification or not.
                 *
                 * @returns {Boolean} - whether or now we should display the close button.
                 */
                var showButton = function(userOpts, isSticky) {
                    var showButton = userOpts.button !== undefined ? userOpts.button : defaultOptions.button;
                    return showButton && isSticky;
                };

                /**
                 * Gets whether or not to allow HTML binding via ngSanitize.
                 * Check to make sure ngSanitize is included in the project and warn the user if it's not.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {Boolean} - whether we'll be using ng-bind-html or not.
                 */
                var getHtml = function(userOpts) {

                    /* istanbul ignore if  */
                    if ((userOpts.html || defaultOptions.html) && !hasSanitize) {

                        $log.debug(
                            "ngNotify warning: \ngSanitize couldn't be located.  In order to use the " +
                            "'html' option, be sure the ngSanitize source is included in your project."
                        );

                        return false;
                    }

                    var html = userOpts.html !== undefined ? userOpts.html : defaultOptions.html;
                    return html ? true : false;
                };

                /**
                 * Grabs all of the classes that our notification will need in order to display properly.
                 *
                 * @param {Object}  userOpts - object containing user defined options.
                 * @param {Boolean} isSticky - optional bool indicating if the message is sticky or not.
                 *
                 * @returns {string}
                 */
                var getClasses = function(userOpts, isSticky) {

                    var classes = getType(userOpts) +
                                  getTheme(userOpts) +
                                  getPosition(userOpts);

                    classes += isSticky ? STICKY_CLASS : EMPTY;

                    return classes;
                };

                /**
                 * Resets our notification classes and message.
                 */
                var notifyReset = function() {
                    notifyScope.ngNotify = angular.extend({}, defaultScope);
                };

                /**
                 * Handles the fading functionality and the duration for each fade.
                 *
                 * @param {Number}   mode     - used to trigger fade in or out, adds or subtracts opacity until visible or hidden.
                 * @param {Number}   opacity  - initial opacity for our element.
                 * @param {Number}   duration - how long the fade should take to complete, in ms.
                 * @param {Function} callback - function to invoke once our fade is complete.
                 */
                var doFade = function(mode, opacity, duration, callback) {

                    var gap = FADE_INTERVAL / duration;

                    notifyScope.ngNotify.notifyStyle = {
                        display: 'block',
                        opacity: opacity
                    };

                    var func = function() {

                        opacity += mode * gap;

                        notifyScope.ngNotify.notifyStyle.opacity = opacity;

                        if (opacity <= OPACITY_MIN || OPACITY_MAX <= opacity) {

                            $interval.cancel(notifyInterval);
                            notifyInterval = false;

                            callback();
                        }
                    };

                    if (!notifyInterval) {
                        notifyInterval = $interval(func, FADE_INTERVAL);
                    }
                };

                /**
                 * Triggers a fade out, opacity from 1 to 0.
                 *
                 * @param {Number}   duration - how long the fade should take to complete, in ms.
                 * @param {Function} callback - function to invoke once fade has completed.
                 */
                var fadeOut = function(duration, callback) {
                    doFade(FADE_OUT_MODE, OPACITY_MAX, duration, callback);
                };

                /**
                 * Triggers a fade in, opacity from 0 to 1.
                 *
                 * @param  {Number}   duration - how long the fade should take to complete, in ms.
                 * @param  {Function} callback - function to invoke once fade has completed.
                 */
                var fadeIn = function(duration, callback) {
                    doFade(FADE_IN_MODE, OPACITY_MIN, duration, callback);
                };

                /**
                 * Dismisses our notification when called, attached to scope for ngCLick event to trigger.
                 */
                notifyScope.dismiss = function() {
                    fadeOut(FADE_OUT_DURATION, function() {
                        notifyReset();
                    });
                };

                /**
                 * Our primary object containing all public API methods and allows for all our functionality to be invoked.
                 *
                 * @type {Object}
                 */
                return {

                    /**
                     * Merges our user specified options with our default set of options.
                     *
                     * @param {Object} params - object of user provided options to configure notifications.
                     */
                    config: function(params) {
                        params = params || {};
                        angular.extend(defaultOptions, params);
                    },

                    /**
                     * Sets, configures and displays each notification.
                     *
                     * @param {String}                   message - the message our notification will display to the user.
                     * @param {String|Object|undefined}  userOpt - optional parameter that contains the type or an object of options used to configure this notification.
                     * @param {String|undefined}         userOpt.type
                     * @param {String|undefined}         userOpt.theme
                     * @param {String|undefined}         userOpt.position
                     * @param {Number|undefined}         userOpt.duration
                     * @param {Boolean|undefined}        userOpt.sticky
                     * @param {Boolean|undefined}        userOpt.button
                     * @param {Boolean|undefined}        userOpt.html
                     */
                    set: function(message, userOpt) {

                        if (!message) {
                            return;
                        }

                        $interval.cancel(notifyInterval);
                        notifyInterval = false;

                        $timeout.cancel(notifyTimeout);

                        var userOpts = {};

                        // User either provides an object of options
                        // or a string specifying the type.
                        if (typeof userOpt === 'object') {
                            userOpts = userOpt;
                        } else {
                            userOpts.type = userOpt;
                        }

                        var isSticky = getSticky(userOpts);
                        var duration = getDuration(userOpts);

                        angular.extend(notifyScope.ngNotify, {
                            notifyHtml: getHtml(userOpts),
                            notifyClass: getClasses(userOpts, isSticky),
                            notifyButton: showButton(userOpts, isSticky),
                            notifyMessage: message
                        });

                        fadeIn(FADE_IN_DURATION, function() {

                            if (isSticky) {
                                return;
                            }

                            notifyTimeout = $timeout(function() {
                                notifyScope.dismiss();
                            }, duration);
                        });
                    },

                    /**
                     * Allows a developer to manually dismiss a notification that may be
                     * set to sticky, when the message is no longer warranted.
                     */
                    dismiss: function() {
                        notifyScope.dismiss();
                    },

                    // User customizations...

                    /**
                     * Adds a new, user specified theme to our notification system
                     * that they can then use throughout their application.
                     *
                     * @param {String} themeName  - the name for this new theme that will be used when applying it via configuration.
                     * @param {String} themeClass - the class that this theme will use when applying it's styles.
                     */
                    addTheme: function(themeName, themeClass) {

                        if (!themeName || !themeClass) {
                            return;
                        }

                        themes[themeName] = themeClass;
                    },

                    /**
                     * Adds a new, user specified notification type that they
                     * can then use throughout their application.
                     *
                     * @param {String} typeName  - the name for this new type that will be used when applying it via configuration.
                     * @param {String} typeClass - the class that this type will use when applying it's styles.
                     */
                    addType: function(typeName, typeClass) {

                        if (!typeName || !typeClass) {
                            return;
                        }

                        types[typeName] = typeClass;
                    }
                };
            }
        ];
    });
})();
