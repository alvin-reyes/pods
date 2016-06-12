'use strict';

angular.module('erLoadUi')
  .controller('memberregistrationctrl', function ($scope,$resource,$log,$timeout) {
    
    //  Sample Teams
    $scope.teams = [];    
    $scope.members = [];
    
    //  Member variables
    $scope.name = "";
    $scope.team_registration = "";
    
    
    $scope.registerMember = function() {
        
    }
    
});