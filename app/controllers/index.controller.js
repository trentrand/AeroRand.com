'use strict';

angular.module('core').controller('IndexController', ['$state', '$scope', '$rootScope',
	function($state, $scope, $rootScope) {
		var vm = this;
		$scope.$state = $state;
	}
]).directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
			'background-image': 'url(' + url + ')',
            'background-size' : 'cover'
        });
    };
}).directive('pageTitle', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var title = 'AeroRand';
          if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + " | AeroRand";

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
