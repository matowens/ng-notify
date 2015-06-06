/**
 * Test that we're able to add a custom theme via the
 * addTheme method.
 */
describe('ngNotify addTheme method', function() {
    'use strict';

    var ngNotify,
        doc,
        element,
        scope;

    var message = 'Message to display during tests.';
    var newThemeName = 'newTheme';
    var newThemeClass = 'new-theme';

    /**
     * Setup our application before running each test.
     */

    beforeEach(module('ngNotify'));

    beforeEach(inject(function($injector, $document) {

        ngNotify = $injector.get('ngNotify');

        doc = $document;

        element = angular.element(
            document.querySelector('.ngn')
        );

        scope = element.scope();
    }));

    /**
     * Start from a clean slate between every single test.
     */

    afterEach(function() {
        doc.find('body').empty();
    });

    /**
     * Setup addTheme method tests.
     */

    it('object theme is not set', function() {

        ngNotify.set(message, {
            theme: newThemeName
        });

        expect(
            scope.ngNotify.notifyClass.indexOf(newThemeClass) > -1
        ).toBe(false);
    });

    it('config theme is not set', function() {

        ngNotify.config({
            theme: newThemeName
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf(newThemeClass) > -1
        ).toBe(false);
    });

    it('empty theme is not set', function() {

        ngNotify.addTheme();

        ngNotify.config({
            theme: newThemeName
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf(newThemeClass) > -1
        ).toBe(false);
    });

    it('object theme is set', function() {

        ngNotify.addTheme(newThemeName, newThemeClass);

        ngNotify.set(message, {
            theme: newThemeName
        });

        expect(
            scope.ngNotify.notifyClass.indexOf(newThemeClass) > -1
        ).toBe(true);
    });

    it('config theme is set', function() {

        ngNotify.addTheme(newThemeName, newThemeClass);

        ngNotify.config({
            theme: newThemeName
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf(newThemeClass) > -1
        ).toBe(true);
    });

});
