'use strict';

describe('Component: FoodsComponent', function () {

  // load the controller's module
  beforeEach(module('logappApp'));

  var FoodsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    FoodsComponent = $componentController('foods', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
