/**
 * Confirm that all default configs are set when utilizing
 * ngNotify's basic usage.
 */
describe('ngNotify default configuration', function() {
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
     * Configure each default test.
     */

    it('message is not set', function() {

        ngNotify.set();

        expect(
            scope.ngNotify.notifyMessage
        ).toEqual('');
    });

    it('message is set', function() {

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyMessage
        ).toEqual(message);
    });

    it('position is bottom', function() {

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-bottom") > -1
        ).toBe(true);
    });

    it('type is info', function() {

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-info") > -1
        ).toBe(true);
    });

    it('sticky is false', function() {

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyClass.indexOf("ngn-sticky") > -1
        ).toBe(false);
    });

    it('html is false', function() {

        ngNotify.set(message);

        expect(
            scope.ngNotify.notifyHtml
        ).toBe(false);
    });

    it('duration is 3000', function() {

        expect(
            scope.ngNotify.notifyStyle.display
        ).toBe('none');

        expect(
            scope.ngNotify.notifyStyle.opacity
        ).toBe(0);

        // Initial fadeIn.

        ngNotify.set(message);

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

});
