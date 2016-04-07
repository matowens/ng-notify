/**
 * Test that we're able to dismiss our notification
 * by calling the dismiss method.
 */
describe('ngNotify dismiss method', function() {
    'use strict';

    var ngNotify,
        doc,
        timeout,
        interval;

    var message = 'Message to display during tests.';

    /**
     * Setup our application before running each test.
     */

    beforeEach(module('ngNotify'));

    beforeEach(inject(function($injector, $document, $timeout, $interval) {

        ngNotify = $injector.get('ngNotify');

        doc = $document;
        timeout = $timeout;
        interval = $interval;
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

        ngNotify.set(message, {
            'sticky': true
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        expect(
            element.css('opacity')
        ).toBeCloseTo('0', 1);

        timeout.flush();
        interval.flush(200);

        element = angular.element(
            document.querySelector('.ngn')
        );

        expect(
            element.css('opacity')
        ).toBeCloseTo('1', 1);

        ngNotify.dismiss();

        interval.flush(500);

        element = angular.element(
            document.querySelector('.ngn')
        );

        expect(
            element
        ).toEqual({});
    });

});
