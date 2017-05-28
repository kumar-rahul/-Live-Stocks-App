'use strict';

/**
 * @ngdoc function
 * @name medianetApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the medianetApp
 */
com.medianet.app.controller('FeedCtrl', function ($scope,$state,Livefeed) {
  	console.log("controller | FeedCtrl");
	
	(function(){
		$scope.feedData = Livefeed;
	}());

  	// $scope.closeFeed = function(){
	  // 	Livefeed.close();
  	// };

  });
