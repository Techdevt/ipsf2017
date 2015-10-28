(function() {
    'use strict';

    angular
        .module('gnaas.services')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['XHR', '$q', 'logger'];

    /* @ngInject */
    function BlogService(XHR, $q, logger) {
        var service = {
            getSingle: getSingle,
            getAll: getAll
        };
        return service;
        //////////////


        function getSingle(context) {
            return true;
        }

        function getAll() {
            return true;
        }
    }

})();
