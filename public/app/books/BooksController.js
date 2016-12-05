/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    angular.module('app').controller('BooksController', BooksController);

    function BooksController(books) {
        var vm = this;

        vm.appName = books.appName;
    }
    ;
}());