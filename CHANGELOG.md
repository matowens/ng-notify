# ng-notify Changelog
##v0.8.0
- **new feature**: new parameter to specific the target element in which to append a notification to. [#27](https://github.com/matowens/ng-notify/issues/27)
- **new feature**: callbacks can be passed via the set method to call a function after a notification has displayed. [#20](https://github.com/matowens/ng-notify/issues/20), [#30](https://github.com/matowens/ng-notify/issues/30)
- reorder button and notification container in tpl. [29](https://github.com/matowens/ng-notify/pull/29)
- updates to phrasing and spelling. [31](https://github.com/matowens/ng-notify/pull/31)
- a refactor to replace a single notification object with notification instances.  will assist with future development plans for stacked notifications and Angular 2 support.
- shoutouts: [systemaker](https://github.com/systemaker), [sinsunsan](https://github.com/sinsunsan), [mrweiland](https://github.com/mrweiland), [qoshi](https://github.com/qoshi), [Droritos](https://github.com/Droritos), [danjarvis](https://github.com/danjarvis)

##v0.7.2
- bugfix: fixed issue with requirement of Angular 1.4, changed to allow Angular 1.x. 
- shoutouts: [solo12zw74](https://github.com/solo12zw74)

##v0.7.1
- version bump to work around the npm "feature" that republishing is no longer supported, while I was figuring out how the publish process works.

##v0.7.0
- **new feature**: new parameter to disable the close button for sticky notifications.
- bugfix: timeout added to avoid compiling issue when setting config in the run block. [#23](https://github.com/matowens/ng-notify/pull/23)
- added to npm.
- shoutouts: [programming-kid](https://github.com/programming-kid), [maksad](https://github.com/maksad), [idpaterson](https://github.com/idpaterson), [totaskin](https://github.com/totaskin), [simiographics](https://github.com/simiographics)

##v0.6.3
- bugfix: concurrent triggers of set() or dismiss() caused infinite, permanent display issues. [#17](https://github.com/matowens/ng-notify/issues/17), [#18](https://github.com/matowens/ng-notify/issues/18)
- shoutouts: [nzamosenchuk](https://github.com/nzamosenchuk), [Droritos](https://github.com/Droritos)

##v0.6.2
- refactored fade functionality to utilize ngStyle.
- added unit tests for sticky and duration cases.
- test coverage integration, report generated when `grunt test` is fired.
- minor bugfix: setting either *html* or *sticky* to false on individual notifications was ignored and remained true if global config for either was set to true.
- additional code organization updates.

##v0.6.1
- unit tests and [Travis CI](https://travis-ci.org/matowens/ng-notify) integration.
- [code climate](https://codeclimate.com/github/matowens/ng-notify) monitoring.
- cdn addition via [jsDelivr](http://www.jsdelivr.com/#!angular.ng-notify).
- updated to angular 1.4.0.
- minor code cleanup.

##v0.6.0
- **new feature**: html notifications, possible if ngSanitize is included. [#12](https://github.com/matowens/ng-notify/issues/12), [#6](https://github.com/matowens/ng-notify/issues/6), [#4](https://github.com/matowens/ng-notify/pull/4)
- shoutouts: [gaetancollaud](https://github.com/gaetancollaud), [NetanelBasal](https://github.com/NetanelBasal), [deegale](https://github.com/deegale), [epigos](https://github.com/epigos)

##v0.5.3
- improvement to ensure notifications display on top layer via z-index. [#10](https://github.com/matowens/ng-notify/pull/10)
- shoutouts: [jessamynsmith](https://github.com/jessamynsmith), [mgoku](https://github.com/mgoku)

##v0.5.2
- leverage template cache. [#7](https://github.com/matowens/ng-notify/pull/7)
- shoutouts: [fduch2k](https://github.com/fduch2k)

##v0.5.1
- use ng-html for scope variable injection. [#4](https://github.com/matowens/ng-notify/pull/4) 
- container with `ngn` class can interfere with other fixed-position divs. [#5](https://github.com/matowens/ng-notify/issues/5)
- introduced contributors.
- shoutouts: [epigos](https://github.com/epigos), [antch](https://github.com/antch)

##v0.5.0
- **new feature**: added a dismiss method to give additional dev control over how notifications display.

##v0.4.2
- update for version bumps.
- same path fix for the package.json file.

##v0.4.1
- path fix for bower, bower.json file. [#3](https://github.com/matowens/ng-notify/pull/3/files) 
- shoutouts: [genu](https://github.com/genu)

##v0.4.0
- **new feature**: sticky notifications, dismissible by the user.
- standardized comments throughout module.
- organized module structure.

##v0.3.0
- **new feature**: configurable options for individual notifications.
- renamed type option from *defaultType* to just *type* for consistency.
- introduced change log

##v0.2.1
- better organized for bower distribution.

##v0.2.0
- initial bower release.
