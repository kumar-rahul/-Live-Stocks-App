com.medianet.app.directive('dirDate', function(dateFilter) {
	console.log("directive | dirDate");
	function link(scope, element, attrs) {
	    var timeoutId;

	    // console.log("time", scope.display);

	    // function updateTime() {
	    // 	var time = new Date(scope.display);
	    // 	var currentTime = new Date();
	    // 	if((currentTime.getMinutes() - time.getMinutes()) === 0){
		   //    element.text(dateFilter("A few seconds ago"));
	    // 	}else if((currentTime.getDate() - time.getDate()) === 0){
		   //    element.text(dateFilter(time, "h:mm a"));
	    // 	}else{
		   //    element.text(dateFilter(time, "M/d/yy h:mm a"));
	    // 	}
	    // }

	    scope.$watch(attrs.dirDate, function() {
	      element.text(dateFilter("A few seconds ago"));
//	      updateTime();
	    },true);

	    element.on('$destroy', function() {
	      $interval.cancel(timeoutId);
	    });
	}
    return {
    	restrict: 'EA',
    	scope: {
    		display : '='
    	},
    	link: link
	};
});