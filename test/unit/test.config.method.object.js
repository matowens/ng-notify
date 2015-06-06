/**
 * Test that each of our configuration settings are properly set when
 * passed through on our config method as an object.
 *
 * TODO: add tests for durations
 */
describe('ngNotify config method', function() {
    'use strict';

    var ngNotify,
        doc,
        element,
        scope;

    var message = 'Message to display during tests.';

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
     * Setup config method tests.
     *
     * Just need to test a single, non-default param here for
     * each config option.  In-depth testing for every available option
     * is done in each config's specific test.
     */

    it('is empty', function() {

        ngNotify.config();

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('type warn is set', function() {

        ngNotify.config({
            type: 'warn'
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-warn") > -1
        ).toBe(true);
    });

    it('theme pastel is set', function() {

        ngNotify.config({
            theme: 'pastel'
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-pastel") > -1
        ).toBe(true);
    });

    it('html true is set', function() {

        ngNotify.config({
            html: true
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(true);
    });

    it('sticky true is set', function() {

        ngNotify.config({
            sticky: true
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);
    });

    it('position top is set', function() {

        ngNotify.config({
            position: 'top'
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-top") > -1
        ).toBe(true);
    });

    it('duration abc is set', function() {

        ngNotify.config({
            duration: 'abc'
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyMessage
        ).toEqual(message);

    });

    it('duration 1000 is set', function() {

        ngNotify.config({
            duration: 1000
        });

        ngNotify.set(message);

        // ????

    });

    it('all non-default options are set', function() {

        ngNotify.config({
            type: 'success',
            theme: 'prime',
            html: true,
            sticky: true,
            position: 'top'
        });

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-success") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-prime") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-top") > -1
        ).toBe(true);

        // ????

    });

});
