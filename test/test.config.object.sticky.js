/**
 * Test that our sticky boolean is properly set when
 * passed through on our message.
 */
describe('ngNotify sticky configuration', function() {
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
     * Configure sticky tests.
     */

    it('object sticky is set to true', function() {

        ngNotify.set(message, {
            sticky: false
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);
    });

    it('object sticky is set to false', function() {

        ngNotify.set(message, {
            sticky: true
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);
    });

});
