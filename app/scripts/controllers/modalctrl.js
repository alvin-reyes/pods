'use strict';

angular.module('erLoadUi')
  .controller('reassignnursectrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,rnId,podId,dataService,notificationService) {
    
    $scope.nurseId = rnId;
    $scope.podId = podId;
    
    //  Variable to store team only.
    $scope.teamsOnly = [];
    $scope.selectedTeamId = "";
    
    function filterActive(team) {
        if(team.team_status == 'active') {
            return team;
        }
    }
    
    $scope.activePods = function() {
        return dataService.teams.filter(filterActive);
    }
    
    $scope.setPod = function(item) {
        $scope.selectedTeamId = item.id;
    }
    
 
    $scope.ok = function () {
        //  Where to reassign the nurse?
        var teamNameToAssign = "";
        //  Insert Member.
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == $scope.selectedTeamId) {
                teamNameToAssign = dataService.teams[i].name;
                dataService.teams[i].members.unshift($scope.nurseId);
                break;
            }
        }
        
        for(var i=0;i<$scope.podId.members.length;i++) {
            if($scope.podId.members[i].id == rnId.id) {
                $scope.podId.members.splice(i,1);
                break;
            }
        }
    
        notificationService.notification_text = "Assigned " + $scope.nurseId.name + " to " + teamNameToAssign;
        console.log(notificationService.notification_text);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    
})


angular.module('erLoadUi')
  .controller('reassignpatientctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,patientId,rnId,podId,dataService,notificationService) {
    
    $scope.nurseId = rnId;
    $scope.podId = podId;
    
    $scope.placement = [];
    $scope.rnPlacement = [];
    
    $scope.teamsOnly = [];
    $scope.rnOnly = [];
    
    $scope.getTeamsOnly = function() {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                $scope.teamsOnly.unshift(dataService.teams[i].name);
            }
        }
        console.log($scope.teamsOnly);
        $scope.placement = [{options:$scope.teamsOnly,selected:'Select Pod'}];
        $scope.placement = $scope.placement[0];
    };
    
    $scope.getMembersAfterTeamSelect = function() {
        
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].name == $scope.placement.selected) {
                $scope.rnOnly = dataService.teams[i].members;
                break;
            }
        }

        console.log($scope.rnOnly);
        $scope.rnPlacement = [{options:$scope.rnOnly,selected:'Select RN'}];
        $scope.rnPlacement = $scope.rnPlacement[0];
        
    };
    
    $scope.reassignPatient = function() {
        var nurseN = null;
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].name == $scope.placement.selected) {
                for(var j=0;j<dataService.teams[i].members.length;j++) {
                    if(dataService.teams[i].members[j].id == $scope.rnPlacement.selected) {
                        nurseN = dataService.teams[i].members[j];
                        dataService.teams[i].members[j].assigned_patient.unshift(patientId);
                        break;
                    }
                }
            }
        }
                
        for(var i=0;i<$scope.nurseId.assigned_patient.length;i++) {
            if($scope.nurseId.assigned_patient[i].id == patientId.id) {
                $scope.nurseId.assigned_patient.splice(i,1);
                break;
            }
        }
        
        notificationService.setSuccessNotification("Re-assigned " + patientId.name + " to " + nurseN.name);
        $uibModalInstance.close();   
    }
    
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    
})

angular.module('erLoadUi')
  .controller('manualpatientassignmentctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,patientName,patientLimit,teams,dataService,patientNurseAssignmentService) {
    
    $scope.placement = [];
    $scope.rnPlacement = [];
    $scope.teamsOnly = [];
    $scope.rnOnly = [];
    
    $scope.getTeamsOnly = function() {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].team_status == 'active') {
                $scope.teamsOnly.unshift(dataService.teams[i].name);
            }
        }
        console.log($scope.teamsOnly);
        $scope.placement = [{options:$scope.teamsOnly,selected:'Select Pod'}];
        $scope.placement = $scope.placement[0];
    };
    
    $scope.getMembersAfterTeamSelect = function() {
        
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].name == $scope.placement.selected) {
                $scope.rnOnly = dataService.teams[i].members;
                break;
            }
        }

        console.log($scope.rnOnly);
        $scope.rnPlacement = [{options:$scope.rnOnly,selected:'Select RN'}];
        $scope.rnPlacement = $scope.rnPlacement[0];
        
    };
    
    $scope.assignPatient = function() {
        console.log($scope.rnPlacement.selected);
        patientNurseAssignmentService.assignPatientToNurse(patientName,patientLimit,teams,$scope.rnPlacement.selected);
        patientName = "";
        $uibModalInstance.close(); 
    }
})

