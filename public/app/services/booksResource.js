(function () {
    angular.module('app')
            .factory('booksResource', ['$resource', booksResource]);

    function booksResource($resource) {
        return $resource('/api/books/:book_id', {book_id: '@book_id'},
                {
                    'update': {method: 'PUT'}
                });
    }
}());