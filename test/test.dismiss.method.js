/**
 * Test that we're able to dismiss our notification
 * by calling the dismiss method.
 *
 * TODO: Add ability to test dismiss via scope?
 */
describe('ngNotify dismiss method', function() {
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
     * Setup addTheme method tests.
     */

    it('is triggered', function() {

        /*

        ngNotify.set(message);

        console.log(scope.ngNotify);

        ngNotify.dismiss();

        console.log(scope.ngNotify);

        */

    });

});
