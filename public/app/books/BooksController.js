/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    angular.module('app').controller('BooksController', ['books', 'dataService', 'badgeService', '$q', BooksController]);

    function BooksController(books, dataService, badgeService, $q) {
        var vm = this;

        vm.appName = books.appName;

        dataService.getAllBooks()
                //.then(getBooksSuccess, getBooksError, getBooksNotification)
                .then(getBooksSuccess, null, getBooksNotification)
                .catch(errorCallback)
                .finally(getAllBooksComplete);

        function getBooksSuccess(books) {
            vm.allBooks = books;
        }

//        function getBooksError(reason) {
//            console.log(reason);
//        }

        function getBooksNotification(notification) {
            //console.log(notification);
        }

        function errorCallback(error) {
            //console.log('Error message: ' + error);
        }

        function getAllBooksComplete() {
            //console.log('getAllBooks has completed');
        }

        dataService.getAllReaders()
                .then(getReadersSuccess)
                .catch(errorCallback)
                .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
        }

        function getAllReadersComplete() {
            //console.log('getAllReaders has completed');
        }

//        // use $q.all for all promise at once
//        // pass $q as parameter first
//        var booksPromise = dataService.getAllBooks();
//        var readersPromise = dataService.getAllReaders();
//        $q.all([booksPromise, readersPromise])
//                .then(getAllDataSuccess)
//                .catch(getAllDataError);
//
//        function getAllDataSuccess(dataArray) {
//            vm.allBooks = dataArray[0];
//            vm.allReaders = dataArray[1];
//        }
//
//        function getAllDataError(reason) {
//            console.log(reason);
//        }

        vm.getBadge = badgeService.retrieveBadge;
    }
}());