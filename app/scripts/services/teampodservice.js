

'use strict';

angular.module('erLoadUi').service('teamPodService', function(dataService){

    this.disablePod = function(team) {
        team.members = [];
        team.team_status = 'inactive';
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
    
    this.determinePatientAssignmentToDoctor = function(pods) {
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
                podsPatientNumber.push({"pod":pod, "doctor":pod.doctor, "total":total});
            }
        }
         console.log("PP");
        console.log(podsPatientNumber);
        var docPatientNumber = [];
        for(var j=0;j<podsPatientNumber.length;j++) {
            var total = 0;
            if(!getById(podsPatientNumber[j].doctor.id,docPatientNumber)) {
                docPatientNumber.push({
                    "doc":podsPatientNumber[j].doctor,
                    "total":podsPatientNumber[j].total});
            }
        }
        console.log("PC")
        console.log(docPatientNumber);
        //  get the pod with the lowest number and return pod.
        var lowestNumber = 9999;
        var docAssignment = '';
        for(var i=0;i<docPatientNumber.length;i++) {
            if(lowestNumber > docPatientNumber[i].total) {
                lowestNumber = docPatientNumber[i].total;
                docAssignment = docPatientNumber[i];
            }
        }
        console.log(">>> D");
        console.log(docAssignment);
        //  loop through the pods
        var assignedPods = [];
        for(var i=0;i<pods.length;i++) {
            if(pods[i].team_status == 'active' && pods[i].doctor == docAssignment.doc) {
                assignedPods.push(pods[i]);
            }
        }
        console.log(">>> P");
        console.log(assignedPods);
        return this.determinePatientAssignmentToPod(assignedPods);
        //return assignedPods;
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