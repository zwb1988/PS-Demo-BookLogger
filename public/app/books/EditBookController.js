(function () {
    angular.module('app')
            .controller('EditBookController',
                    ['$routeParams', 'books', '$cookies', '$cookieStore',
                        'dataService', '$log', '$location', 'booksResource',
                        EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore,
            dataService, $log, $location, booksResource) {
        var vm = this;

//        dataService.getBookByID($routeParams.bookID)
//                .then(getBookSuccess)
//                .catch(getBookError);

        vm.currentBook = booksResource.get({book_id: $routeParams.bookID});
        $log.log(vm.currentBook);

        function getBookSuccess(book) {
            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.saveBook = function () {
//            dataService.updateBook(vm.currentBook)
//                    .then(updateBookSuccess)
//                    .catch(updateBookError);
            vm.currentBook.$update();
            $location.path('/');
        };

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.setAsFaviourite = function () {
            $cookies.favouriteBook = vm.currentBook.title;
        };
    }
}());