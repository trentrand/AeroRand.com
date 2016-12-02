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
});
