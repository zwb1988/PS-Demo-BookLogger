(function () {
    angular.module('app')
            .factory('dataService', ['$q', '$http', 'constants', dataService]);

    function dataService($q, $http, constants) {

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                }
            }).then(sendResponseData).catch(sendError);
        }

        function getBookByID(bookId) {
            return $http.get('api/books/' + bookId)
                    .then(sendResponseData).catch(sendError);
        }

        function getAllReaders() {
            return $http({
                method: 'GET',
                url: 'api/readers'
            }).then(sendResponseData).catch(sendError);
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendError(response) {
            return $q.reject('Error retrieving data. (HTTP status: '
                    + response.status + ')');
        }

        function updateBook(book) {
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            }).then(updateBookSuccess).catch(updateError);
        }

        function updateBookSuccess(response) {
            return 'Book updated: ' + response.config.data.title;
        }

        function updateError(response) {
            return $q.reject('Error updating book. (HTTP status: '
                    + response.status + ')');
        }

        function addBook(book) {
            return $http.post('api/books', book)
                    .then(addBookSuccess).catch(addBookError);
        }

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(response) {
            return $q.reject('Error adding book. (HTTP status: '
                    + response.status + ')');
        }

        function deleteBook(bookID) {
            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID
            }).then(deleteBookSuccess).catch(deleteBookError);
        }

        function deleteBookSuccess(response) {
            return 'Book deleted';
        }

        function deleteBookError(response) {
            return $q.reject('Error deleting book. (HTTP status: '
                    + response.status + ')');
        }
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };
    }

    dataService.$inject = ['logger'];
}());