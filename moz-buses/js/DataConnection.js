

function DataConnection(key){
    this.apiKey = key;
}

DataConnection.prototype.getStopInfo = function(stop,callback){
    
    $.ajax("https://api.at.govt.nz/v1/gtfs/stopTimes/stopId/"+stop+"?api_key="+this.apiKey,{
        jsonp:"callback",
        dataType:"jsonp",
        success:function(response){
            callback(response);
        }
        
    });
    
};

DataConnection.prototype.getStopCode = function(stop,callback,failcallback){
    
    $.ajax("https://api.at.govt.nz/v1/gtfs/stops/StopCode/"+stop+"?api_key="+this.apiKey,{
        jsonp:"callback",
        dataType:"jsonp",
        success:function(response){
            callback(response);
        },
        failure:function(response){
            failcallback(response);
        }
        
    });
    
};


DataConnection.prototype.getRoutesAtStop = function(stop,callback){
    
    $.ajax("https://api.at.govt.nz/v1/gtfs/routes/stopId/"+stop+"?api_key="+this.apiKey,{
        jsonp:"callback",
        dataType:"jsonp",
        success:function(response){
            callback(response);
        }
        
    });
    
};



DataConnection.prototype.getTripInfo = function(tripID,callback){   
    var hasResult = false;
    $.ajax("https://api.at.govt.nz/v1/gtfs/trips/tripId/"+tripID+"?api_key="+this.apiKey,{
        jsonp:"callback",
        dataType:"jsonp",
        success:function(response){
                $.ajax("https://api.at.govt.nz/v1/public/realtime/vehiclelocations?tripid="+tripID+"&api_key="+apiKey,{
                    jsonp:"callback",
                    dataType:"jsonp",
                    success:function(positionResponse){
                        //response.response[0].latitude = positionResponse.response.entity[0].vehicle.position.latitude;
                        //response.response[0].longitude = positionResponse.response.entity[0].vehicle.position.longitude;
                        callback(response);
                    }
                }); 
        }
        
    }); 
};

DataConnection.prototype.getNearbyStops = function(lat,long,distance,callback){
     $.ajax("https://api.at.govt.nz/v1/gtfs/stops/geosearch?lat="+lat+"&lng="+long+"&distance="+distance+"&api_key="+this.apiKey,{
        jsonp:"callback",
        dataType:"jsonp",
        success:function(response){
            callback(response);
        }
        
    });
};