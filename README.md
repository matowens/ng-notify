ng-notify ([live demo](http://matowens.github.io/ng-notify/#demo)) [![Build Status](https://travis-ci.org/matowens/ng-notify.svg?branch=master)](https://travis-ci.org/matowens/ng-notify) [![Code Climate](https://codeclimate.com/github/matowens/ng-notify/badges/gpa.svg)](https://codeclimate.com/github/matowens/ng-notify)
=========

A simple, lightweight module for displaying notifications in your AngularJS app.

Both JS and CSS files combine for ~4.4 kBs.

IE9+ (AngularJS v1.3.x no longer supports IE8) and the latest versions of Chrome, FireFox and Safari have been tested and are supported.  If you do run across any issues, please submit a [new issue](https://github.com/matowens/ng-notify/issues) and I'll take a look - or better yet - submit a PR with the bug fix and I'll merge it in.

You can check out the vitals and demo here: [http://matowens.github.io/ng-notify](http://matowens.github.io/ng-notify)

New in v0.6.0 is **HTML notifications**.  When enabled, you'll be able to display notifications with HTML content in them.  This too can be set as a default option for all notifications or just set for individual notifications on a case by case basis.  There is an extra requirement for this to function, the [ngSanitize](https://docs.angularjs.org/api/ngSanitize) script must be included in your app.  If ngSanitize is not available, ngNotify will gracefully degrade to displaying standard, HTML escaped notification messages.  For more on how to display HTML notifications, check out the [HTML Notifications](#html-notifications) section below.  For more on updates, head on over to the [change log](https://github.com/matowens/ng-notify/blob/master/CHANGELOG.md).

Implementation
==============

###Requirements

AngularJS is the only dependency.  Animation is achieved with pure JS, jQuery not necessary.

###Installation

You can install ng-notify with Bower.

    bower install ng-notify --save

As of v0.6.0, ng-notify is now available via the jsDelivr CDN if you'd prefer to go down that route.

    //cdn.jsdelivr.net/angular.ng-notify/{version.number.here}/ng-notify.min.js
    //cdn.jsdelivr.net/angular.ng-notify/{version.number.here}/ng-notify.min.css

For example:

    //cdn.jsdelivr.net/angular.ng-notify/0.6.0/ng-notify.min.js
    //cdn.jsdelivr.net/angular.ng-notify/0.6.0/ng-notify.min.css

And as always, you can download the source files straight from this repo - they're located in the `dist` dir.  Be sure to include the minified version of both js and css files.

###Usage

After including *ng-notify.min.js* and *ng-notify.min.css*, inject the ng-notify provider into your project.

```javascript
var app = angular.module('demo', ['ngNotify']);
```

Now you can trigger notifications from anywhere in your app.  To display a notification, just use the `set` method.

```javascript
ngNotify.set('Your notification message goes here!');
```

To specify the *type* of notification to display, provide the optional *type* param. (For available types, check the [definitions](#definitions) below.)

```javascript
ngNotify.set('Your error message goes here!', 'error');
```

Advanced Usage
==============

###Default Configuration

You can override the default options for all notifications by using the `config` method.  None of these options are required. (For available options, check the [definitions](#definitions) below.)

```javascript
ngNotify.config({
    theme: 'pure',
    position: 'bottom',
    duration: 3000,
    type: 'info',
    sticky: false,
    html: false
});
```

Default configuration options can be set during the `run()` block.  If your app utilizes a global controller, the config options could be set there just as well.  For a discussion and working example on this topic, checkout [this comment](https://github.com/matowens/ng-notify/issues/16#issuecomment-104492193).

###Individual Configurations

You can also pass an object of options to individual notifications.  You can pass through any combination of our available options here as well.  (For available options, check the [definitions](#definitions) below.)  For example:

```javascript
ngNotify.set('Your first message.', {
    position: 'top',
    sticky: true
});

ngNotify.set('Your second message.', {
    type: 'error',
    duration: 2000
});

ngNotify.set('Your third message.', 'error'); // Original use case still works, too.

ngNotify.set('Your <i>fourth</i> message.', {
    theme: 'pitchy',
    html: true
});
```

###Sticky Notifications

Sticky notifications allow you to set a persistent notification that doesn't fade away.  To do this, simply set the `sticky` attribute to true:

```javascript
ngNotify.set('This is sticky.', {
    sticky: true
});
```

This will give the user the option of closing the notification themselves.  If you need to dismiss a notification manually, you can do so with the `dismiss` method like this:

```javascript
ngNotify.dismiss();
```

*Any time a notification is set to sticky, the duration attribute will be ignored since the notification will not be automatically fading out.*

###HTML Notifications

HTML notifications will allow you to display messages with HTML content in them.  To do this, you'll need to set the `html` attribute to true:

```javascript
ngNotify.set('This has <b>HTML</b> content!', {
    html: true
});
```

You can also set HTML notifications to be enabled for all of your notifications by adding it the ngNotify config like so:

```javascript
ngNotify.config({
    html: true
});
```
In order for HTML notifications to display, you are required to include the [ngSanitize](https://docs.angularjs.org/api/ngSanitize) script in your app (eg, via Google CDN, Bower, or code.angular.org).  There's no need to add it as a dependency to ngNotify.  If ngNotify has found the ngSanitize script, it will add it as a dependency to the ngNotify module dynamically.  Once included, you just need to toggle the `html` attribute to true and the module will handle the rest.

If you don't have ngSanitize included and you do set `html` to true, ngNotify will gracefully degrade back to the default message display and print a debug message to remind you in your browser's console.

###Roll Your Own

There are two additional methods that allow you to create your own types and themes.

#####Custom Notification Types

Creating a custom type will allow you to add additional types of notifications to use throughout your application.  To create a new type, use the `addType` method.  The first param is the *name* you'll use to reference your new type.  The second param is the *class* you'll use to style your new notification type.

```javascript
ngNotify.addType('notice', 'my-notice-type');
```

Then you can set any of your notifications up to use that type as you would any other, triggering it by using the name you gave it.

```javascript
ngNotify.set('This notification is using our new type!', 'notice');
```

To style your new type, pick a color you'd like to use and set it to the background color of your new style.

```sass
.my-notice-type
    background-color: #ABC123
```

#####Custom Themes

Creating a custom theme will allow you to build an entirely new spectrum of notification messages utilizing the existing notification types.  To create a new theme, use the `addTheme` method.  The first param is the *name* you'll use to reference your new theme.  The second param is the *class* you'll use to style your new theme's notification types.

```javascript
ngNotify.addTheme('newTheme', 'my-new-theme');
```

Now you can activate your new theme via the config method, using the name you previously assigned to it.

```javascript
ngNotify.config({
    theme: 'newTheme'
});
```

To style your new theme, pick a collection of colors you'd like to use for each notification type and set them to each type's background color.

```sass
.my-new-theme.ngn-info
    background-color: #0033CC

.my-new-theme.ngn-error
    background-color: #FF0000

.my-new-theme.ngn-success
    background-color: #00CC00

.my-new-theme.ngn-warn
    background-color: #FF9900

.my-new-theme.ngn-grimace
    background-color: #660099
```

#####Custom Styles

The position, size, color, alignment and more are all styled based on the notification's classes and are all specified in the CSS file. See the [style definitions](#styles) below to see which classes can be used to override any of the styles within your own application.

Definitions
===========

###Methods

####set(message, type)
displays a notification message and sets the formatting/behavioral options for this one notification.
- **message**: *string* - *required* - the message to display in your notification.
- **type**: *string* - *optional* - the type of notification to display.
    - info *(default)*
    - error
    - success
    - warn
    - grimace

####config(options)
sets default settings for all notifications to take into account when displaying.
- **options** - *object* - an object of options that overrides the default settings.
    - **theme**: *string* - *optional* - sets the theme to use, altering the styles for each notification type.
        - pure *(default)*
        - prime
        - pastel
        - pitchy
    - **type**: *string* - *optional* - sets the default notification type when a type isn't explicitly set.
        - info *(default)*
        - error
        - success
        - warn
        - grimace
    - **position**: *string* - *optional* - sets where the notifications will be displayed at in the app.
        - bottom *(default)*
        - top
    - **duration**: *integer* - *optional* - the duration the notification stays visible to the user, in milliseconds.
    - **sticky**: *bool* - *optional* - determines whether or not the message will fade at the end of the duration or if the message will persist until the user dismisses it themselves.  when true, duration will not be set, even if it has a value. *(false by default)*.

####dismiss()
manually dismisses any sticky notifications that may still be set.

####addType(name, class)
allows a dev to create a new type of notification to use in their app.
- **name**: *string* - *required* - the name used to trigger this notification type in the *set* method.
- **class**: *string* - *required* - the class used to target this type in the stylesheet.

####addTheme(name, class)
allows a dev to create a whole new set of styles for each notification type.
- **name**: *string* - *required* - the name used when setting the theme in the *config* object.
- **class**: *string* - *required* - the class used to target this theme in the stylesheet.

###Styles

- **primary**: the class that's present on every notification and controls all of the primary styles.
    - *.ngn*

- **position**: purely responsible for where notifications are displayed.  *default is set to bottom, one is present on every notification.*
    - *.ngn-top*
    - *.ngn-bottom*

- **types**: default classes for setting each notification type's background color.  *default is set to info, one is present on every notification.*
    - *.ngn-info*
    - *.ngn-error*
    - *.ngn-success*
    - *.ngn-warn*
    - *.ngn-grimace*

- **themes**: theme specific classes that are chained together with type classes to override default background colors.  *not always present, default excludes all of these.*
    - *.ngn-prime*
    - *.ngn-pastel*
    - *.ngn-pitchy*

- **sticky**: styles responsible for displaying the dismissal button for sticky notifications.
    - *.ngn-sticky* - displays the dismissal button when sticky is enabled.
    - *.ngn-dismiss* - styles the dismissal button.

Development
===========

If you've forked or cloned the project and would like to make any sort of adjustments, there are few items to make note of.  First, your system will need to have the following bits in place:

- Node & NPM
- Grunt
- Ruby
- Sass

Second, there are a few grunt tasks that you'll be able to leverage to help validate and prepare your changes for use.

You can fire off a `grunt` or `grunt build` command manually at any time to lint, minify, and setup your demo (built in the _gh-pages dir) for testing.

```console
grunt (or grunt build)
```

Also, you can run `grunt dev` to lint, minify, and prep your demo for testing.  Once the build is complete, it'll also fire off a `watch` so that any changes that are made to the the sass, js, and demo files will automatically trigger the build script to update your project.

```console
grunt dev
```

To run through the configured unit tests, you can run `grunt test`.  This will fire off a series of tests that check that all default options are set correctly, all configurable options are able to be set correctly, and that all methods carry out the functionality that they're supposed to.  These tests should let you know if any of the updates that you've made have negatively effected any preexisting functionality.  Also, when the tests complete, there will be a test coverage report generated and stored in the `coverage` directory.

```console
grunt test
```

Next, you'll want to do all of your development within three locations.  If you add changes anywhere else, they're likely to be overwritten during the build process.  These locations are:

`src/scripts/ng-notify.js` - for any script modifications.

`src/styles/ng-notify.sass` - for any style modifications.

`demo/*` - for any modifications to the demo.

Lastly, once you've made your changes and run through the appropriate grunt tasks, your changes should be baked and ready for you to consume - located in the `dist` directory as minified js and css files.
