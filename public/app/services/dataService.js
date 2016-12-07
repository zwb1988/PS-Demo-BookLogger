(function () {
    angular.module('app')
            .factory('dataService', ['$q', '$http', 'constants',
                '$cacheFactory', dataService]);

    function dataService($q, $http, constants, $cacheFactory) {

        function getUserSummary() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('bookLoggerCache');
            if (!dataCache) {
                dataCache = $cacheFactory('bookLoggerCache');
            }

            var summaryFromCache = dataCache.get('summary');
            if (summaryFromCache) {
                console.log('returning summary from cache');
                deferred.resolve(summaryFromCache);
            } else {
                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                $q.all([booksPromise, readersPromise])
                        .then(function (bookLoggerData) {
                            var allBooks = bookLoggerData[0];
                            var allReaders = bookLoggerData[1];

                            var grandTotalMinutes = 0;

                            allReaders.forEach(function (value, index, array) {
                                grandTotalMinutes += value.totalMinutesRead;
                            });

                            var summaryData = {
                                bookCount: allBooks.length,
                                readerCount: allReaders.length,
                                grandTotalMinutes: grandTotalMinutes
                            };

                            dataCache.put('summary', summaryData);

                            deferred.resolve(summaryData);
                        });
            }
            return deferred.promise;
        }

        function deleteSummaryFromCache() {
            var dataCache = $cacheFactory.get('bookLoggerCache');
            if (dataCache) {
                dataCache.remove('summary');
            }
        }

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            }).then(sendResponseData).catch(sendError);
        }

        function transformGetBooks(data, headerGetter) {
            var transformed = angular.fromJson(data);
            transformed.forEach(function (value, index, array) {
                value.dateDownloaded = new Date();
            });
            //console.log(transformed);
            return transformed;
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
            deleteSummaryFromCache();
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
            deleteSummaryFromCache();
            
            return $http.post('api/books', book, {
                transformRequest: transformAddBook
            }).then(addBookSuccess).catch(addBookError);
        }

        function transformAddBook(data, headerGetter) {
            data.newBook = true;
            console.log(data);
            return JSON.stringify(data);
        }

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(response) {
            return $q.reject('Error adding book. (HTTP status: '
                    + response.status + ')');
        }

        function deleteBook(bookID) {
            deleteSummaryFromCache();
            
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
            deleteBook: deleteBook,
            getUserSummary: getUserSummary
        };
    }

    dataService.$inject = ['logger'];
}());