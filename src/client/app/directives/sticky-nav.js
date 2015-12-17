(function() {
    'use strict';

    angular
        .module('ipsf.directives')
        .directive('stickyNav', stickyNav);

    stickyNav.$inject = ['$'];

    /* @ngInject */
    function stickyNav($) {
        var templateString = [
            '<div class="sticky-subnav" id="sticky-subnav">',
            '<div class="grid">',
            '<div class="grid__col--12">',
            '<ul class="sticky-subnav-list">',
            '<li class="sticky-subnav-item"><a ui-sref="landing.blog.all" ui-sref-active="active">All</a></li>',
            '<li class="sticky-subnav-item"><a ui-sref="landing.blog.events" ui-sref-active="active">Events</a></li>',
            '<li class="sticky-subnav-item"><a ui-sref="landing.blog.articles" ui-sref-active="active">Articles</a></li>',
            '<li class="sticky-subnav-item"><a ui-sref="landing.blog.news" ui-sref-active="active">News</a></li>',
            '<li class="sticky-subnav-item"><a ui-sref="landing.blog.videos" ui-sref-active="active">Videos</a></li>',
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
        };
    }
})();
