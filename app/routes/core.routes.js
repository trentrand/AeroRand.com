'use strict';

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
                templateUrl: '../views/index.view.html',
                controller: 'IndexController',
                controllerAs: 'vm'
            })
            .state('index.alpha', {
                url: '/alpha?age&search&letter&page',
                templateUrl: '../views/alpha.view.html',
                controller: 'AlphaController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Alpha'
                }
            })
            .state('not-found', {
                url: '/not-found',
                templateUrl: '../views/404.view.html',
                data: {
                    ignoreState: true,
                    pageTitle: 'Not-Found'
                }
            });
    }
]);
