'use strict';

angular.module('logappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('panics', {
        url: '/panics',
        template: '<panics></panics>'
      });
  });
