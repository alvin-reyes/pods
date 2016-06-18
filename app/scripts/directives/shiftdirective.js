'use strict';

angular.module('erLoadUi').directive('shiftdirective', function($uibModal,notificationService) {
  return {
    restrict: 'EA',
    templateUrl: 'pages/directives/shiftdirective.html',
    scope: {
      erTeams: '=erTeams'
    },
    link: function($scope, element, attr, ctrl) {
        
        $scope.selectedDoctor = undefined;
        $scope.doctors = function() { 
            var doctorArray = [];
            //  Get all team members
            for(var i=0;i<$scope.erTeams.length;i++) {
                for(var j=0;j<$scope.erTeams[i].members.length;j++) {
                    if($scope.erTeams[i].members[j].type == 'Doctor') {
                        doctorArray.unshift($scope.erTeams[i].members[j]);
                    }
                }
            }
            return doctorArray;
        }
        
        $scope.markTeamAsBusy = function(podId) {
            if(podId.team_status == 'active') {
                podId.team_status = 'inactive';
                notificationService.setErrorNotification("Set <u>" +  podId.name + "</u> to<b> BUSY</b>");
            }
            else {podId.team_status = 'active';
                notificationService.setSuccessNotification("Set <u>" +  podId.name + "</u> to<b> AVAILABLE</b>");     
            }
            
        }
        
        $scope.removeNurse = function(rnId,podId) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'removenursectrl',
                templateUrl: 'pages/modal/removenurse.html',
                size: 'lg',
                resolve: {
                    rnId : function() {return rnId;},
                    podId : function() {return podId;}
                }
            });
            notificationService.setErrorNotification("Remove <u>" + rnId.name + "</u> from "  + podId.name);
        }
        
        $scope.removePod = function(podId) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'removepodctrl',
                templateUrl: 'pages/modal/removepod.html',
                size: 'lg',
                resolve: {
                    podId : function() {return podId;}
                }
            });
            notificationService.setErrorNotification("Remove <u>" + podId.name + "</u>");
        }
        
        $scope.markMemberAsBusy = function(rnId) {
            if(rnId.member_status == 'active') {
                rnId.member_status = 'inactive';
                notificationService.setErrorNotification("Set <u>" + rnId.name + "</u> to <b> BUSY</b>");
            }
            else {
                rnId.member_status = 'active';
                notificationService.setSuccessNotification("Set <u>" + rnId.name + "</u> to <b> AVAILABLE</b>");
            }
        }
        
        $scope.reassignNurse = function(rnId,podId) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'reassignnursectrl',
                templateUrl: 'pages/modal/reassignnurse.html',
                size: 'lg',
                resolve: {
                    rnId : function() {return rnId;},
                    podId : function() {return podId;}
                }
            });
        }
        
        $scope.dischargePatient = function(patientId,rnId,podId) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'dischargepatientctrl',
                templateUrl: 'pages/modal/dischargepatient.html',
                size: 'lg',
                resolve: {
                    patientId: function() {return patientId;},
                    rnId : function() {return rnId;},
                    podId : function() {return podId;}
                }
            });
        }
        
        $scope.patientDetails = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/modal/patientdetails.html',
                size: 'lg',
                resolve: {
                }
            });
        }
        $scope.reassignPatient = function(patientId,rnId,podId){
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'reassignpatientctrl',
                templateUrl: 'pages/modal/reassignpatient.html',
                size: 'lg',
                resolve: {
                    patientId: function() {return patientId;},
                    rnId : function() {return rnId;},
                    podId : function() {return podId;}
                }
            });
        }
        
        $scope.doctorDetailOptions = function(doctor) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'doctordetailsctrl',
                templateUrl: 'pages/modal/doctordetails.html',
                size: 'lg',
                resolve: {
                    doctor: function() {return doctor;}
                }
            });
        }
        
        $scope.podDetails = function(podId) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'poddetailsctrl',
                templateUrl: 'pages/modal/poddetails.html',
                size: 'lg',
                resolve: {
                    team: function() {return podId;}
                }
            });
        }
        
        $scope.memberDetails = function(member) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'memberdetailsctrl',
                templateUrl: 'pages/modal/memberdetails.html',
                size: 'lg',
                resolve: {
                    member: function() {return member;}
                }
            });
        }
        
        $scope.switchWithAnotherNurse = function(member,team) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'nurseswitchctrl',
                templateUrl: 'pages/modal/nurseswitch.html',
                size: 'lg',
                resolve: {
                    member: function() {return member;},
                    team: function() {return team;}
                }
            });
        }
        
        $scope.switchWithAnotherDoctor = function(team,doctor) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'doctorswitchctrl',
                templateUrl: 'pages/modal/doctorswitch.html',
                size: 'lg',
                resolve: {
                    team: function() {return team;},
                    doctor: function() {return doctor;}
                }
            });
        }
        
        $scope.assignNurse = function(pod) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'assignnursectrl',
                templateUrl: 'pages/modal/assignnurse.html',
                size: 'lg',
                resolve: {
                    team: function() {return pod;},
                }
            });
        }
        
        $scope.newPod = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'app-modal-window',
                controller: 'newpodctrl',
                templateUrl: 'pages/modal/newpod.html',
                size: 'lg'
            });
        }
    }
  }
});