'use strict';

angular.module('erLoadUi')
    .service('shiftService', function(teamPodService,dataService,utilityService,patientNurseAssignmentService){
    
    
    this.getDoctorsOnShift = function(time) {
        var activeDoctorsOnShift = [];
        var currentShiftTime = Date.parse(time);
        var shiftS = null;
        var shiftE = null;
        
        for(var i=0;i<dataService.doctors.length;i++) {
            
            shiftS = Date.parse(dataService.doctors[i].shift_start);
            shiftE = Date.parse(dataService.doctors[i].shift_end);
            if(utilityService.checkShiftWithinMilitaryHourRange(
                shiftS,
                shiftE,
                currentShiftTime)
            ) {
                activeDoctorsOnShift.unshift(dataService.doctors[i]);
            }
        }
        return activeDoctorsOnShift;
        
    }
    
    
    this.getRnsOnOutOfShift = function(time) {
        var inActiveRnsOutOfShift = [];
        var currentShiftTime = Date.parse(time);
        var shiftS = null;
        var shiftE = null;
        
        for(var i=0;i<dataService.rns.length;i++) {
                shiftS = Date.parse(dataService.rns[i].shift_start);
                shiftE = Date.parse(dataService.rns[i].shift_end);
                
                if(!utilityService.checkShiftWithinMilitaryHourRange(
                    shiftS,
                    shiftE,
                    currentShiftTime)
                ) {
                    dataService.rns[i].member_status = 'inactive';
                    inActiveRnsOutOfShift.unshift(dataService.rns[i]);
                }
                
            }
        return inActiveRnsOutOfShift;
    }
    
    this.getRnsOnShift = function(time) {
        
        var activeRnsOnShift = [];
        var currentShiftTime = Date.parse(time);
        var shiftS = null;
        var shiftE = null;
        
        for(var i=0;i<dataService.rns.length;i++) {
            shiftS = Date.parse(dataService.rns[i].shift_start);
            shiftE = Date.parse(dataService.rns[i].shift_end);

            if(utilityService.checkShiftWithinMilitaryHourRange(
                shiftS,
                shiftE,
                currentShiftTime)
            ) {
                dataService.rns[i].member_status = 'active';
                activeRnsOnShift.unshift(dataService.rns[i]);
            }
        }
        return activeRnsOnShift;
    }
    
    this.assignNewNurseToPods = function(rns,pods,number) {
        console.log(rns);
        var x = 0;
        for(var i=0;i<pods.length;i++) {
            for(var j=0;j<number;j++) {
                if(pods[i].members[j] == undefined || (pods[i].members[j].id != rns[j+x].id)) {
                    if(!teamPodService.checkIfNurseIfAssignedToPod(rns[j+x])) {
                    rns[j+x].member_status = 'active';
                    pods[i].members.push(rns[j+x]);
                    }
                }
            }
            x = j + x;
        }
    }
    
    this.assignNewNursesToPodsN = function(rns,pods) {
        var x = 0;
        for(var i=0;i<pods.length;i++) {
            var number = pods[i].num;
            for(var j=0;j<number;j++) {
                if(pods[i].teams.members[j] == undefined || (pods[i].teams.members[j].id != rns[j+x].id)) {
                    rns[j+x].member_status = 'active';
                    pods[i].teams.members.push(rns[j+x]);
                }
            }
            x = j + x;
        } 
    }
    
    this.assignNurseToPods = function(rns,pods,limitperpod) {
//        for(var i=0;i<pods.length;i++) {
//            pods[i].members = [];
//        }
        var x = 0;
        for(var i=0;i<pods.length;i++) {
            for(var j=0;j<limitperpod;j++) {
                if(pods[i].members[j] == undefined || (pods[i].members[j].id != rns[j+x].id)) {
                    if(!teamPodService.checkIfNurseIfAssignedToPod(rns[j+x])) {
                        rns[j+x].member_status = 'active';
                        pods[i].members.push(rns[j+x]);
                    }
                }
            }
            x = j + x;
        }
        

    }
    
    this.replaceNursesOnPods = function(rns,pods) {
        
    }
    
    

});