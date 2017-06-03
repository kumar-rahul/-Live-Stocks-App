com.medianet.app.factory('Livefeed', function($websocket,dateFilter) {
			console.log("service | Livefeed");
      
	      var dataStream = $websocket(com.medianet.constant.socket_api);
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
		      		var prevObj = collection[index];
		      		// console.log("modified:: "+modifiedObj.time);
		      		// console.log("prev:: "+prevObj.time+" typeof: "+typeof(prevObj.time));

		      		var timeDiff = methods.updateTime(modifiedObj.time,prevObj.time);
		      		// console.log("timeDiff:: "+timeDiff);
		      		if(timeDiff>=60 && timeDiff<86400){
		      			modifiedObj.time = dateFilter(modifiedObj.time, "HH:mm a").toString();
		      		}else if(timeDiff>=86400){
		      			modifiedObj.time = dateFilter(modifiedObj.time, "dd-MMM HH:mm a").toString();
		      		}
	      		 	priceDiff = parseFloat(modifiedObj.price) - parseFloat(collection[index].price);
	      		 	modifiedObj.change = priceDiff.toFixed(2);

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
				// console.log("service | methods | containsObject");
			    var i;
			    for (i = 0; i < list.length; i++) {
			        if (list[i].ticker === obj.ticker) {
			            return true;
			        }
			    }
			    return false;
			},
			updateTime: function(mTime,pTime){
				// console.log("service | methods | updateTime");
				var sTimestamp;
				var oDate = new Date();
				if(com.medianet.constant.regex_time.test(pTime)){
					// console.log("pTime::(HH:mm a) "+pTime);
					oDate.setHours(
					    parseInt(pTime.substr(0, 2), 10),
					    parseInt(pTime.substr(3, 2), 10),
					    0,
					    0
					);
					console.log("oDate:: "+oDate);
					sTimestamp = oDate.getTime();
					// console.log("sTimestamp:: "+sTimestamp);
				}else if(com.medianet.constant.regex_day.test(pTime)){	
					// console.log("pTime::(dd-MMM HH:mm a) "+pTime);
					var temp = pTime.split(" ");
					var tempDate = temp[0].split("-");
					var tempTime = temp[1].split(":");
					var tempStr = oDate.toString();
					tempStr.replace(tempStr.substr(4,6),tempDate[1]+" "+tempDate[0]);
					oDate = new Date(tempStr);
					oDate.setHours(
					    parseInt(tempTime[0], 10),
					    parseInt(tempTime[1], 10),
					    0,
					    0
					);
					// console.log("oDate:: "+oDate);
					sTimestamp = oDate.getTime();
					// console.log("sTimestamp:: "+sTimestamp);
				}else{
					sTimestamp = pTime;
				}
		      	var diff = (mTime-pTime)/1000;
		      	return diff;
			}

	      };
      return methods;
    });