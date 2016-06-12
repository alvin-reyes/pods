'use strict';

angular
  .module('erLoadUi', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-growl',
    'datatables'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'pages/home/index.html',
            controller: 'erloadctrl'
        })
        .when('/report', {
            templateUrl: 'pages/reporting/report.html',
            controller: 'erreportctrl'
        })
        .when('/memberregistration', {
            templateUrl: 'pages/memberregistration/member_registration.html',
            controller: 'memberregistrationctrl'
        })
        .when('/teamregistration', {
            templateUrl: 'pages/teamregistration/team_registration.html',
            controller: 'teamregistrationctrl'
        })
        .otherwise({
            redirectTo: '/index'
        });
  }).config(['growlProvider', function(growlProvider) {
        growlProvider.globalTimeToLive({success: 2000, error: 2000, warning: 3000, info: 4000});
}]);



angular.module('erLoadUi')
  .controller('growlCtrl', function($scope,growl) {
    
});