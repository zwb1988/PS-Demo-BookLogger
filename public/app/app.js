/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app', ['ngRoute']);

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

    app.config(['booksProvider', '$routeProvider', function (booksProvider, $routeProvider) {
            booksProvider.setIncludeVersionInTitle(true);
            $routeProvider
                    .when('/', {
                        templateUrl: '/app/templates/books.html',
                        controller: 'BooksController',
                        controllerAs: 'books'
                    })
                    .when('/AddBook', {
                        templateUrl: '/app/templates/addBook.html',
                        controller: 'AddBookController',
                        controllerAs: 'addBook'
                    })
                    .when('/EditBook/:bookID', {
                        templateUrl: '/app/templates/editBook.html',
                        controller: 'EditBookController',
                        controllerAs: 'bookEditor',
                        resolve: {
                            books: function (dataService) {
                                throw 'error getting books';
                                return dataService.getAllBooks();
                            }
                        }
                    })
                    .otherwise('/');
        }]);

    app.run(['$rootScope', function ($rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                console.log('successfuly changed routes');
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