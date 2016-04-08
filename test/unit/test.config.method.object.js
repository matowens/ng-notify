/**
 * Test that each of our configuration settings are properly set when
 * passed through on our config method as an object.
 */
describe('ngNotify config method', function() {
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
     * Setup config method tests.
     *
     * Just need to test a single, non-default param here for
     * each config option.  In-depth testing for every available option
     * is done in each config's specific test.
     */

    it('is empty', function() {

        ngNotify.config();

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('type warn is set', function() {

        ngNotify.config({
            type: 'warn'
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-warn") > -1
        ).toBe(true);
    });

    it('theme pastel is set', function() {

        ngNotify.config({
            theme: 'pastel'
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-pastel") > -1
        ).toBe(true);
    });

    it('html true is set', function() {

        ngNotify.config({
            html: true
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(true);
    });

    it('sticky true is set', function() {

        ngNotify.config({
            sticky: true
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        timeout.flush();
        interval.flush(200);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);

        // Expect to always be visible, even after default duration would have expired.

        timeout.flush(6000);
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

    it('position top is set', function() {

        ngNotify.config({
            position: 'top'
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-top") > -1
        ).toBe(true);
    });

    it('duration abc is set', function() {

        // Should revert to default of 3000...

        ngNotify.config({
            duration: 'abc'
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('0');

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

    it('duration 1000 is set', function() {

        ngNotify.config({
            duration: 1000
        });

        // Initial fadeIn.

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('0');

        timeout.flush();
        interval.flush(200);

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('1');

        // 1ms before the duration concludes, notification should still be visible.

        timeout.flush(999);
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

    it('all non-default options (except duration) are set', function() {

        // Tests all options EXCEPT for duration.
        // Being sticky, duration fades will not apply.

        ngNotify.config({
            type: 'success',
            theme: 'prime',
            html: true,
            sticky: true,
            position: 'top',
            duration: 3000
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        timeout.flush();
        interval.flush(200);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-success") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-prime") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-top") > -1
        ).toBe(true);

        // Expect to always be visible, even after default duration would have expired.

        timeout.flush(8000);
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

    it('all non-default options (except sticky) are set', function() {

        // Tests all options EXCEPT for sticky.
        // Having a duration, stickiness will not apply.

        ngNotify.config({
            type: 'success',
            theme: 'prime',
            html: true,
            duration: 9876,
            position: 'top',
            sticky: false
        });

        // Initial fadeIn.

        ngNotify.set(message);

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

        timeout.flush();
        interval.flush(200);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-success") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-prime") > -1
        ).toBe(true);

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(true);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-top") > -1
        ).toBe(true);

        // Duration tests...

        expect(
            element.css('display')
        ).toBe('block');

        expect(
            element.css('opacity')
        ).toBe('1');

        // 1ms before the duration concludes, notification should still be visible.

        timeout.flush(9875);
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

});
