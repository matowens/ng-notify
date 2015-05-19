describe('ngNotify initialize', function() {
    'use strict';

    var ngNotify;
    var log;

    beforeEach(module('ngNotify'));

    beforeEach(inject(function($injector) {
        ngNotify = $injector.get('ngNotify');
    }));

    it ('is in dom', function() {

        ngNotify.set('message', 'error');

        var ngn = jQuery('.ngn')[0];

        var classes = jQuery(ngn).attr('class');

        console.log(ngn);

        expect(ngn).toBeInDOM();
    });

    it ('is to be hidden', function() {

        var message = "ohai";

        ngNotify.set(message);

        var ngn = jQuery('.ngn')[0];

        // expect(ngn).toHaveText(message);

        expect(ngn).not.toBeVisible();
        //expect(ngn).toHaveCss({ display: 'none' });
    });


});
