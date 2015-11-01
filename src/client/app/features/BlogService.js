(function() {
    'use strict';

    angular
        .module('gnaas.services')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['XHR', '$q', 'logger', '$filter'];
    /* @ngInject */
    function BlogService(XHR, $q, logger, $filter) {
        var Blog = {};
        var service = {
            getSingle: getSingle,
            getAll: getAll,
            getFeatured: getFeatured
        };
        return service;
        //////////////

        function getSingle(slug) {
            var deferred = $q.defer();
            var result;
            if (!angular.isDefined(Blog.All)) {
                getAll().then(function() {
                    result = filter(Blog.All, {
                        'slug': slug
                    });
                    deferred.resolve(result[0]);
                }, function(error) {
                    deferred.reject(error);
                });
            } else {
                result = filter(Blog.All, {
                    'slug': slug
                });
                deferred.resolve(result[0]);
            }
            return deferred.promise;
        }

        function filter(item, on) {
            return $filter('filter')(item, on);
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
