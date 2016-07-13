'use strict';

describe('Component: PanicsComponent', function () {

  // load the controller's module
  beforeEach(module('logappApp'));

  var PanicsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PanicsComponent = $componentController('panics', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
