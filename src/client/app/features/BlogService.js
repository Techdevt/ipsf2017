(function() {
    'use strict';

    angular
        .module('gnaas.services')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['XHR', '$q', 'logger'];
    /* @ngInject */
    function BlogService(XHR, $q, logger) {
        var Blog = {};
        var service = {
            getSingle: getSingle,
            getAll: getAll,
            getFeatured: getFeatured
        };
        return service;
        //////////////

        function getSingle(context) {
            return true;
        }

        function getAll() {
            var url = '/wp-json/blog/all';
            var deferred = $q.defer();
            if (!angular.isDefined(Blog.All)) {
                XHR.get(url)
                    .then(function(result) {
                        Blog.All = result.data;
                        deferred.resolve(result.data);
                    }, function(error) {
                        deferred.reject(error);
                    });
            } else {
                deferred.resolve(Blog.All);
            }
            return deferred.promise;
        }

        function getFeatured() {
            var url = '/wp-json/blog/featured';
            var deferred = $q.defer();
            if (!angular.isDefined(Blog.Featured)) {
                XHR.get(url)
                    .then(function(result) {
                        Blog.Featured = result.data;
                        deferred.resolve(result.data);
                    }, function(error) {
                        deferred.reject(error);
                    });
            } else {
                deferred.resolve(Blog.Featured);
            }
            return deferred.promise;
        }
    }

})();
