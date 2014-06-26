ng-notify
=========

A simple, lightweight module for displaying notifications in your AngularJS app.

Both JS and CSS files combine for < 3 kBs.

IE8+ and the latest versions of Chrome, FireFox and Safari have been tested and are supported.

You can check out the demo here: [http://matowens.github.io/ng-notify](http://matowens.github.io/ng-notify)

Implementation
==============

###Requirements

AngularJS is the only dependency.  Animation is achieved with pure JS, jQuery not necessary.

###Installation

// Bower and NPM components coming soon.

You can also download source files straight from this repo, they're located in the `dist` dir.  Just include the minified version of both js and css files.

###Usage

After including *ng-notice.min.js* and *ng-notice.min.css*, inject the ng-notice provider into your project.

    var app = angular.module('demo', ['ngNotify']);

Now you can provide notifications from anywhere in your app.  To display a notification, just use the `set` method.

    ngNotify.set('Your notification message goes here!');

To specify the *type* of notification to display, provide the optional type param. (For available types, check the [definitions](#definitions) below.)

    ngNotify.set('Your error message goes here!', 'error');

Advanced Usage
==============

###Configuration

You can override a few of the default options by using the `config` method. (For available options, check the [definitions](#definitions) below.)

    ngNotify.config({
        theme: 'pure',
        position: 'bottom',
        duration: 3000,
        defaultType: 'info'
    });

###Roll Your Own

There are two additional methods that allow for you to create your own types and themes.

#####Custom Notification Types

Creating a custom type will allow you to add additional types of notifications within the current theme.  To create a new type, use the `addType` method.  The first param is the *id* you'll use to reference your new type.  The second param is the *class* you'll use to style your new notification type.

    ngNotify.addType('notice', 'my-notice-type');

Then you can set any of your notifications up to use that type as you would any other.

    ngNotify.set('This notification is using our new type!', 'notice');

To style your new type, pick a color you'd like to utilize and set it to the background of your new style.

    .my-notice-type
        background-color: #ABC123

#####Custom Themes

Creating a custom theme will allow you to build an entirely new spectrum of notification messages utilizing the existing notification types.  To create a new theme, use the `addTheme` method.  The first param is the *id* you'll use to reference your new theme.  The second param is the *class* you'll use to style your new theme's notification types.

    ngNotify.addTheme('newTheme', 'my-new-theme');

Now you can activate your new theme via the config method.

    ngNotify.config({
        theme: 'newTheme'
    });

To style your new theme, pick a collection of colors you'd like to utilize for each notification type and set them to each type's background color.

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

#####Custom Styles

The positioning, size, color, alignment and more are all styled based on the classes of a notification and are all specified in the CSS file. See the style definitions below to see which classes can be used to override any of the styles within your own application.

Definitions
===========

###Methods

####set(message, type)
- **message**: *string* - *required* - the message to display in your notification.
- **type**: *string* - *optional* - the type of notification to display.
    - info *(default)*
    - error
    - success
    - warn
    - grimace

####config(options)
- **options** - *object* - an object of options that overrides the default settings.
    - **theme**: *string* - *optional* - sets the theme to use, altering the styles for each notification type.
        - pure *(default)*
        - prime
        - pastel
        - pitchy
    - **defaultType**: *string* - *optional* - sets the default notification type when a type isn't explicitly set.
        - info *(default)*
        - error
        - success
        - warn
        - grimace
    - **position**: *string* - *optional* - sets where the notifications will be displayed at in the app.
        - bottom *(default)*
        - top
    - **duration**: *integer* - *optional* - the duration the notification stays visible to the user, in milliseconds.

####addType(id, class)
- **id**: *string* - *required* - the identifier used to trigger this notification type in the *set* method.
- **class**: *string* - *required* - the class used to target this type in the stylesheet.

####addTheme(id, class)
- **id**: *string* - *required* - the identifier used when setting the theme in the *config* object.
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
    - *.ngn-prime
    - *.ngn-pastel
    - *.ngn-pitchy