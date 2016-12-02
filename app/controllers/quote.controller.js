'use strict';

angular.module('core').controller('QuoteController', ['$scope', '$rootScope', '$stateParams', '$http', '$window',
    function($scope, $rootScope, $stateParams, $http, $window) {
    var vm = this;
    $scope.parts = [
        {}
    ];

    vm.addPart = function() {
        var part = {};
        $scope.parts.push(part);
    }

    $scope.remove = function(item) {
      var index = $scope.parts.indexOf(item);
      $scope.parts.splice(index, 1);
    }

    vm.toString = function(parts) {
        console.log(parts);
        var rfq = "\n";
        parts.forEach(function(entry) {
            console.log(entry.partId);
            console.log(entry.quantity);
            rfq += '\rPart #\r' + entry.partId + '\nQuantity:\r' + entry.quantity + '\n';
        });
        return rfq;
    }

    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $scope.formData.inputMessage = vm.toString($scope.parts);
            $http({
                method  : 'POST',
                url     : '../resources/rfq-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed. Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
  }
]);
