'use strict';

angular.module('erLoadUi')
  .controller('erreportctrl', function ($scope,$resource,$log,$timeout,$window,dataService) {
//    // create a document and pipe to a blob
//    $scope.generateReport = function() {
//        var doc = new PDFDocument();
//        var stream = doc.pipe(blobStream());
//
//        // draw some text
//        doc.fontSize(25)
//           .text('Here is some vector graphics...', 100, 80);
//
//        // some vector graphics
//        doc.save()
//           .moveTo(100, 150)
//           .lineTo(100, 250)
//           .lineTo(200, 250)
//           .fill("#FF3300");
//
//        doc.circle(280, 200, 50)
//           .fill("#6600FF");
//
//        // an SVG path
//        doc.scale(0.6)
//           .translate(470, 130)
//           .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//           .fill('red', 'even-odd')
//           .restore();
//
//        // and some justified text wrapped into columns
//
//
//        // end and display the document in the iframe to the right
//        doc.end();
//        stream.on('finish', function() {
//          console.log(stream.toBlobURL('application/pdf'));
//          $("#frameE").src = stream.toBlobURL('application/pdf');
//        });
//    }
    
    $scope.reports = function() {
        var rep = [{'id':'0','name':'Pod Report'},{'id':'1','name':'Doctors Report'}];
        
        return rep;
    };
    $scope.selectedReport = '';
    $scope.setReport = function(item) {
        console.log($scope.selectedReport);
        $scope.selectedReport = item;
    }
    
    $scope.frameRep = null;
    $scope.docPatTotal = 0;
    $scope.podRnTotal = 0;
    $scope.docPat = [];
    $scope.podRn = [];
    //{'pod':teamName,'doctor':teamName.doctor,'rn':nurseName,'patient':patient}
    $scope.generateReport = function() {
        $scope.docPat = [];$scope.docPatTotal = 0;
        $scope.podRn = [];$scope.podRnTotal = 0;
        if($scope.selectedReport.id == 1) {
            for(var i=0;i<dataService.doctors.length;i++) {
                var docCount = 0;
                var pod = null;
                for(var j=0;j<dataService.dataForReport.length;j++) {
                    if(dataService.dataForReport[j].doctor.id == dataService.doctors[i].id) {
                        pod = dataService.dataForReport[j].pod;
                        docCount++;
                    }
                }
                $scope.docPatTotal += docCount;
                $scope.docPat.push({'pod':pod ,'doc':dataService.doctors[i],'count':docCount});
            }
            
        }else if($scope.selectedReport.id == 0) {
            for(var i=0;i<dataService.rns.length;i++) {
                var rnCount = 0;
                var pod = null;
                for(var j=0;j<dataService.dataForReport.length;j++) {
                    if(dataService.dataForReport[j].rn.id == dataService.rns[i].id) {
                        pod = dataService.dataForReport[j].pod;
                        rnCount++;
                    }
                }
                $scope.podRnTotal += rnCount;
                $scope.podRn.push({'pod':pod ,'rn':dataService.rns[i],'count':rnCount});
            }
      

        }
    }
    
    $scope.print = function(id) {
        var divToPrint=document.getElementById(id);
        var newWin= $window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

});