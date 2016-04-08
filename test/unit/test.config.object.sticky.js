/**
 * Test that our sticky boolean is properly set when
 * passed through on our message.
 */
describe('ngNotify sticky configuration', function() {
    'use strict';

    var ngNotify,
        doc,
        interval,
        timeout;

    var message = 'Message to display during tests.';

    /**
     * Setup our application before running each test.
     */

    beforeEach(module('ngNotify'));

    beforeEach(inject(function($injector, $document, $interval, $timeout) {

        ngNotify = $injector.get('ngNotify');

        doc = $document;
        interval = $interval;
        timeout = $timeout;
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

    it('object sticky set to false overrides config', function() {

        ngNotify.config({
            sticky: true
        });

        ngNotify.set(message, {
            sticky: false
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);
    });

    it('object sticky is set to false', function() {

        // Default duration should hold true, fadingIn and fadingOut.

        ngNotify.set(message, {
            sticky: false
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('0');

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);

        timeout.flush();
        interval.flush(200);

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('1');

        // 1ms before the duration concludes, notification should still be visible.

        timeout.flush(2999);

        interval.flush(500);

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('1');

        // Step forward 1ms and our fadeOut should be triggered.

        timeout.flush(1);

        interval.flush(500);

        expect(
            element.css('display')
        ).toBe('none');

        expect(
            element.css('opacity')
        ).toBeCloseTo('0', 1);
    });

    it('object sticky is set to true', function() {

        // Notification should remain well after the default
        // duration would have expired.

        ngNotify.set(message, {
            sticky: true
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('0');

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);

        // Initial fadeIn.

        timeout.flush();
        interval.flush(200);

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('1');

        // Message should remain until we manually dismiss it...

        timeout.flush(5000);

        interval.flush(500);

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('1');

        // Manually closing the notification should hide it.

        ngNotify.dismiss();

        interval.flush(500);

        expect(
            element.css('display')
        ).toBe('none');

        expect(
            element.css('opacity')
        ).toBeCloseTo('0', 1);
    });

});
