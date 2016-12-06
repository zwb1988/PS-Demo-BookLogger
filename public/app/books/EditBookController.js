(function () {
    angular.module('app')
            .controller('EditBookController',
                    ['$routeParams', 'dataService', EditBookController]);

    function EditBookController($routeParams, dataService) {
        var vm = this;

        dataService.getAllBooks()
                .then(function (books) {
                    vm.currentBook = books.filter(function (book) {
                        return book.book_id === parseInt($routeParams.bookID);
                    })[0];
                });
    }
}());