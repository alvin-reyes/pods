'use strict';

angular.module('erLoadUi')
    .service('erloadAutoStepsService', function(dataService,shiftService,teamPodService,patientNurseAssignmentService,notificationService){
    
    //  This properly balance out the sorting pods.
    this.balancePods = function(by) {
        var membersArr = new Array();
        for(var i=0;i<dataService.teams.length;i++) {
            for(var j=0;j<dataService.teams[i].members.length;j++) {
                membersArr.push(dataService.teams[i].members[j]);
            }
        }
        
        var div = Math.ceil(membersArr.length/dataService.teams.length);
        
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                dataService.teams[i].members = [];
                var j = 0;
                while(j<div) {
                    if(membersArr[0] != null) {
                        if(!teamPodService.checkIfNurseIfAssignedToPod(membersArr[0],dataService.teams)){
                            dataService.teams[i].members.push(membersArr[0]);
                        }
                        membersArr.splice(0,1);
                    }
                    j++;
                }
            }
        }
    }
    
    //  5:30AM
    this.step1Logic = function() {
        
        notificationService.setSuccessNotification("5:30AM Shift has started");
        var time = "5:30";
        
        var doctrosOnShift = shiftService.getDoctorsOnShift(time);
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        
        var pods = teamPodService.activatePods(
                   [dataService.teams[0],
                    dataService.teams[1],
                    dataService.teams[2],
                    dataService.teams[3]]);
        
        var activeRns = patientNurseAssignmentService.
            reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        //  Re-assign the patient from the out of shifts to the on shifts.
        shiftService.assignNurseToPods(activeRns,pods,2,2);
        
        shiftService.shiftDoctor(
            dataService.teams[0],
            dataService.doctors[0]
        );
        
        shiftService.shiftDoctor(
            dataService.teams[1],
            dataService.doctors[0]
        );
        
        shiftService.shiftDoctor(
            dataService.teams[2],
            dataService.doctors[1]
        );
        
        shiftService.shiftDoctor(
            dataService.teams[3],
            dataService.doctors[1]
        );
        
        teamPodService.disableAndShiftPod(dataService.teams[4]);
        
        this.balancePods(2);
    }
      
  
    //  7:00AM
    this.step2Logic = function() {
        notificationService.setSuccessNotification("7:00AM Shift has started");
        var time = "7:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        
        var pods = [dataService.teams[0],
                    dataService.teams[1],
                    dataService.teams[2],
                    dataService.teams[3]];
        
        //var activeRns = patientNurseAssignmentService.reAssignNursesPatientToNurses(pods,rnsOnShift);
        var activeRns = patientNurseAssignmentService.reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        shiftService.assignNurseToPods(activeRns,pods,2,2);
        shiftService.reCountPodDocPat();
        console.log(dataService.teams);
    }

    //  8:00AM 
    this.step3Logic = function() {
        notificationService.setSuccessNotification("8:00AM Shift has started");
        var time = "8:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        shiftService.shiftDoctor(
            dataService.teams[2],
            dataService.doctors[2]
        );
        
    }
    
    //  9:00AM
    this.step4Logic = function() {
        notificationService.setSuccessNotification("9:00AM Shift has started");
        var time = "9:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);

        shiftService.shiftDoctor(
            dataService.teams[1],
            dataService.doctors[3]
        );
    }
    
    //  11:00AM
    this.step5Logic = function() {
        notificationService.setSuccessNotification("11:00AM Shift has started");
        var time = "11:00";
        dataService.teams[4].team_status = 'active';
        dataService.teams[4].doctor = new Array(dataService.doctors[4])[0];
        
        var pods = [dataService.teams[4]];
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        shiftService.assignNurseToPods(activeRns,pods,2,2);
    }
    
    //  3:00PM
    this.step6Logic = function() {
        notificationService.setSuccessNotification("3:00PM Shift has started");
        //  POD 1 Doctor 6
        var time = "15:00";
        var pods = [
            dataService.teams[0],
            dataService.teams[1],
            dataService.teams[2],
            dataService.teams[3],
            dataService.teams[4]];
        
        dataService.teams[0].doctor = dataService.doctors[5];
        
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);

        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
  
        //  Assigned new RNS on shift to pods.
        shiftService.assignNurseToPods(activeRns,pods,1,3);
    }
    
    //  4:00PM
    this.step7Logic = function() {
        notificationService.setSuccessNotification("4:00PM Shift has started");
        var time = "16:00";
        var pods = [dataService.teams[3]];
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        shiftService.shiftDoctor(
            dataService.teams[3],
            dataService.doctors[6]
        );

    }
    
    //  6:30PM
    this.step8Logic = function() {
        notificationService.setSuccessNotification("6:30PM Shift has started");
        //  POD 1 Doctor 6
        var time = "18:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        shiftService.shiftDoctor(
            dataService.teams[2],
            dataService.doctors[7]
        );
    }

    //  7:00PM  
    this.step9Logic = function() {
        notificationService.setSuccessNotification("7:00PM Shift has started");
        var time = "19:00";
        var pods = [
            dataService.teams[0],
            dataService.teams[1],
            dataService.teams[2],
            dataService.teams[3],
            dataService.teams[4]];
        
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);

        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
    }
    
    //  8:00PM
    this.step10Logic = function() {
        notificationService.setSuccessNotification("8:00PM Shift has started");
        var time = "20:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        shiftService.shiftDoctor(
            dataService.teams[1],
            dataService.doctors[8]
        );
    }
    
    //  9:30PM
    this.step11Logic = function() {
        notificationService.setSuccessNotification("9:30PM Shift has started");
        var time = "21:30";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);

        shiftService.shiftDoctor(
            dataService.teams[3],
            dataService.doctors[9]
        );
        
        shiftService.shiftDoctor(
            dataService.teams[4],
            dataService.doctors[10]
        );
    }
    
    //  10:45PM
    this.step12Logic = function() {
        notificationService.setSuccessNotification("10:45PM Shift has started");
        var time = "22:45";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var pods = [
             dataService.teams[0],
             dataService.teams[1],
             dataService.teams[2],
             dataService.teams[4]];
        
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        teamPodService.disablePod(dataService.teams[3]);

        shiftService.shiftDoctor(
            dataService.teams[0],
            dataService.doctors[9]
        );
    }
    
    //  11:00PM
    this.step13Logic = function() {
        
        //  Discharge all patient on POD 4
        for(var i=0;i<dataService.teams[3].members.length;i++) {
            for(var j=0;j<dataService.teams[3].members[i].assigned_patient.length;j++) {
                patientNurseAssignmentService.patientDischarge(
                    dataService.teams[3].members[i].assigned_patient[j],
                    dataService.teams[3].members[i]);   
            }   
        }
        
        notificationService.setSuccessNotification("11:00PM Shift has started");
        var time = "23:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);

        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        dataService.teams[3].doctor = null;
        
        teamPodService.disableAndShiftPod(dataService.teams[3]);
        
    }
    
    //  2:00AM  
    this.step14Logic = function() {
        notificationService.setSuccessNotification("2:00AM Shift has started");
        var time = "2:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        dataService.teams[2].doctor = null;
        teamPodService.disableAndShiftPod(dataService.teams[2]);
    }
     
    //  3:00AM
    this.step15Logic = function() {
        var time = "3:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        teamPodService.enablePod(dataService.teams[4]);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        teamPodService.disableAndShiftPod(dataService.teams[2]);
        teamPodService.disableAndShiftPod(dataService.teams[3]);
        
        dataService.teams[2].doctor = null;
        dataService.teams[3].doctor = null;
        
        shiftService.shiftDoctor(
            dataService.teams[4],
            dataService.doctors[10]
        );

    }
    
    //  4:00AM
    this.step16Logic = function() {
        var time = "4:00";
        var rnsOnShift = shiftService.getRnsOnShift(time);
        var rnsOutOfShift = shiftService.getRnsOnOutOfShift(time);
        var activeRns = patientNurseAssignmentService.
        reAssignPatientsToOnShiftNurses(rnsOnShift,rnsOutOfShift);
        
        teamPodService.disableAndShiftPod(dataService.teams[1]);
        teamPodService.disableAndShiftPod(dataService.teams[2]);
        teamPodService.disableAndShiftPod(dataService.teams[3]);
        
        dataService.teams[1].doctor = null;
        dataService.teams[2].doctor = null;
        dataService.teams[3].doctor = null;
        
        shiftService.shiftDoctor(
            dataService.teams[4],
            dataService.doctors[9]
        );
    }
    
    
});