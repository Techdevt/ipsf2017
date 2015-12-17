(function() {
    'use strict';
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

    angular
        .module('ipsf.directives')
        .directive('allPost', allPost);

    allPost.$inject = ['common', '$compile'];
    /* @ngInject */
    function allPost(common, $compile) {
        var newsTemplate = '<div class="card-img-container"> \n' +
            '<a href="{{post.link}}" target="_blank" style="background-image:url({{post.featured_image[\'@attributes\'].url}})" class="card-img"></a> \n' +
            '<div class="card-favorite"> \n' +
            '<span class="wpfp-span"> \n' +
            '<a class="wpfp-link" href="#"> \n' +
            '<span class="icon ion-android-star-outline"></span> Favorite \n' +
            '</a> \n' +
            '</span> \n' +
            '</div> \n' +
            '</div> \n' +
            '<div class="card-content"> \n' +
            '<div class="card-meta"> \n' +
            '<span class="meta-date meta-box">{{post.date | date: \'medium\'}}</span> \n' +
            '</div> \n' +
            '<h2><a href="{{post.link}}" target="_blank"> \n' +
            '{{post.title}} \n' +
            '</a> \n' +
            '</h2> \n' +
            '</div> \n' +
            '<span class="meta-tags"> \n' +
            '<a ui-sref="landing.blog.news" title="news Tag" class="tag-{{post.type}}">news</a> \n' +
            '</span>';

        var videoTemplate = '<div class="card-img-container"> \n' +
            '<a ui-sref="landing.single({slug: post.slug})" style="background-image:url({{post.youtube_embed}})" class="card-img"></a> \n' +
            '<div class="card-favorite"> \n' +
            '<span class="wpfp-span"> \n' +
            '<a class="wpfp-link" href="#"> \n' +
            '<span class="icon ion-android-star-outline"></span> Favorite \n' +
            '</a> \n' +
            '</span> \n' +
            '</div> \n' +
            '</div> \n' +
            '<div class="card-content"> \n' +
            '<div class="card-meta"> \n' +
            '<div class="meta-icon meta-box"> \n' +
            '<ng-md-icon aria-label="play" icon="play_circle_fill" size="24"></ng-md-icon> \n' +
            '</div> \n' +
            '<span class="meta-date meta-box">{{post.modified | date: \'medium\'}}</span> \n' +
            '</div> \n' +
            '<h2><a ui-sref="landing.single({slug: post.slug})" ng-bind-html="post.title.rendered"> \n' +
            '</a> \n' +
            '</h2> \n' +
            '</div> \n' +
            '<span class="meta-tags"> \n' +
            '<a ui-sref="landing.blog.videos" title="Video Tag" class="tag-{{post.type}}">videos</a> \n' +
            '</span>';

        var defaultTemplate = '<div class="card-img-container"> \n' +
            '<a ui-sref="landing.single({slug: post.slug})" \n' +
            'style="background-image:url({{post.featured_image.url || post.type == \'event\' ? defaults.event : defaults.article}})" \n' +
            'class="card-img"></a><div class="card-favorite"> \n' +
            '<span class="wpfp-span"> \n' +
            '<a class="wpfp-link" href="#"> \n' +
            '<span class="icon ion-android-star-outline"></span> Favorite \n' +
            '</a> \n' +
            '</span> \n' +
            '</div> \n' +
            '</div> \n' +
            '<div class="card-content"> \n' +
            '<div class="card-meta"> \n' +
            '<span class="meta-date meta-box">{{post.modified | date: \'medium\'}}</span> \n' +
            '</div> \n' +
            '<h2><a ui-sref="landing.single({slug: post.slug})" ng-bind-html="post.title.rendered"> \n' +
            '</a> \n' +
            '</h2> \n' +
            '</div> \n' +
            '<span class="meta-tags"> \n' +
            '<a ui-sref="landing.blog.{{post.type}}" title="Video Tag" class="tag-{{post.type}}">{{post.type}}</a> \n' +
            '</span>';

        var getTemplate = function(type) {
            var template = '';
            switch (type) {
                case 'video':
                    template = videoTemplate;
                    break;
                case 'article':
                case 'event':
                    template = defaultTemplate;
                    break;
                case 'news':
                    template = newsTemplate;
                    break;
            }
            return template;
        };

        return {
            restrict: 'A',
            scope: {
                post: '=',
                defaults: '='
            },
            link: function(scope, element, attrs) {
                if (scope.post.type === 'video') {
                    scope.post.youtube_embed = 'http://img.youtube.com/vi/' + common.getYoutubeId(scope.post.acf['youtube_embed']) + '/maxresdefault.jpg';
                }
                element.html(getTemplate(scope.post.type)).show();
                $compile(element.contents())(scope);
            }
        };
    }
})();
