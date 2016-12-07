(function () {
    angular.module('app')
            .factory('bookLoggerInterceptor',
                    ['$q', '$log', bookLoggerInterceptor]);

    function bookLoggerInterceptor($q, $log) {
        function requestInterceptor(config) {
            $log.debug('HTTP ' + config.method + ' request - ' + config.url);
            return config;
        }

        function requestErrorIterceptor(rejection) {
            $log.debug('HTTP ' + rejection.config.method
                    + ' response error - ' + rejection.config.url
                    + ' status code: ' + rejection.status);
            return $q.reject(rejection);
        }

        function responseErrorInterceptor(rejection) {
            $log.debug('HTTP ' + rejection.config.method
                    + ' response error - ' + rejection.config.url
                    + ' status code: ' + rejection.status);
            return $q.reject(rejection);
        }

        return {
            request: requestInterceptor,
            requestError: requestErrorIterceptor,
            responseError: responseErrorInterceptor

                    // not yet implemented - all interceptors are optional
                    // response
        };
    }
}());