(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .controller('Blog', Blog);

    Blog.$inject = ['$scope', '$mdDialog', 'BlogService', '_', 'all', 'featured', '$filter'];

    function Blog($scope, $mdDialog, BlogService, _, all, featured, $filter) {
        var vm = this;
        vm.Blog = {};

        if (all.length) {
            vm.Blog.All = all;
            vm.Blog.News = $filter('filter')(all, {
                'type': 'news'
            });
            vm.Blog.Articles = $filter('filter')(all, {
                'type': 'article'
            });
            vm.Blog.Videos = $filter('filter')(all, {
                'type': 'video'
            });
            vm.Blog.Events = $filter('filter')(all, {
                'type': 'event'
            });
            vm.Blog.try = $filter('filter')(all, {
                'featured': true
            });
        }

        vm.Blog.Featured = $filter('filter')(all, {
            'featured': true
        })[0];
    }
})();
