/**
 * @license ng-notify v0.8.0
 * http://matowens.github.io/ng-notify
 * (c) 2014-2016 MIT License, MatOwens.com
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
     * Cache template in run block.
     */
    module.run(['$templateCache', ngNotifyCache]);

    /**
     * Notifcation instances, visibility functionality, and post notification cleanup.
     */
    module.factory('NgNotifyFactory', ['$interval', ngNotifyFactory]);

    /**
     * Notification configuration, management, and API exposure.
     */
    module.provider('ngNotify', NgNotifyService);

    /**
     *              _   _       _   _  __
     *  _ __   __ _| \ | | ___ | |_(_)/ _|_   _
     * | '_ \ / _` |  \| |/ _ \| __| | |_| | | |
     * | | | | (_| | |\  | (_) | |_| |  _| |_| |
     * |_| |_|\__, |_| \_|\___/ \__|_|_|  \__, |
     *        |___/                       |___/
     */

    /**
     * Check to see if the ngSanitize script has been included by the user.
     * If so, pull it in and allow for it to be used when user has specified.
     */
    var hasSanitize = false;

    // Constants...

    var TEMPLATE = 'templates/ng-notify/ng-notify.html';

    var EMPTY = '';
    var SPACER = ' ';
    var STICKY_CLASS = 'ngn-sticky';
    var COMPONENT_CLASS = 'ngn-component';
    var SELECTOR = 'body';
    var DEFAULT_DURATION = 3000;

    var FADE_OUT_DURATION = 500;
    var FADE_INTERVAL = 25;
    var FADE_IN_MODE = 1;
    var FADE_OUT_MODE = -1;
    var FADE_IN_DURATION = 200;

    var OPACITY_MIN = 0;
    var OPACITY_MAX = 1;

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

    /**
     * Generate ngNotify template and add it to our cache.
     *
     * @param {Object} $templateCache -
     */
    function ngNotifyCache($templateCache) {

        var html =
            '<div class="ngn" ng-class="ngNotify.notifyClass">' +
                '<span ng-if="ngNotify.notifyHtml" class="ngn-message" ng-bind-html="ngNotify.notifyMessage"></span>' + // Display HTML notifications.
                '<span ng-if="!ngNotify.notifyHtml" class="ngn-message" ng-bind="ngNotify.notifyMessage"></span>' + // Display escaped notifications.
                '<span ng-show="ngNotify.notifyButton" class="ngn-dismiss" ng-click="dismiss()">&times;</span>' +
            '</div>';

        $templateCache.put(TEMPLATE, html);
    }

    /**
     * Class that handles the visual display of our notificaitons and is
     * responsible for handling clean up for each notification when
     * it's time has run it's course.
     *
     * @returns {NgNotifyFactory}
     */
    function ngNotifyFactory($interval) {

        var notifyInterval;

        function NgNotifyFactory(scope, template, options) {
            this.scope = scope;
            this.options = options;
            this.template = fadeLib(template);
        }

        NgNotifyFactory.prototype = {

            /**
             * Triggers a fade in, opacity from 0 to 1.
             *
             * @param  {Function} callback - function to invoke once fade has completed.
             */
            show: function(callback) {
                this.template.fadeIn(FADE_IN_DURATION, callback);
            },

            /**
             * Triggers a fade out, opacity from 1 to 0.
             *
             * @param {Function} callback - function to invoke once fade has completed.
             */
            dismiss: function() {
                this.template.fadeOut(FADE_OUT_DURATION, this.destroy.bind(this));
            },

            /**
             * Destroys our notification and triggers the callback if provided.
             */
            destroy: function() {

                $interval.cancel(notifyInterval);

                if (this.options && this.options.userCallback) {
                    this.options.userCallback();
                }

                if (this.scope) {
                    this.scope.$destroy();
                }

                if (this.template) {
                    this.template.el.remove();
                }

                this.scope = null;
                this.options = null;
                this.template = null;
            }
        };

        // Pure JS fade functionality...

        /**
         * Triggers our constructor to add our fade prototypes to our element.
         *
         * @param  {Object} el - an element generated by our own template and bound to it's own scope.
         *
         * @return {Object} - our element along with new fade prototype methods.
         */
        var fadeLib = function(el) {
            return new fadeLib.fn(el);
        };

        /**
         * Our constructor that will allow us to invoke a fade on our element.
         *
         * @param {Object} el - an element generated by our own template and bound to it's own scope.
         */
        fadeLib.fn = function(el) {
            this.el = el;
        };

        /**
         * Handles the fading functionality and the duration for each fade.
         *
         * @param {Number}   mode     - used to trigger fade in or out, adds or subtracts opacity until visible or hidden.
         * @param {Number}   opacity  - initial opacity for our element.
         * @param {Number}   duration - how long the fade should take to complete, in ms.
         * @param {Function} callback - function to invoke once our fade is complete.
         */
        fadeLib.fn.prototype._fade = function(mode, opacity, duration, callback) {

            var gap = FADE_INTERVAL / duration;
            var el = this.el;

            el.css('opacity', opacity);

            var func = function() {

                opacity = opacity + mode * gap;

                el.css('opacity', opacity);

                if (opacity <= OPACITY_MIN || opacity >= OPACITY_MAX) {
                    $interval.cancel(notifyInterval);

                    if (opacity <= OPACITY_MIN) {
                        el.css('display', 'none');
                    }

                    if (callback) {
                        callback();
                    }
                }
            };

            notifyInterval = $interval(func, FADE_INTERVAL);
        };

        /**
         * Triggers a fade in, opacity from 0 to 1.
         *
         * @param  {Number}   duration - how long the fade should take to complete, in ms.
         * @param  {Function} callback - function to invoke once fade has completed.
         */
        fadeLib.fn.prototype.fadeIn = function(duration, callback) {
            this.el.css('display', 'block');
            this._fade(FADE_IN_MODE, OPACITY_MIN, duration, callback);
        };

        /**
         * Triggers a fade out, opacity from 1 to 0.
         *
         * @param {Number}   duration - how long the fade should take to complete, in ms.
         * @param {Function} callback - function to invoke once fade has completed.
         */
        fadeLib.fn.prototype.fadeOut = function(duration, callback) {
            this._fade(FADE_OUT_MODE, OPACITY_MAX, duration, callback);
        };

        return NgNotifyFactory;
    }

    /**
     * Our notification service that reads our user's configuration options and spins
     * up new notification instances while providing the API for managing those
     * notifications within our user's app.
     */
    function NgNotifyService() {

        this.$get = ['$document', '$compile', '$log', '$rootScope', '$timeout', '$templateCache', 'NgNotifyFactory',

            function($document, $compile, $log, $rootScope, $timeout, $templateCache, NgNotifyFactory) {

                var notification;
                var notifyTimeout;

                // Defaults...

                var DEFAULT_OPTIONS = {
                    theme: 'pure',
                    position: 'bottom',
                    duration: DEFAULT_DURATION,
                    type: 'info',
                    sticky: false,
                    button: true,
                    html: false,
                    target: SELECTOR
                };

                var DEFAULT_SCOPE = {
                    notifyClass: '',
                    notifyMessage: ''
                };

                // Options...

                var THEMES = {
                    pure: EMPTY,
                    prime: 'ngn-prime',
                    pastel: 'ngn-pastel',
                    pitchy: 'ngn-pitchy'
                };

                var TYPES = {
                    info: 'ngn-info',
                    error: 'ngn-error',
                    success: 'ngn-success',
                    warn: 'ngn-warn',
                    grimace: 'ngn-grimace'
                };

                var POSITIONS = {
                    bottom: 'ngn-bottom',
                    top: 'ngn-top'
                };

                // Private methods...

                /**
                 * Creates a new scope for our notification.
                 *
                 * @returns {Object}
                 */
                var scopeInit = function() {

                    var scope = $rootScope.$new();

                    // Setup scope with our default notify* params.
                    scope.ngNotify = angular.extend({}, DEFAULT_SCOPE);

                    // Adds dismiss functionality to our scope for button click.
                    scope.dismiss = function() {
                        dismiss();
                    };

                    return scope;
                };

                /**
                 * Initializes a new Notify object.
                 *
                 * @param {String}                   message - the message our notification will display to the user.
                 * @param {String|Object|undefined}  userOpt - optional parameter that contains the type or an object of options used to configure this notification.
                 * @param {Function|null}            callback - optional method to fire after we've shown, faded, and removed our notification.
                 *
                 * @returns {Notify}
                 */
                var notifyInit = function(message, userOpt, callback) {

                    var userOpts = {};
                    var notifyScope = scopeInit();

                    // User either provides an object of options
                    // or a string specifying the type.
                    if (typeof userOpt === 'object') {
                        userOpts = userOpt;
                    } else {
                        userOpts.type = userOpt;
                    }

                    var notifyTarget = getTarget(userOpts);

                    var notifyOptions = {
                        isSticky: getSticky(userOpts),
                        duration: getDuration(userOpts),
                        userCallback: callback
                    };

                    angular.extend(notifyScope.ngNotify, {
                        notifyHtml: getHtml(userOpts),
                        notifyClass: getClasses(userOpts, notifyOptions.isSticky, notifyTarget.found),
                        notifyButton: showButton(userOpts, notifyOptions.isSticky),
                        notifyMessage: message
                    });

                    var template = $compile(
                        $templateCache.get(TEMPLATE)
                    )(notifyScope);

                    notifyTarget.target.append(template);

                    return new NgNotifyFactory(notifyScope, template, notifyOptions);
                };

                /**
                 * Gets what type of notification do display, eg, error, warning, etc.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {String} - the type that will be assigned to this notification.
                 */
                var getType = function(userOpts) {
                    var type = userOpts.type || DEFAULT_OPTIONS.type;
                    return (TYPES[type] || TYPES.info) + SPACER;
                };

                /**
                 * Gets the theme for a notification, eg, pure, pastel, etc.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {String} - the theme that will be assigned to this notification.
                 */
                var getTheme = function(userOpts) {
                    var theme = userOpts.theme || DEFAULT_OPTIONS.theme;
                    return (THEMES[theme] || THEMES.pure) + SPACER;
                };

                /**
                 * Gets the position of the notification, eg, top or bottom.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {String} - the position that will be assigned to this notification.
                 */
                var getPosition = function(userOpts) {
                    var position = userOpts.position || DEFAULT_OPTIONS.position;
                    return (POSITIONS[position] || POSITIONS.bottom) + SPACER;
                };

                /**
                 * Gets how long (in ms) to display the notification for.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @return {Number} - the number of ms a fade on this notification will last.
                 */
                var getDuration = function(userOpts) {
                    var duration = userOpts.duration || DEFAULT_OPTIONS.duration;
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
                    var sticky = userOpts.sticky !== undefined ? userOpts.sticky : DEFAULT_OPTIONS.sticky;
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
                    var showButton = userOpts.button !== undefined ? userOpts.button : DEFAULT_OPTIONS.button;
                    return showButton && isSticky;
                };

                /**
                 * Gets the selector for where we'd like to place our notification.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @returns {String}
                 */
                var getSelector = function(userOpts) {
                    return userOpts.target || DEFAULT_OPTIONS.target;
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
                    if ((userOpts.html || DEFAULT_OPTIONS.html) && !hasSanitize) {

                        $log.debug(
                            "ngNotify warning:\nngSanitize couldn't be located.  In order to use the " +
                            "'html' option, be sure the ngSanitize source is included in your project."
                        );

                        return false;
                    }

                    var html = userOpts.html !== undefined ? userOpts.html : DEFAULT_OPTIONS.html;
                    return html ? true : false;
                };

                /**
                 * Grabs all of the classes that our notification will need in order to display properly.
                 *
                 * @param {Object}  userOpts - object containing user defined options.
                 * @param {Boolean} isSticky - optional bool indicating if the message is sticky or not.
                 * @param {Boolean} foundTarget - optional bool indicating that we've found the user's target container.
                 *
                 * @returns {string}
                 */
                var getClasses = function(userOpts, isSticky, foundTarget) {

                    var classes = getType(userOpts) +
                        getTheme(userOpts) +
                        getPosition(userOpts);

                    classes += isSticky ? STICKY_CLASS + SPACER : EMPTY;
                    classes += getSelector(userOpts) !== SELECTOR && foundTarget ? COMPONENT_CLASS + SPACER : EMPTY;

                    return classes;
                };

                /**
                 * Grabs the element that we'd like to attach our notification to.
                 *
                 * @param {Object} userOpts - object containing user defined options.
                 *
                 * @returns {Object}
                 */
                var getTarget = function(userOpts) {

                    var target = document.querySelector(
                        getSelector(userOpts)
                    );

                    if (target) {
                        return {
                            target: angular.element(target),
                            found: true
                        };
                    }

                    return {
                        target: angular.element(
                            document.querySelector(SELECTOR)
                        ),
                        found: false
                    };
                };

                /**
                 * Handles our notification after we've shown it.
                 */
                var afterShow = function() {

                    if (notification.options.isSticky) {
                        return;
                    }

                    notifyTimeout = $timeout(function() {
                        notification.dismiss();
                    }, notification.options.duration);
                };

                /**
                 * Dismisses our notification.
                 */
                var dismiss = function() {

                    if (!notification) {
                        return;
                    }

                    notification.dismiss();
                };

                /**
                 * Cleans up an existing notification.
                 *
                 * @param {NgNotifyFactory|Null} notification - object containing our notification or false.
                 */
                var clearResidue = function(notification) {

                    $timeout.cancel(notifyTimeout);

                    if (!notification) {
                        return;
                    }

                    if (notification.scope) {
                        notification.destroy();
                    }

                    notification = null;
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
                        angular.extend(DEFAULT_OPTIONS, params);
                    },

                    /**
                     * Sets, configures and displays each notification.
                     *
                     * @param {String}                   message - the message our notification will display to the user.
                     * @param {String|Object|undefined}  userOpt - optional parameter that contains the type or an object of options used to configure this notification.
                     * @param {Function|null}            callback - optional method to fire after we've shown and removed our notification.
                     */
                    set: function(message, userOpt, callback) {

                        if (!message) {
                            return;
                        }

                        // Clean up any lingering, unfinished notifications.
                        clearResidue(notification);

                        // Build our new notification.
                        notification = notifyInit(message, userOpt, callback);

                        // Handle the display of our notification.
                        notification.show(afterShow);
                    },

                    /**
                     * Allows a developer to manually dismiss a notification that may be
                     * set to sticky, when the message is no longer warranted.
                     */
                    dismiss: function() {
                        dismiss();
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

                        THEMES[themeName] = themeClass;
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

                        TYPES[typeName] = typeClass;
                    }
                };
            }
        ];
    }

})();
