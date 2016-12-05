/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    angular.module('app').controller('BooksController', BooksController);

    function BooksController(books, dataService, logger, badgeService) {
        var vm = this;

        vm.appName = books.appName;
        
        vm.allBooks = dataService.getAllBooks();
        vm.allReaders = dataService.getAllReaders();
        
        vm.getBadge = badgeService.retrieveBadge;
        
        logger.output('BooksController has been created');
    }
    ;
}());