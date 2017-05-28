'use strict';

/**
 * @ngdoc function
 * @name medianetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the medianetApp
 */
com.medianet.app.controller('MainCtrl', function ($scope,$state) {
  	console.log("controller | MainCtrl");

  	$scope.navMain1 = function(){
	  	$state.go('stockfeed');
  	};
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
  });
