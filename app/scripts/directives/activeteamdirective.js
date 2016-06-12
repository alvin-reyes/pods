angular.module('erLoadUi').directive('activeteamdirective', function() {
  return {
    restrict: 'EA',
    templateUrl: 'pages/directives/activeteamdirective.html',
    scope: {
      erTeam: '=erTeam',
      patients: '=patients'
    }
  }
});