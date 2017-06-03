'use strict';

/**
 * @ngdoc function
 * @name medianetApp.controller:FeedController
 * @description
 * # FeedController
 * Controller of the medianetApp
 */
com.medianet.app.controller('FeedController', function ($scope,$state,Livefeed) {
  	console.log("controller | FeedController");
	
	(function(){
		$scope.feedData = Livefeed;
	}());

  	// $scope.closeFeed = function(){
	  // 	Livefeed.close();
  	// };

  });
