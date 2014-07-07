Calculator = {setup:function(){
    //Set up multipliers
    var motors = [1,1.6,2.4];
    var driveTrains = [1,Math.sqrt(2)];
    var wheels = [4/4,3.25/4,2.75/4];
    var gears = [12,36,60,84];
    var sprockets = [6,12,15,18,24,30];
    var ratios = [];
    for (i in gears){
        for (j in gears){
            if (i != j || (i == 0 && j == 0)){
              ratios.push({ratio:gears[i]/gears[j],input:gears[i],output:gears[j],type:'Gears'});
            }
        }

    }

    for (i in sprockets){
        for (j in sprockets){
            if (i != j ){
            ratios.push({ratio:sprockets[i]/sprockets[j],input:sprockets[i],output:sprockets[j],type:'Chain'});
          }
        }

    }
    this.speeds = [];
    for (m in motors){
        for (d in driveTrains){
            for (w in wheels){
                for (r in ratios){
                var speed = motors[m]*driveTrains[d]*wheels[w]*ratios[r].ratio;
                this.speeds.push({motor:motors[m],driveTrain:driveTrains[d],wheel:wheels[w],external:ratios[r],ratio:speed});
                }
            }
        }
    }
    this.speeds.sort(function(a,b){
        return a.ratio > b.ratio ? 1 : -1;
    });
},update:function(lowerspeed,upperspeed){
    var acceptedspeeds = [];
    for(i=0;i<this.speeds.length;i++){
        if(this.speeds[i].ratio > lowerspeed && this.speeds[i].ratio < upperspeed){
            acceptedspeeds.push(this.speeds[i]);    
        }
    }
    return acceptedspeeds;
}
}