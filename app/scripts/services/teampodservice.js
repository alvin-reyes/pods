

'use strict';

angular.module('erLoadUi').service('teamPodService', function(dataService){
    
    this.disablePod = function(team) {
        team.team_status = 'inactive';
    }
    
    this.disableAndShiftPod = function(team) {
        team.team_status = 'inactive';
        var memberArr = new Array();
        var memberArrDC = new DataCollection(memberArr);
        var teamsActive = new DataCollection(dataService.teams);
        var div = 0;
        
        for(var i=0;i<team.members.length;i++) {
            memberArr.push(team.members[i]);
        }
        
        if(memberArr.length > 0) {
            console.log(JSON.stringify(memberArr));
            div = memberArr.length/teamsActive.query().filter({team_status:'active'}).count();
            //  assign each members to currently active pods.
            for(var i=0;i<dataService.teams.length;i++) {
                if(dataService.teams[i].team_status == 'active') {
                    var j = 0;
                    while(j<div) {
                        if(memberArr[0] != null && memberArr[0] != '') {
                            if(!this.checkIfNurseIfAssignedToPod(memberArr[0],dataService.teams)){
                                console.log(memberArr[0]);
                                dataService.teams[i].members.push(memberArr[0]);
                            }
                            memberArr.splice(0,1);
                        }
                        j++;
                    }
                }
            }
        }
        team.members = [];
    }
    
    this.enablePod = function(team) {
        team.team_status = 'active';
    }
    
    this.activatePods = function(teams) {
        for(var i=0;i<teams.length;i++) {
            teams[i].team_status = 'active';    
        }
        
        return teams;
    }
    
    this.disablePodAndTransfer = function(team) {
        
    }
    
    
    this.activatePodsAndReAssign = function() {
        
    }
    
    this.checkIfNurseIfAssignedToNPods = function(nurse,pods) {
        for(var i=0;i<pods.length;i++) {
            for(var j=0;j<pods[i].members.length;j++) {
                if(pods[i].members[j].id == nurse.id) {
                    return true;
                }
            }  
        }
        return false;
    }
    
    this.checkIfNurseIfAssignedToPods = function(nurse,pods) {
        for(var i=0;i<pods.length;i++) {
            if(pods[i].team_status == 'active') {
                for(var j=0;j<pods[i].members.length;j++) {
                    if(pods[i].members[j].id == nurse.id) {
                        return true;
                    }
                }
            }  
        }
        return false;
    }
    
    this.checkIfNurseIfAssignedToPod = function(nurse) {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                for(var j=0;j<dataService.teams[i].members.length;j++) {
                    if(dataService.teams[i].members[j].id == nurse.id) {
                        return true;
                    }
                }
            }  
        }
        return false;
    }
    
    this.numberOfPatientsInPod = function(pod){
        var total = 0;
        for(var i=0;i<pod.members.length;i++) {
            if(pod.members[i].member_status == 'active') {
                total += pod.members[i].assigned_patient.length;
            }  
        }
        
        return total;
    }
    
    
    function getById(id, myArray) {
    return myArray.filter(function(obj) {
          if(obj.doc.id == id) {
            return obj 
          }
        })[0]
    }
    
    this.determinePatientAssignmentToDoctorPod = function(pods) {
        
        
        var doctorArr = new Array();
        var doctorArrDC = new DataCollection(doctorArr);
        
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                if(doctorArrDC.query().filter({id:dataService.teams[i].doctor.id}).count() == 0) {
                    doctorArrDC.insert(dataService.teams[i].doctor);
                }
            }
        }
        
        //  get the doctor with the lowest number and return pod.
        var lowestNumberD = 9999;
        var docAssignment = '';
        for(var i=0;i<doctorArrDC._data.length;i++) {
            if(lowestNumberD > doctorArrDC._data[i].count) {
                lowestNumberD = doctorArrDC._data[i].count;
                docAssignment = doctorArrDC._data[i];
            }
        }
        //  loop through the pods
        var assignedPods = [];
        for(var i=0;i<pods.length;i++) {
            if(pods[i].team_status == 'active' && pods[i].doctor.id == docAssignment.id) {
                assignedPods.push({"pod":pods[i]});
            }
        }
        //  Get the lowest number of assigned patient of pod
        var lowestNumberP = 9999;
        var podAssignment = '';
        for(var i=0;i<assignedPods.length;i++) {
            console.log(assignedPods[i].pod.count);
            if(lowestNumberP > assignedPods[i].pod.count) {
                lowestNumberP = assignedPods[i].pod.count;
                podAssignment = assignedPods[i];
            }
        }
        return podAssignment;
    }
    
    this.determinePatientAssignmentToPod = function(pods) {
        var podsPatientNumber = [];
        
        for(var i=0;i<pods.length;i++) {
            var total = 0;
            var pod = pods[i];
            if(pod.team_status == 'active') {
                for(var j=0;j<pods[i].members.length;j++) {
                    if(pods[i].members[j].member_status == 'active') {
                        total += pods[i].members[j].assigned_patient.length;
                    }  
                }
                podsPatientNumber.push({"pod":pod, "total":total});
            }
        }
        
        //  get the pod with the lowest number and return pod.
        var lowestNumber = 9999;
        var podAssignment = '';
        for(var i=0;i<podsPatientNumber.length;i++) {
            if(lowestNumber > podsPatientNumber[i].total) {
                lowestNumber = podsPatientNumber[i].total;
                podAssignment = podsPatientNumber[i];
            }
        }
        //console.log(podAssignment);
        return podAssignment;
    }
    

    
});