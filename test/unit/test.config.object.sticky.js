/**
 * Test that our sticky boolean is properly set when
 * passed through on our message.
 */
describe('ngNotify sticky configuration', function() {
    'use strict';

    var ngNotify,
        doc,
        interval,
        timeout,
        element,
        scope;

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
     * Configure sticky tests.
     */

    it('object sticky set to false overrides config', function() {

        ngNotify.config({
            sticky: true
        });

        ngNotify.set(message, {
            sticky: false
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);

    });

    it('object sticky is set to false', function() {

        // Default duration should hold true, fadingIn and fadingOut.

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('none');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(0);

        ngNotify.set(message, {
            sticky: false
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);

        interval.flush(200);

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('block');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(1);

        // 1ms before the duration concludes, notification should still be visible.

        timeout.flush(2999);

        interval.flush(500);

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('block');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(1);

        // Step forward 1ms and our fadeOut should be triggered.

        timeout.flush(1);

        interval.flush(500);

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('none');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(0);

    });

    it('object sticky is set to true', function() {

        // Notification should remain well after the default
        // duration would have expired.

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('none');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(0);

        ngNotify.set(message, {
            sticky: true
        });

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);

        // Initial fadeIn.

        interval.flush(200);

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('block');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(1);

        // Message should remain until we manually dismiss it...

        timeout.flush(5000);

        interval.flush(500);

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('block');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(1);

        // Manually closing the notification should hide it.

        ngNotify.dismiss();

        interval.flush(500);

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('none');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(0);

    });

});
