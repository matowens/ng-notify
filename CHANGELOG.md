#ng-notify Change Log

##v0.7.1
- version bump to work around the npm "feature" that republishing is no longer supported, while I was figuring out how the publish process works.

##v0.7.0
- **new feature**: new parameter to disable the close button for sticky notifications. w/ help from [programming-kid](https://github.com/programming-kid) and [maksad](https://github.com/maksad).
- bugfix: timeout added to avoid compiling issue when setting config in the run block.  solution by [idpaterson](https://github.com/idpaterson) in [#23](https://github.com/matowens/ng-notify/pull/23).
- added to npm. w/ help from [totaskin](https://github.com/totaskin) and [simiographics](https://github.com/simiographics)

##v0.6.3
- bugfix: concurrent triggers of set() or dismiss() caused infinite, permanent display issues. w/ help from [nzamosenchuk](https://github.com/nzamosenchuk) in [#17](https://github.com/matowens/ng-notify/issues/17) and [Droritos](https://github.com/Droritos) in [#18](https://github.com/matowens/ng-notify/issues/18)

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
- **new feature**: html notifications, possible if ngSanitize is included. w/ help from [gaetancollaud](https://github.com/gaetancollaud) and [NetanelBasal](https://github.com/NetanelBasal) in [#12](https://github.com/matowens/ng-notify/issues/12), [deegale](https://github.com/deegale) in [#6](https://github.com/matowens/ng-notify/issues/6), and [epigos](https://github.com/epigos) in [#4](https://github.com/matowens/ng-notify/pull/4)

##v0.5.3
- improvement to ensure notifications display on top layer via z-index. [#10](https://github.com/matowens/ng-notify/pull/10) - addition by [jessamynsmith](https://github.com/jessamynsmith) and [mgoku](https://github.com/mgoku)

##v0.5.2
- leverage template cache. [#7](https://github.com/matowens/ng-notify/pull/7) - addition by [fduch2k](https://github.com/fduch2k)

##v0.5.1
- use ng-html for scope variable injection. - [#4](https://github.com/matowens/ng-notify/pull/4) - fix by [epigos](https://github.com/epigos)
- container with `ngn` class can interfere with other fixed-position divs. - [#5](https://github.com/matowens/ng-notify/issues/5) - fix by [antch](https://github.com/antch)
- introduced contributors.

##v0.5.0
- **new feature**: added a dismiss method to give additional dev control over how notifications display.

##v0.4.2
- update for version bumps.
- same path fix for the package.json file.

##v0.4.1
- path fix for bower, bower.json file. - [#3](https://github.com/matowens/ng-notify/pull/3/files) - fix by [genu](https://github.com/genu)

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
