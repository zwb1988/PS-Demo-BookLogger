(function () {
    angular.module('app')
            .controller('EditBookController',
                    ['$routeParams', 'books', EditBookController]);

    function EditBookController($routeParams, books) {
        var vm = this;

        vm.currentBook = books.filter(function (book) {
            return book.book_id === parseInt($routeParams.bookID);
        })[0];
    }
}());