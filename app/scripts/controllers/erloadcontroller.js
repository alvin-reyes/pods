'use strict';


angular.module('erLoadUi')
  .controller('erloadctrl', function($scope,$resource,$log,$timeout,$uibModal,dataService,notificationService,patientNurseAssignmentService,erloadAutoStepsService) {
    
 
    
    $scope.step1 = function() {
        erloadAutoStepsService.step1Logic();
    }
    $scope.step2 = function() {
        erloadAutoStepsService.step2Logic();
    }
    $scope.step3 = function() {
        erloadAutoStepsService.step3Logic();
    }
    $scope.step4 = function() {
        erloadAutoStepsService.step4Logic();
    }
    $scope.step5 = function() {
        erloadAutoStepsService.step5Logic();
    }
    $scope.step6 = function() {
        erloadAutoStepsService.step6Logic();
    }
    $scope.step7 = function() {
        erloadAutoStepsService.step7Logic();
    }
     $scope.step8 = function() {
        erloadAutoStepsService.step8Logic();
    }
    $scope.step9 = function() {
        erloadAutoStepsService.step9Logic();
    }
    $scope.step10 = function() {
        erloadAutoStepsService.step10Logic();
    }
    $scope.step11 = function() {
        erloadAutoStepsService.step11Logic();
    }
    $scope.step12 = function() {
        erloadAutoStepsService.step12Logic();
    }
    $scope.step13 = function() {
        erloadAutoStepsService.step13Logic();
    }
    $scope.step14 = function() {
        erloadAutoStepsService.step14Logic();
    }
    $scope.step15 = function() {
        erloadAutoStepsService.step15Logic();
    }
    $scope.step156 = function() {
        erloadAutoStepsService.step16Logic();
    }
    //  View
    $scope.viewt = "list";
    
    //  Dummy Data.
    $scope.patients = [];
    $scope.patient_assignment_limit = 3;
    $scope.patient = [{'name':''}];
    $scope.notification_message = notificationService.notification_text;
    
    //  Team data (patient and member data)
    $scope.teams = dataService.teams;
    
    //  UI shifts.
    $scope.currentActiveShifts = dataService.currentActiveShifts;
    $scope.nextShifts = dataService.nextShifts;
    $scope.inActiveShifts = dataService.inActiveShifts;
    
    //  Scope to get the data
    $scope.patientNameInput = ""; // model for patient field.
    $scope.assignTeamNurse = function() {
        
        patientNurseAssignmentService.assignPatient($scope.patientNameInput,$scope.patient_assignment_limit,$scope.teams);
        //  Reassure that the patient is assigned to a team and a nurse.
        //$scope.notification_message = "Assigned " + $scope.patientNameInput + " to " + nurseName + " of " + teamName;
        $scope.patientNameInput = "";
    }
    
    $scope.manualPatientAssignment = function() {
        
        var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'manualpatientassignmentctrl',
                templateUrl: 'pages/modal/assignpatient.html',
                size: 'lg',
                resolve: {
                    patientName: function() {return $scope.patientNameInput;},
                    patientLimit: function() {return $scope.patient_assignment_limit;},
                    teams: function() {return $scope.teams;}
                }
            });
        
        modalInstance.closed.then(function() {
            $scope.patientNameInput = "";
        })
    }
    
    $scope.assignTeamNurseEnter = function($event) {
       var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            this.assignTeamNurse();
        }
    }
    
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    /**This is the schedule checker! 
     This will constantly check if a new POD is enabled.
    */
    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer

        var d = new Date();
            //  Logic to enable / disable shifts.
            if (d.getMonth() + 1 == 1 && d.getDate == 7 && d.getHours == 11) { //January is 0, February is 1, and so on    
                console.log(d.getHours());
            }
        //  We need to check the time and match it against any of the team's shift.
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
    
    $scope.checkCurrentTimeShifts = function(timeHour,timeMin) {
        
    };
    


    
  });


