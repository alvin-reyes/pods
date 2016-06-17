'use strict';

angular.module('erLoadUi')
    .service('shiftService', function(teamPodService,dataService,utilityService,patientNurseAssignmentService){
    
    
    this.getDoctorsOnShift = function(time) {
        var activeDoctorsOnShift = new Array();
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
        var inActiveRnsOutOfShift = new Array();
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
                    inActiveRnsOutOfShift.push(dataService.rns[i]);
                }
                
            }
        return inActiveRnsOutOfShift;
    }
    
    this.getRnsOnShift = function(time) {
        
        var activeRnsOnShift = new Array();
        var currentShiftTime = Date.parse(time);
        
        for(var i=0;i<dataService.rns.length;i++) {
            var shiftS = Date.parse(dataService.rns[i].shift_start);
            var shiftE = Date.parse(dataService.rns[i].shift_end);

            if(utilityService.checkShiftWithinMilitaryHourRange(
                shiftS,
                shiftE,
                currentShiftTime)
            ) {
                dataService.rns[i].member_status = 'active';
                console.log(dataService.rns[i].id);
                activeRnsOnShift.push(dataService.rns[i]);
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
    
    this.assignNurseToPods = function(rns,pods,numOfIns,limit) {
        
        var rnsC = new Array(rns)[0];
        var rnsDC = new DataCollection(rns);
        var rnsBalance = new Array();
        
        for(var a=0;a<pods.length;a++) {
            for(var b=0;b<numOfIns;b++) {
                if(pods[a].members.length < limit) {
                    for(var i=0;i<rns.length;i++) {
                        if(rns[i] != null && !teamPodService.checkIfNurseIfAssignedToPods(rns[i],dataService.teams)) 
                        {
                            pods[a].members.push(rns[i]);
                            break;
                        }
                    }
                }
            }
        }
    }
    
    this.unShiftDoctor = function(doc) {
        //  just reset the count of the doctor but not the pod.
        doc.count = 0;
        
    }
    
    this.shiftDoctor = function(pod,docTo) {
        //  make sure to get the count of the doctor
        var c = 0;
        console.log(pod.doctor);
        if(pod.doctor != null){
            if(pod.doctor.count != undefined) {
                c = pod.doctor.count;
            }
        }
    
        docTo.count = c; // transfer the count of patients.
        pod.doctor = docTo; // then replace.
        
    }
    
    this.replaceNursesOnPods = function(rns,pods) {
        
    }
    
    

});