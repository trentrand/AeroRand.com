'use strict';

angular.module('core').controller('HomeController', ['$scope', '$rootScope', '$stateParams',
  function($scope, $rootScope, $stateParams) {
    var vm = this;
    $rootScope.pagetitle = "AeroRand"
  }
]);
