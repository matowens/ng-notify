/**
 * Test that our html boolean is properly set when
 * passed through on our message in an instance
 * without ngSanitize included.
 *
 * TODO: Can we force ngSanitize to unload to tirgger our error handling?
 */
/*jshint -W051 */
describe('ngNotify html without sanitize configuration', function() {
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

        // angular.module('ngSanitize',[]);

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
     * Configure html tests.
     */

    /*
    it('object html is set to true', function() {

        ngNotify.set(message, {
            html: false
        });

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(false);
    });

    it('object html is set to false', function() {

        ngNotify.set(message, {
            html: true
        });

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(true);
    });
    */

});
