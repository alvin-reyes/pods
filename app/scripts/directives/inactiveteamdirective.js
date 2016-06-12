angular.module('erLoadUi').directive('inactiveteamdirective', function() {
  return {
    restrict: 'EA',
    templateUrl: 'pages/directives/inactiveteamdirective.html',
    scope: {
      erTeam: '=erTeam'
    }
  }
});