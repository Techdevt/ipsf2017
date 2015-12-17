(function() {
    'use strict';

    angular
        .module('ipsf.landing')
        .controller('Blog', Blog);

    Blog.$inject = ['$scope', '$mdDialog', 'BlogService', '_', 'all', 'featured', '$filter', 'smoothScroll'];

    function Blog($scope, $mdDialog, BlogService, _, all, featured, $filter, smoothScroll) {
        var vm = this;
        vm.Blog = {};
        vm.defaults = {
            article: '/images/article.jpg',
            event: '/images/event.jpg'
        };

        if (all.length) {
            vm.Blog.All = all;
            vm.Blog.News = $filter('filter')(all, {
                'type': 'news'
            });
            console.log(vm.Blog.News);
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

        vm.Blog.Featured = featured;

        vm.scrollToTop = function(pageNum) {
            var element = document.getElementById('sticky-subnav');
            var options = {
                duration: 700,
                easing: 'easeInQuad',
                offset: 120
            };

            if (pageNum !== 1) {
                smoothScroll(element, options);
            }
        };
    }
})();
