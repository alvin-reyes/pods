'use strict';

angular.module('erLoadUi')
  .controller('teamregistrationctrl', function ($scope,$resource,$log,$timeout,$http) {
    //$scope.date = new Date('2014-01-01T18:00:00');
    $scope.teamname = "";
    $scope.ismeridian = true;
    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.updateteamshift_from = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.teamshift_from = d;
    };
    
    $scope.updateteamshift_to = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.teamshift_to = d;
    };


    $scope.teamshift_from = new Date('2014-01-01T18:00:00');
    $scope.teamshift_to = new Date('2014-01-01T18:00:00');
    $scope.successswitch = "";
    
    $scope.save = function() {
        var data = $.param({
            name: $scope.teamname,
            shiftFrom: $scope.teamshift_from,
            shiftTo: $scope.teamshift_to
        });
        
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        
        $http.post('http://localhost:8081/teamservice/createnewteam', data, config)
        .success(function (data, status, headers, config) {
            console.log(data);
            $scope.teamsonly.unshift(data['records'][0]);
            console.log($scope.teamsonly);
            
        })
        .error(function (data, status, header, config) {
        });
    }
    
    $scope.removeEntry = function(id){
        alert("remove" + id);
    };
    
    $scope.saveEntry = function(id) {
        alert("save" + id);
    }
    
    $scope.allteams = function() {
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.get('http://localhost:8081/teamservice/getallteams', config)
           .then(
                function(response){
                    angular.forEach(response['data']['records'], function(value, key) {
                        $scope.teamsonly.push(value);
                    });   
                    console.log($scope.teamsonly);
               }, 
               function(response){
                 // failure call back
               }
        );
        
    }
    $scope.teamsonly = [];
});