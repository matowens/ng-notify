/**
 * Confirm that all default configs are set when utilizing
 * ngNotify's basic usage.
 */
describe('ngNotify default configuration', function() {
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
     * Configure each default test.
     */

    it('message is not set', function() {

        ngNotify.set('');

        var element = angular.element(
            document.querySelector('.ngn')
        );

        expect(
            element
        ).toEqual({});
    });

    it('message is set', function() {

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyMessage
        ).toEqual(message);
    });

    it('position is bottom', function() {

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-bottom") > -1
        ).toBe(true);
    });

    it('type is info', function() {

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('sticky is false', function() {

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);
    });

    it('html is false', function() {

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(false);
    });

    it('duration is 3000', function() {

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

});
