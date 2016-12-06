(function () {
    angular.module('app')
            .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);

    function dataService($q, $timeout, $http, constants) {

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
            return $http({
                method: 'GET',
                url: 'api/books/' + bookId,
            }).then(sendResponseData).catch(sendError);
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
            return $q.reject('Error retrieving data. (HTTP status: ' + response.status + ')');
        }

        function updateBook(book) {
            return $http({
                method: 'POST',
                url: 'api/books/' + book.book_id,
                data: book
            }).then(updateBookSuccess).catch(updateError);
        }

        function updateBookSuccess(response) {
            return 'Book updated: ' + response.config.data.title;
        }

        function updateError(response) {
            return $q.reject('Error updating book. (HTTP status: ' + response.status + ')');
        }

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook
        };
    }

    dataService.$inject = ['logger'];
}());