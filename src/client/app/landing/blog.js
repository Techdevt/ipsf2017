(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .controller('Blog', Blog);

    Blog.$inject = ['$scope', '$mdDialog', 'BlogService', '_'];

    function Blog($scope, $mdDialog, BlogService, _) {
        var vm = this;
    }
})();
