/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app', []);

    // Instead of creating provider in the configuration section with injected
    // $provide, we can use the provider method exposed with the module.
    // E.g. $provide.provider() => app.provider()
    app.provider('books', function () {
        this.$get = function () {
            var appName = 'Book Logger';
            var appDesc = 'Track which books you read.';

            var version = '1.0';
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
    });

    app.config(function (booksProvider) {
        booksProvider.setIncludeVersionInTitle(true);
    });
}());