angular.module('erLoadUi')
  .controller('patientdetailsctrl', function ($scope,$resource,$log,$timeout,patient, $http,$uibModalInstance) {
    
    $scope.patient = patient;
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
  .controller('dischargepatientctrl', function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,patientId,rnId,podId,dataService,patientNurseAssignmentService) {
    
    $scope.ok = function() {
        console.log(patientId);
        console.log(rnId);
        patientNurseAssignmentService.patientDischarge(patientId,rnId);
        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
    .controller('memberdetailsctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,member,dataService) {
    
    $scope.rnId = member;
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
    .controller('poddetailsctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,team,dataService) {
})

angular.module('erLoadUi')
    .controller('doctordetailsctrl',function ($scope,$resource,$log,$timeout,$http,$uibModalInstance,doctor,dataService) {
    
    $scope.doc = doctor;
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
    .controller('nurseswitchctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,member,team,dataService,notificationService,patientNurseAssignmentService) {
    
    $scope.selectedNurse = "";
    $scope.rns = [];
    $scope.rnPlacement = [];

    $scope.nurses = function() {
        return dataService.rns;
    }
    
    $scope.setNurse = function(item){
        $scope.selectedNurse = item;
    }

        
    $scope.ok = function () {
        
        patientNurseAssignmentService.reAssignPatientToNurse(dataService.teams,member,$scope.selectedNurse);
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == team.id) {
                for(var j=0;j<dataService.teams[i].members.length;j++) {
                    if(dataService.teams[i].members[j].id == member.id) {
                        dataService.teams[i].members[j] = $scope.selectedNurse;
                        break;
                    }
                }
            }
        }
        notificationService.setSuccessNotification("Switched " + member.name + " with " + $scope.selectedNurse.name + " on POD " + team.name);
        $scope.selectedNurse.member_status = 'active';
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
    .controller('doctorswitchctrl',function
     ($scope,$resource,$log,$timeout,$http,$uibModalInstance,team,doctor,shiftService,dataService,notificationService,patientNurseAssignmentService) {
    
    $scope.selectedDoctor = '';
    $scope.setDoctor = function(item) {
        $scope.selectedDoctor = item;
    }
    
    $scope.doctors = function() {
        return dataService.doctors;
    }

    $scope.ok = function () {
        //  Switch to another doctor.
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == team.id) {
                shiftService.shiftDoctor(dataService.teams[i],$scope.selectedDoctor);
                break;
            }
        } 
        
        notificationService.setSuccessNotification("Switched " + doctor.name + " with " + $scope.selectedDoctor.name + " on POD " + team.name);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function () {
        $uibModalInstance.close();
    };
})

angular.module('erLoadUi')
 .controller('assignnursectrl',function($scope,$uibModalInstance,team,dataService,notificationService,patientNurseAssignmentService){
                
    $scope.selectedNurse = "";
    
    
    $scope.nurses = function() {
        return dataService.rns;
    }
    
    $scope.setNurse = function(item) {
        $scope.selectedNurse = item;
    }
        
    $scope.ok = function () {
        for(var i=0;i<dataService.teams.length;i++) {
            if(dataService.teams[i].id == team.id) {
                dataService.teams[i].members.push($scope.selectedNurse);
                break;
            }
        }
        notificationService.setSuccessNotification("Assigned " + $scope.selectedNurse.name + " with " + $scope.selectedNurse.name + " on POD " + team.name);
        $scope.selectedNurse.member_status = 'active';
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
                
});


angular.module('erLoadUi')
 .controller('newpodctrl',function($scope,$uibModalInstance,dataService,notificationService,patientNurseAssignmentService){
    
    $scope.listSelectNurse = [];
    $scope.podName = "";
    $scope.selectedDoctor = undefined;
    $scope.setDoctor = function(item) {
        $scope.selectedDoctor = item;
    }
    $scope.doctors = function() { 
        return dataService.doctors;
    }
    
    $scope.rns = function() { 
        var returnNurses = [];
        for(var i=0;i<dataService.rns.length;i++) {
            if(!getById(dataService.rns[i].id,$scope.listSelectNurse)) {
                returnNurses.unshift(dataService.rns[i]);
            }
        }
        return returnNurses;
    }
    
    function getById(id, myArray) {
    return myArray.filter(function(obj) {
          if(obj.id == id) {
            return obj 
          }
        })[0]
    }
    
    $scope.removeNurse = function(nurseId) {
        for(var i=0;i<$scope.listSelectNurse.length;i++) {
            if($scope.listSelectNurse[i].id == nurseId.id) {
                $scope.listSelectNurse.splice(i,1);
                break;
            }
        }
    }
    
    $scope.setNurse = function(item) {
        $scope.listSelectNurse.push(item);
        $scope.selectedNurse = "";
    }
    
    
    $scope.ok = function () {
        
        //  create the team.
        var team = {'id': dataService.teams.length + 1,'name': $scope.podName,
         'team_status':'active', 'count': '0',
         'doctor':$scope.selectedDoctor,
         'members':$scope.listSelectNurse
        };
        
        
        dataService.teams.push(team);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
});

angular.module('erLoadUi')
 .controller('removenursectrl',function($scope,$uibModalInstance,dataService,notificationService,patientNurseAssignmentService,rnId,podId){
    
    $scope.rnId = rnId;
    $scope.podId = podId;
    
    $scope.ok = function () {
        
        for(var i=0;i<podId.members.length;i++) {
            if(podId.members[i].id == rnId.id) {
                
                for(var j=0;j<podId.members[i].assigned_patient.length;j++) {
                    patientNurseAssignmentService.patientDischarge(
                        podId.members[i].assigned_patient[j],
                        podId.members[i]);   
                }
                
                podId.members.splice(i,1);
                break;
            }
        }
        
        console.log("rm");
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
});


angular.module('erLoadUi')
 .controller('removepodctrl',function($scope,$uibModalInstance,dataService,notificationService,patientNurseAssignmentService,podId){
    
    $scope.podId = podId;
    
    $scope.ok = function () {
        console.log(podId.members.length);
        console.log(JSON.stringify(podId.members));
        if(podId.members.length > 0) {
            console.log(podId.members.length);
            var ln = podId.members.length;
            for(var i=0;i<ln;i++) {
                for(var j=0;j<podId.members[i].assigned_patient.length;j++) {
                        patientNurseAssignmentService.patientDischarge(
                            podId.members[i].assigned_patient[j],
                            podId.members[i]);   
                }
            }
        }
        dataService.teams.splice(dataService.teams.indexOf(podId),1);
        $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
        $uibModalInstance.close();
    };
});

