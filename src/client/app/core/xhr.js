(function() {
    'use strict';

    angular.module('ipsf.core')
        .factory('XHR', XHR);

    XHR.inject = ['$http', '$q', '$rootScope', 'logger', 'config'];
    /* @ngInject */
    function XHR($http, $q, $rootScope, logger, config) {
        var service = {
            get: get,
            post: post,
            postwww: postUrlFormDataEncoded,
            // upload: upload,
            delet: delet
        };
        var backend = config.backend;
        return service;
        /////////////

        function get(url) {
            url = backend + url;
            var promise = $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return promise;
        }

        function post(url, data) {
            console.log(data);
            url = backend + url;
            var deferred = $q.defer();
            var promise = $http({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            promise
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }

        function postUrlFormDataEncoded(url, data) {
            url = backend + url;
            var deferred = $q.defer();
            var promise = $http({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });

            promise
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function delet(url, body) {
            url = backend + url;
            var deferred = $q.defer();

            var promise = $http({
                method: 'DELETE',
                url: url,
                data: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            promise
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    }
})();
