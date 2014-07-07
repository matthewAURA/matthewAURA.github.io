function GPSController(){
    if ("geolocation" in navigator) {
    /* geolocation is available */
        return true
    } else {
        return false
    }
};

GPSController.prototype.getPosition = function(callback){
    navigator.geolocation.getCurrentPosition(function(position) {
        callback(position);
    });
};