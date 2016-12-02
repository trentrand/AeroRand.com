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

        $urlRouterProvider.when('','/home')

        $stateProvider.
            state('index', {
                abstract: true,
                templateUrl: '../views/index.view.html',
                controller: 'IndexController',
                controllerAs: 'vm'
            })
            .state('index.home', {
                url: '/home',
                templateUrl: '../views/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Home'
                }
            })
            .state('index.products', {
              url: '/products',
              templateUrl: '../views/products.view.html',
              controller: 'ProductsController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Products'
              }
            })
            .state('index.linecard', {
              url: '/linecard',
              templateUrl: '../views/linecard.view.html',
              controller: 'LinecardController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Line Card'
              }
            })
            .state('index.quote', {
              url: '/quote',
              templateUrl: '../views/quote.view.html',
              controller: 'QuoteController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Quote'
              }
            })
            .state('index.inventory', {
              url: '/inventory',
              templateUrl: '../views/inventory.view.html',
              controller: 'InventoryController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Inventory'
              }
            })
            .state('index.contact', {
              url: '/contact',
              templateUrl: '../views/contact.view.html',
              controller: 'ContactController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Contact'
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
