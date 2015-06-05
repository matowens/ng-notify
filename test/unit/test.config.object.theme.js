/**
 * Test that each of our themes are properly set when
 * passed through on our message.
 */
describe('ngNotify theme configuration', function() {
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
     * Configure each theme's test.
     */

    it('object theme prime is set', function() {

        ngNotify.set(message, {
            theme: 'prime'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-prime") > -1
        ).toBe(true);
    });

    it('object theme pastel is set', function() {

        ngNotify.set(message, {
            theme: 'pastel'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-pastel") > -1
        ).toBe(true);
    });

    it('object theme pitchy is set', function() {

        ngNotify.set(message, {
            theme: 'pitchy'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-pitchy") > -1
        ).toBe(true);
    });

    it('object theme random is not set', function() {

        ngNotify.set(message, {
            theme: 'random'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-random") > -1
        ).toBe(false);
    });

});
