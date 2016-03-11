/**
 * Test that we're able to add a custom type via the
 * addType method.
 */
describe('ngNotify addType method', function() {
    'use strict';

    var ngNotify,
        doc;

    var message = 'Message to display during tests.';
    var newTypeName = 'notice';
    var newTypeClass = 'ngn-notice';

    /**
     * Setup our application before running each test.
     */

    beforeEach(module('ngNotify'));

    beforeEach(inject(function($injector, $document) {

        ngNotify = $injector.get('ngNotify');

        doc = $document;
    }));

    /**
     * Start from a clean slate between every single test.
     */

    afterEach(function() {
        doc.find('body').empty();
    });

    /**
     * Setup addType method tests.
     */

    it('string type notice is not set', function() {

        ngNotify.set(message, newTypeName);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(false);
    });

    it('object type notice is not set', function() {

        ngNotify.set(message, {
            type: newTypeName
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(false);
    });

    it('config type notice is not set', function() {

        ngNotify.config({
            type: newTypeName
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(false);
    });

    it('empty type notice is not set', function() {

        ngNotify.addType();

        ngNotify.config({
            type: newTypeName
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(false);
    });

    it('string type notice is set', function() {

        ngNotify.addType(newTypeName, newTypeClass);

        ngNotify.set(message, newTypeName);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(true);
    });

    it('object type notice is set', function() {

        ngNotify.addType(newTypeName, newTypeClass);

        ngNotify.set(message, {
            type: newTypeName
        });

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(true);
    });

    it('config type notice is set', function() {

        ngNotify.addType(newTypeName, newTypeClass);

        ngNotify.config({
            type: newTypeName
        });

        ngNotify.set(message);

        var element = angular.element(
            document.querySelector('.ngn')
        );

        var scope = element.scope();

        expect(
            scope.ngNotify.notifyClass.indexOf(newTypeClass) > -1
        ).toBe(true);
    });

});
