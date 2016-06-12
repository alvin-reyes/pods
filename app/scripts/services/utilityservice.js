'use strict';

angular.module('erLoadUi')
    .service('utilityService', function(){
 
    this.checkShiftWithinMilitaryHourRange = function(s,e,c) {
        var hourRange = [];
        var militaryHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        
        if(s.getHours() > e.getHours()) {
            //  Start
            for(var i=0;i<militaryHours.length;i++) {
                if(militaryHours[i] >= s.getHours()) {
                    hourRange.push(militaryHours[i]);
                }
            }

            //  end
            for(var i=0;i<militaryHours.length;i++) {
                if(militaryHours[i] <= e.getHours()) {
                    hourRange.push(militaryHours[i]);
                }
            }

            for(var i=0;i<hourRange.length - 1;i++) {
                if(c.getHours() == hourRange[i]) {
                    return true;
                }
            }
            
        }else {
            return c.between(s,e.addMinutes(-1));
        }
        return false;
    }
    


});