/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);

    // Instead of creating provider in the configuration section with injected
    // $provide, we can use the provider method exposed with the module.
    // E.g. $provide.provider() => app.provider()
    app.provider('books', ['constants', function (constants) {
            this.$get = function () {
                var appName = constants.APP_TITLE;
                var appDesc = constants.APP_DESCRIPTION;

                var version = constants.APP_VERSION;
                if (includeVersionInTitle) {
                    appName += ' ' + version;
                }

                return {
                    appName: appName,
                    appDesc: appDesc
                };
            };

            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function (value) {
                includeVersionInTitle = value;
            };
        }]);

    app.config(['booksProvider', '$routeProvider', '$logProvider',
        '$httpProvider', '$provide', function (booksProvider, $routeProvider,
                $logProvider, $httpProvider, $provide) {
            $provide.decorator('$log', ['$delegate', 'books', logDecorator]);

            booksProvider.setIncludeVersionInTitle(true);
            $logProvider.debugEnabled(true); //enable disable $log.debug

            $httpProvider.interceptors.push('bookLoggerInterceptor');

            $routeProvider
                    .when('/', {
                        templateUrl: '/app/templates/books.html',
                        controller: 'BooksController',
                        controllerAs: 'books'
                    })
                    .when('/AddBook', {
                        templateUrl: '/app/templates/addBook.html',
                        controller: 'AddBookController',
                        controllerAs: 'bookAdder'
                    })
                    .when('/EditBook/:bookID', {
                        templateUrl: '/app/templates/editBook.html',
                        controller: 'EditBookController',
                        controllerAs: 'bookEditor',
                        resolve: {
                            books: function (dataService) {
                                return dataService.getAllBooks();
                            }
                        }
                    })
                    .otherwise('/');
        }]);

    function logDecorator($delegate, books) {
        function log(message) {
            message += ' - ' + new Date() + ' (' + books.appName + ')';
            $delegate.log(message);
        }
        function info(message) {
            $delegate.log(message);
        }
        function warn(message) {
            $delegate.log(message);
        }
        function error(message) {
            $delegate.log(message);
        }
        function debug(message) {
            $delegate.log(message);
        }
        function awesome(message) {
            message = 'Awesome!!! - ' + message;
            $delegate.debug(message);
        }

        return {
            log: log,
            info: info,
            warn: warn,
            error: error,
            debug: debug,
            awesome: awesome
        };
    }

    app.run(['$rootScope', function ($rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                //console.log('successfuly changed routes');
            });
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                console.log('error changing routes');

                console.log(event);
                console.log(current);
                console.log(previous);
                console.log(rejection);
            });
        }]);
}());