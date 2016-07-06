'use strict';

angular.module('logappApp.auth', ['logappApp.constants', 'logappApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
