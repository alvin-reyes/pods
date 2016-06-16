'use strict';

angular.module('erLoadUi').service('patientNurseAssignmentService', function(teamPodService,utilityService,dataService,notificationService){
    
    this.lastPodAssignment = '';
    
    this.reAssignPatientsToOnShiftNurses = function(activeNurses,inActiveNurses) {
        
        var newActiveArr = new Array(activeNurses)[0];
        var newJActiveArr = new Array();
        var inActiveNursesDc = new DataCollection(inActiveNurses);
        
        //  Get all those who is on shift but not assigned.
        for(var i=0;i<activeNurses.length;i++) {
            if(!teamPodService.checkIfNurseIfAssignedToPod(activeNurses[i],dataService.teams)) {
                newJActiveArr.push(activeNurses[i]);
            }
        }
        //  Loop through the inactive ones and replace them with active.
        for(var i=0;i<dataService.teams.length;i++) {
            for(var j=0;j<dataService.teams[i].members.length;j++) {
                var assignedP = dataService.teams[i].members[j].assigned_patient;
               
                if(inActiveNursesDc.query().filter({id:dataService.teams[i].members[j].id}).count() > 0) {
                    if(newJActiveArr[0] != null) {
                        dataService.teams[i].members[j] = newJActiveArr[0];
                        dataService.teams[i].members[j].assigned_patient = assignedP;

                        dataService.dataForReport.unshift({
                                'pod':dataService.teams[i],
                                'doctor':dataService.teams[i].doctor,
                                'rn':newJActiveArr[0],
                                'patient':assignedP});
                        newJActiveArr.splice(0,1);
                     }
                }
            }
        }
        
        //  Make sure that all inactive members are now out of the pods
        for(var i=0;i<dataService.teams.length;i++) {
            for(var j=0;j<dataService.teams[i].members.length;j++) {
                if(inActiveNursesDc.query().filter({id:dataService.teams[i].members[j].id}).count() > 0) {
                    dataService.teams[i].members.splice(j,1);
                }
            }
        }
        
        return newJActiveArr;
        
    }
//    
//    this.reAssignNursesPatientToNurses = function(teams, activeNurses) {
//        var x = 0;
//        for(var i=0;i<teams.length;i++) {
//            for(var j=0;j<teams[i].members.length;j++) { 
//                var assignedP = teams[i].members[j].assigned_patient;
//                if((teams[i].members[j] == undefined || teams[i].members[j].id != activeNurses[j+x].id)) {
//                    activeNurses[j+x].assigned_patient = assignedP;
//                    teams[i].members[j].member_status = 'inactive';
//
//                    dataService.dataForReport.unshift({
//                        'pod':teams[i],
//                        'doctor':teams[i].doctor,
//                        'rn':activeNurses[j+x],
//                        'patient':activeNurses[j+x].assigned_patient});
//
//                    x = j + x;
//                }
//            }
//        }
//        
//        for(var i=0;i<teams.length;i++) {
//            teams[i].members = [];
//        }
//        
//        return activeNurses;
//        
//    }
    
    this.reAssignPatientToNurse = function(teams,nurseFrom,nurseTo) {
        for(var i=0;i<teams.length;i++) {
            for(var j=0;j<teams[i].members.length;j++) {
                if(teams[i].members[j].id == nurseFrom.id) {
                    nurseTo.assigned_patient = teams[i].members[j].assigned_patient;
                    dataService.dataForReport.unshift({
                        'pod':teams[i],
                        'doctor':teams[i].doctor,
                        'rn':nurseTo,
                        'patient':nurseTo.assigned_patient});
                }
            }
        }
        
        nurseFrom.assigned_patient = [];
    }
    
    this.patientDischarge = function(patientId,nurseId) {
        var patient = null;
        for(var i=0;i<nurseId.assigned_patient.length;i++) {
            if(nurseId.assigned_patient[i].id = patientId) {
                patient = nurseId.assigned_patient[i];
                nurseId.assigned_patient.splice(i,1);
                break;
            }
        }
        notificationService.setSuccessNotification("Patient " + patient.name + " has been discharged ");
    }
    
    this.disablePod = function(team) {
        team.members = [];
        team.team_status = 'inactive';
    }
    
    //  For manual assignment
    this.assignPatientToNurse = function(patientName, patientAssignmentLimit, teams, nurseId) {
        console.log("manual");
        var teamName = "";
        var nurseName = "";
        var breakLine = false;
        var patient;
        
        for(var j=0;j<teams.length;j++) {
            if(teams[j]['team_status'] == 'active') {
                for(var x=0;x<teams[j]['members'].length;x++) {
                    if(
                        (
                         teams[j]['members'][x].member_status == 'active'
                         && teams[j]['members'][x].id == nurseId
                        )
                    ) {
                        nurseName = teams[j]['members'][x];
                        teamName = teams[j];
                        //  Create the data structure
                        patient = {'name': patientName};
                        teams[j]['members'][x]['assigned_patient'].unshift(patient);
                        teams[j]['count']++;
                        breakLine = true;
                        break;
                    }
                }
                if(breakLine){break;} // don't need to loop if it's already assigned.
            }
            if(breakLine){break;} // don't need to loop if it's already assigned.
        }
        dataService.dataForReport.unshift({'pod':teamName,'doctor':teamName.doctor,'rn':nurseName,'patient':patient});
        console.log(dataService.dataForReport);
        notificationService.setSuccessNotification("Assigned " + nurseName.name + " to " + patientName);
    }
    
    //  For automatic assignment
    this.assignPatient = function(patientName, patientAssignmentLimit, teams) {
        console.log("auto");
        var teamName = "";
        var nurseName = "";
        var breakLine = false;
        var numberOfPat = [];
        var patient;
        
        //  Before we assign, let's get the active POD with the least number of patients.
        var assignedPod = teamPodService.determinePatientAssignmentToPod(teams);
        var nursePod = this.determinePatientAssignedPodtoNurse(assignedPod.pod);
        //console.log(teamPodService.numberOfPatientsInPod(teams[0]));
        //  Team Assignment Algorithm Check.
        //  Not using AngularForEach since it doesn't have a break (damn)
        for(var j=0;j<teams.length;j++) {
            if(teams[j]['team_status'] == 'active') {
                for(var x=0;x<teams[j]['members'].length;x++) {
                    if(
                        (teams[j]['members'][x]['assigned_patient'].length < patientAssignmentLimit
                        && teams[j]['members'][x].member_status == 'active'
                         && teams[j].id == assignedPod.pod.id
                         && teams[j]['members'][x].id == nursePod.nurse.id
                        )
                    ) {
                        nurseName = teams[j]['members'][x];
                        teamName = teams[j];
                        //  Create the data structure
                        patient = {'name': patientName};
                        teams[j]['members'][x]['assigned_patient'].unshift(patient);
                        teams[j]['count']++;
                        breakLine = true;
                        break;
                    }
                }
                if(breakLine){break;} // don't need to loop if it's already assigned.
            }
            if(breakLine){break;} // don't need to loop if it's already assigned.
        }
        this.lastPodAssignment = teamName.name;
        dataService.dataForReport.unshift({'pod':teamName,'doctor':teamName.doctor,'rn':nurseName,'patient':patient});
        
        console.log(dataService.dataForReport);
        notificationService.setSuccessNotification("Assigned " + nurseName.name + " to " + patientName);   
    }
    
    this.determinePatientAssignedPodtoNurse = function(pod) {
        var nursePatientNumber = [];
        var total = 0;
        for(var j=0;j<pod.members.length;j++) {
            var podNurse = pod.members[j];
            if(pod.members[j].member_status == 'active') {
                nursePatientNumber.push({"nurse":podNurse, "total":pod.members[j].assigned_patient.length});
            }
        }
        
        //  get the pod with the lowest number and return pod.
        var lowestNumber = 9999;
        var nurseAssignment = '';
        for(var i=0;i<nursePatientNumber.length;i++) {
            if(lowestNumber > nursePatientNumber[i].total) {
                lowestNumber = nursePatientNumber[i].total;
                nurseAssignment = nursePatientNumber[i];
            }
        }
        return nurseAssignment;
    }
});