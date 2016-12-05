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

    app.config(['booksProvider', 'constants', function (booksProvider, constants) {
        booksProvider.setIncludeVersionInTitle(true);
        console.log('Title from constants service: ' + constants.APP_TITLE);
        //console.log(dataServiceProvider.$get);
    }]);
}());