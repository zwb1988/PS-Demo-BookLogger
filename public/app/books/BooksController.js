/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    angular.module('app').controller('BooksController', ['books',
        'dataService', 'badgeService', '$cookies', '$cookieStore',
        '$log', '$route', 'booksResource', BooksController]);

    function BooksController(books, dataService, badgeService,
            $cookies, $cookieStore, $log, $route, booksResource) {
        var vm = this;

        vm.appName = books.appName;
        
//        dataService.getAllBooks()
//                //.then(getBooksSuccess, getBooksError, getBooksNotification)
//                .then(getBooksSuccess, null, getBooksNotification)
//                .catch(errorCallback)
//                .finally(getAllBooksComplete);

        vm.allBooks = booksResource.query();

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
            console.log('Error message: ' + error);
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

        vm.favouriteBook = $cookies.favouriteBook;

        vm.lastEdited = $cookieStore.get('lastEdited');

//        $log.log('logging with log');
//        $log.info('logging with info');
//        $log.warn('logging with warn');
//        $log.error('logging with error');
//        $log.debug('logging with debug');

        vm.deleteBook = function (bookID) {
            dataService.deleteBook(bookID)
                    .then(deleteBookSuccess)
                    .catch(deleteBookError);
        }

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(message) {
            $log.error(message);
        }
    }
}());