com.medianet.app.factory('Livefeed', function($websocket) {
			console.log("service | Livefeed");
      
	      var dataStream = $websocket('ws://stocks.mnet.website');
	      var collection = [];

	      dataStream.onMessage(function(message) {
	      	var tmpData = JSON.parse(message.data);
	      	for (var i = tmpData.length - 1; i >= 0; i--) {
	      		var priceDiff=0;
	      		var modifiedObj = {
	      			"ticker" : tmpData[i][0],
	      			"price" : tmpData[i][1].toFixed(2),
	      			"time": new Date().getTime(),
	      			"change": priceDiff
	      		};
		      	if(methods.containsObject(modifiedObj,collection)){
		      		var index = collection.findIndex(y => y.ticker==modifiedObj.ticker);
	      		 	priceDiff = parseFloat(modifiedObj.price) - parseFloat(collection[index].price);
	      		 	modifiedObj.change = priceDiff.toFixed(2);
	      		 	// modifiedObj.perchange = ((priceDiff/parseFloat(collection[index].price))*100).toFixed(2);
		      		collection[index] = modifiedObj;
		      	}else{
			        collection.push(modifiedObj);
		      	}
	      	}
	      });

	      var methods = {
	        collection: collection,
	        get: function() {
	          dataStream.send(JSON.stringify({ action: 'get' }));
	        },
	        close: function(){
		      dataStream.close();
	        },
			containsObject: function(obj, list) {
				console.log("service | methods | containsObject");
			    var i;
			    for (i = 0; i < list.length; i++) {
			        if (list[i].ticker === obj.ticker) {
			            return true;
			        }
			    }
			    return false;
			}

	      };
      return methods;
    });