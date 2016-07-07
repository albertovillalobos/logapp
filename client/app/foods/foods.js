'use strict';

angular.module('logappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('foods', {
        url: '/foods',
        template: '<foods></foods>'
      });
  });
