(function () {
    angular.module('app')
            .controller('EditBookController',
                    ['$routeParams', 'books', '$cookies', '$cookieStore', EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore) {
        var vm = this;

        vm.currentBook = books.filter(function (book) {
            return book.book_id === parseInt($routeParams.bookID);
        })[0];
        
        vm.setAsFaviourite = function() {
            $cookies.favouriteBook = vm.currentBook.title;
        };
        
        $cookieStore.put('lastEdited', vm.currentBook);
    }
}());