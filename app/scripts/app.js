'use strict';

/**
 * @ngdoc overview
 * @name medianetApp
 * @description
 * # medianetApp
 *
 * Main module of the application.
 */
// angular
//   .module('medianetApp', [
//     'ui.router',
//     'ngWebsocket'
//   ])

var com = com || {};
com.medianet = com.medianet || {};
com.medianet.appname = 'medianetApp';

com.medianet.app = angular.module(com.medianet.appname, [
    'ui.router','ngWebSocket'])

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        // .state('main', {
        //     url: '/main',
        //     templateUrl: 'views/main.html',
        //     controller: 'MainCtrl'
        // })
        .state('stockfeed', {
            url: '/stockfeed',
            templateUrl: 'views/stockfeed.html',
            controller: 'FeedCtrl'
        });

    // $urlRouterProvider.otherwise('main');
     $urlRouterProvider.otherwise('stockfeed');

  });
