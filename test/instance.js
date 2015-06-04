/**
 * Confirm that our ngNotify module has been initialized
 * and that the template has been appended to the document.
 */
describe('ngNotify', function() {
    'use strict';

    var ngNotify,
        doc,
        element;

    /**
     * Setup our application before running each test.
     */

    beforeEach(
        module('ngNotify')
    );

    beforeEach(inject(function($injector, $document) {

        ngNotify = $injector.get('ngNotify');

        doc = $document;

        element = angular.element(
            document.querySelector('.ngn')
        );
    }));

    /**
     * Start from a clean slate between every single test.
     */

    afterEach(function() {
        doc.find('body').empty();
    });

    /**
     * Configure our initial test.
     */

    it('is initialized', function() {

        expect(
            element.hasClass('ng-scope')
        ).toBe(true);
    });

});
