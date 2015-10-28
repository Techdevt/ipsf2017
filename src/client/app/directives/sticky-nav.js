(function() {
    'use strict';

    angular
        .module('gnaas.directives')
        .directive('stickyNav', stickyNav);

    stickyNav.$inject = ['$'];

    /* @ngInject */
    function stickyNav($) {
        var templateString = [
            '<div class="sticky-subnav">',
            '<div class="grid">',
            '<div class="grid__col--12">',
            '<ul class="sticky-subnav-list">',
            '<li class="sticky-subnav-item"><a href="http://blog.teamtreehouse.com/category/learn">All</a></li>',
            '<li class="sticky-subnav-item"><a href="http://blog.teamtreehouse.com/category/community">Events</a></li>',
            '<li class="sticky-subnav-item"><a href="http://blog.teamtreehouse.com/category/industry">Articles</a></li>',
            '<li class="sticky-subnav-item"><a href="http://blog.teamtreehouse.com/category/industry">News</a></li>',
            '<li class="sticky-subnav-item"><a href="http://blog.teamtreehouse.com/category/news">Videos</a></li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>'
        ].join('\n');
        return {
            restrict: 'E',
            replace: true,
            template: templateString,
            link: function(scope, elem, attrs) {
                $(window).resize(function() {
                    var windowHeight = $(window).height();
                    $(document).scroll(function() {
                        var y = $(this).scrollTop();
                        if (y > 320) {
                            $('html').addClass('sticky');
                        } else {
                            $('html').removeClass('sticky');
                        }
                    });
                }).resize();
            }
        }
    }
})();
