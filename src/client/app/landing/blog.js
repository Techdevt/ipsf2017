(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .controller('Blog', Blog);

    Blog.$inject = ['$scope', '$mdDialog', 'BlogService', '_'];

    function Blog($scope, $mdDialog, BlogService, _) {
        var vm = this;
        vm.items = [1, 2, 3];
        vm.blogPosts = [];

        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = 'EMAIL';
        ftypes[0] = 'email';
        fnames[1] = 'FNAME';
        ftypes[1] = 'text';
        fnames[2] = 'LNAME';
        ftypes[2] = 'text';
        var $mcj = jQuery.noConflict(true);


        activate();

        function activate() {

        }
    }
})();
