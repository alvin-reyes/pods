'use strict';

angular.module('erLoadUi')
    .service('notificationService', function(growl){ 
    
    /*
        growl.warning("This adds a warn message");
    growl.info("This adds a info message");
    growl.success("This adds a success message");
    growl.error("This adds a error message");
    */
    this.setWarningNotification = function(message) {
        growl.warning(message);
    }
    
    this.setSuccessNotification = function(message) {
        growl.success(message);
    }
    
    this.setErrorNotification = function(message) {
        growl.error(message);
    }
    this.notification_text = "";
});