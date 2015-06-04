/**
 * Test that each of our types are properly set when
 * passed through on our message as an object.
 */
describe('ngNotify type object configuration', function() {
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
     * Configure type object tests.
     */

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'info'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'warn'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-warn") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'error'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-error") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'success'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-success") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'grimace'
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-grimace") > -1
        ).toBe(true);
    });

});
