/**
 * Test that each of our positions are properly set when
 * passed through on our message.
 */
describe('ngNotify position configuration', function() {
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
     * Configure each positions' test.
     */

    it('object position top is set', function() {

        ngNotify.set(message, {
            position: 'top'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-top") > -1
        ).toBe(true);
    });

    it('object position bottom is set', function() {

        ngNotify.set(message, {
            position: 'bottom'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-bottom") > -1
        ).toBe(true);
    });

    it('object position side is not set', function() {

        ngNotify.set(message, {
            position: 'side'
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-side") > -1
        ).toBe(false);
    });

});
