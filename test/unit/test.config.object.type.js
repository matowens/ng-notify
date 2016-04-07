/**
 * Test that each of our types are properly set when
 * passed through on our message as an object.
 */
describe('ngNotify type object configuration', function() {
    'use strict';

    var ngNotify,
        doc;

    var message = 'Message to display during tests.';

    /**
     * Setup our application before running each test.
     */

    beforeEach(module('ngNotify'));

    beforeEach(inject(function($injector, $document) {

        ngNotify = $injector.get('ngNotify');

        doc = $document;
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

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'warn'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-warn") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'error'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-error") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'success'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-success") > -1
        ).toBe(true);
    });

    it('object type warn is set', function() {

        ngNotify.set(message, {
            type: 'grimace'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-grimace") > -1
        ).toBe(true);
    });

});
