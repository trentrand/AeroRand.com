(function(window, document, undefined) {
'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'AeroRand';
	var applicationModuleVendorDependencies = ['ngSanitize', 'ui.router', 'ui.bootstrap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
    $locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

// angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state) {
//   // Check authentication before changing state
//   /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//     if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      
//     }
//   });*/

//   // Record previous state
//   $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//     storePreviousState(fromState, fromParams);
//   });

//   // Store previous state
//   function storePreviousState(state, params) {
//     // only store this state if it shouldn't be ignored
//     if (!state.data || !state.data.ignoreState) {
//       $state.previous = {
//         state: state,
//         params: params,
//         href: $state.href(state, params)
//       };
//     }
//   }
// });

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core', []);

angular.module('core').controller('AlphaController', ['$scope', '$rootScope', '$stateParams',
  function($scope, $rootScope, $stateParams) {
    var vm = this;

  }
]);

angular.module('core').controller('IndexController', ['$state', '$scope', '$rootScope',
	function($state, $scope, $rootScope) {
		var vm = this;
		// vm.age = EncounterService.getAge();
		// $rootScope.age = vm.age;
		// vm.setAge = function(age){
		// 	if (age !== vm.age) {
		// 		EncounterService.setAge(age);
		// 		$state.reload();
		// 	}
		// }
	}
]);

// Configure routes
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function($injector, $location) {
            $injector.get('$state').transitionTo('not-found', null, {
                location: false
            });
        });

        $urlRouterProvider.when('','/alpha')

        $stateProvider.
            state('index', {
                abstract: true,
                template:'<section><section><nav class="navbar navbar-default navbar-fixed-top" role="navigation"><div class="container-fluid"><div class="navbar-header"><a href="//imgur.com/bsT6U"></a> <a href="www.imgur.com/bsT6U"></a> <a class="navbar-brand" href="#"><img src="http://imgur.com/a/bsT6U#3rFfcMR"></a> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#top-nav-collapse"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button></div><div class="collapse navbar-collapse" id="top-nav-collapse"><ul class="nav navbar-nav"><li class="active"><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Portfolio</a></li><li><a href="#">Contact</a></li></ul></div></div></nav></section><section data-ui-view></section><section>Footer</section></section>',
                controller: 'IndexController',
                controllerAs: 'vm'
            })
            .state('index.alpha', {
                url: '/alpha?age&search&letter&page',
                template:'<section></section>',
                controller: 'AlphaController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Alpha'
                }
            })
            .state('not-found', {
                url: '/not-found',
                template:'<h1>Page Not Found</h1><div class="alert alert-danger" role="alert"><span class="sr-only">Error:</span> Page Not Found</div>',
                data: {
                    ignoreState: true,
                    pageTitle: 'Not-Found'
                }
            });
    }
]);

})(window, document);
