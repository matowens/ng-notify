/**
 * Confirm that all default configs are set when utilizing
 * ngNotify's basic usage.
 *
 * TODO: add tests for durations
 */
describe('ngNotify default configuration', function() {
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

        ngNotify.set(message);

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
     * Configure each default test.
     */

    it('message is set', function() {

        expect(
            scope.ngNotify.notifyMessage
        ).toEqual(message);
    });

    it('position is bottom', function() {

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-bottom") > -1
        ).toBe(true);
    });

    it('type is info', function() {

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('sticky is false', function() {

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);
    });

    it('html is false', function() {

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(false);
    });

    it('duration is 3000', function() {

        // ????

    });

});
