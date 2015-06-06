/**
 * Test that we're able to dismiss our notification
 * by calling the dismiss method.
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
     * Setup dismiss method tests.
     */

    it('is triggered', function() {

        spyOn(scope, 'dismiss');

        ngNotify.set(message);

        ngNotify.dismiss();

        expect(scope.dismiss).toHaveBeenCalled();
    });

});
