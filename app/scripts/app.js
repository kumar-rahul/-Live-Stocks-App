'use strict';

/**
 * @ngdoc overview
 * @name medianetApp
 * @description
 * # medianetApp
 *
 * Main module of the application.
 */
var com = com || {};
com.medianet = com.medianet || {};
com.medianet.constant = com.medianet.constant || {};
com.medianet.appname = 'medianetApp';

com.medianet.app = angular.module(com.medianet.appname, [
    'ui.router','ngWebSocket'])

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('stockfeed', {
            url: '/stockfeed',
            templateUrl: 'views/stockfeed.html',
            controller: 'FeedCtrl'
        });

     $urlRouterProvider.otherwise('stockfeed');

  });
