(function() {
    'use strict';

    angular
        .module('gnaas.directives')
        .directive('singlePost', singlePost);

    singlePost.$inject = ['$compile', 'common', '$location', 'config'];
    /* @ngInject */
    function singlePost($compile, common, $location, config) {
        var eventTemplate = '<div class="single-view single-view-event"> \n' +
            '<div class="single-view-content"> \n' +
            '<div class="single-hero"> \n' +
            '<a target="_blank" href="{{post.featured_image || defaults.event}}" class="the-image"> \n' +
            '<img src="{{post.featured_image}}" alt="post image"> \n' +
            '</a> \n' +
            '</div> \n' +
            '<section class="post-body"> \n' +
            '<aside class="entry-meta"> \n' +
            '<a style="border-color:#65d7df; color:#65d7df" ui-sref="landing.blog.events" class="entry-category-icon"> \n' +
            '<ng-md-icon icon="event_note" size="24" aria-label="Event"></ng-md-icon> \n' +
            '</a> \n' +
            '<p class="entry-categories"><a ui-sref="landing.blog.events" style="color:#65d7df" \n' +
            'title="View all posts in Events">Events</a></p> \n' +
            '<p class="entry-tags"><a href="#" class="blog-tag">{{post.tag}}</a></p> \n' +
            '</aside> \n' +
            '<h4 class="entry-authordate"> \n' +
            '<span class="author"><a href="#" title="Posts by {{post.author.name}}" rel="author">{{post.author.name}}</a> —</span> \n' +
            '<span class="date">{{post.modified | date: \'medium\'}}</span> \n' +
            '</h4> \n' +
            '<h1 class="entry-title" ng-bind-html="post.title.rendered"></h1> \n' +
            '<div class="entry-content wysiwyg-content wp-content" ng-bind-html="post.content.rendered"></div> \n' +
            '<aside class="event-details"> \n' +
            '<h3 class="small-title">Event Details</h3> \n' +
            '<div class="location-group"> \n' +
            '<h2 class="location-name"> \n' +
            '<ng-md-icon icon="place" size="24" aria-label="location"></ng-md-icon> \n' +
            '{{post.acf.location}}</h2> \n' +
            '<address> \n' +
            '<a href="#">{{post.acf.address}}</a> \n' +
            '</address> \n' +
            '</div> \n' +
            '<div class="date-group"> \n' +
            '<h2 class="date-time">\n' +
            '<ng-md-icon icon="event_note" size="24" aria-label="time"></ng-md-icon> \n' +
            '{{post.acf.event_date}}</h2> \n' +
            '</div> \n' +
            '</aside> \n' +
            '<aside class="author-info"> \n' +
            '<div class="author-image"> \n' +
            '<span class="the-image" style="background-image: url({{post.author.avatar}});"></span> \n' +
            '</div> \n' +
            '<p class="posted-on">Posted on {{post.modified | date: \'medium\'}}</p> \n' +
            '<p class="name-title"><a href="#" title="Posts by {{post.author.name}}" rel="author"> \n' +
            '{{post.author.name}}</a>, <span class="title" style="text-transform: capitalize;">{{post.author.role}} at GNAAS</span></p> \n' +
            '</aside> \n' +
            '<aside class="single-shares"> \n' +
            '<h3 class="small-title">Share This Post</h3> \n' +
            '<div class="social-buttons"> \n' +
            '<a facebook-feed-share class="facebookShare" data-url=\'http://gnaas.org\' data-picture="{{post.featured_image}}" \n' +
            'data-shares=\'shares\' data-caption="{{post.title.rendered | htmlToPlaintext}}" data-description="{{post.content.rendered | htmlToPlaintext}}" \n' +
            ' data-properties="{\'text\': {{post.content.rendered | htmlToPlaintext}}, \'href\': {{location}}}">{{ shares }} \n' +
            '</a> \n' +
            '<a twitter  data-lang="en" data-count="horizontal" data-url={{location}} \n' +
            'data-via="GNAAS" data-size="medium" data-text="{{post.title.rendered | htmlToPlaintext | limitTo: 80 }}" ></a> \n' +
            '</div> \n' +
            '</aside> \n' +
            '</section> \n' +
            '<aside class="single-disqus"> \n' +
            '<h3 class="small-title">Comment on this {{post.type}}</h3> \n' +
            '<dir-disqus disqus-shortname="gnaas" disqus-identifier="{{ post.id }}" disqus-title="{{ post.title.rendered | htmlToPlaintext }}" \n' +
            'disqus-url="{{ location }}" disqus-disable-mobile="false" disqus-config-language="en" ready-to-bind="{{ loaded }}"> \n' +
            '</dir-disqus> \n' +
            '</aside> \n' +
            '</div> \n' +
            '</div>';

        var videoTemplate = '<div class="single-view single-view-video"> \n' +
            '<div class="single-view-content"> \n' +
            '<div class="video-hero"> \n' +
            '<div class="the-video youtube"> \n' +
            '<iframe width="600" height="350" ng-src="{{\'https://www.youtube.com/embed/\' + post.youtubeId}}" frameborder="0" allowfullscreen=""></iframe> \n' +
            '</div> \n' +
            '</div> \n' +
            '<section class="post-body"> \n' +
            '<aside class="entry-meta"> \n' +
            '<a style="border-color:#fc5252; color:#fc5252" ui-sref="landing.blog.videos" class="entry-category-icon"> \n' +
            '<ng-md-icon icon="video_collection" size="24" aria-label="Video"></ng-md-icon> \n' +
            '</a> \n' +
            '<p class="entry-categories"><a ui-sref="landing.blog.videos" style="color:#fc5252" \n' +
            'title="View all posts in Videos">Videos</a></p> \n' +
            '<p class="entry-tags"><a href="#" class="blog-tag">{{post.tag}}</a></p> \n' +
            '</aside> \n' +
            '<h4 class="entry-authordate"> \n' +
            '<span class="author"><a href="#" title="Posts by {{post.author.name}}" rel="author">{{post.author.name}}</a> —</span> \n' +
            '<span class="date">{{post.modified | date: \'medium\'}}</span> \n' +
            '</h4> \n' +
            '<h1 class="entry-title" ng-bind-html="post.title.rendered"></h1> \n' +
            '<div class="entry-content wysiwyg-content wp-content" ng-bind-html="post.content.rendered"></div> \n' +
            '<aside class="author-info"> \n' +
            '<div class="author-image"> \n' +
            '<span class="the-image" style="background-image: url({{post.author.avatar}});"></span> \n' +
            '</div> \n' +
            '<p class="posted-on">Posted on {{post.modified | date: \'medium\'}}</p> \n' +
            '<p class="name-title"><a href="#" title="Posts by {{post.author.name}}" rel="author"> \n' +
            '{{post.author.name}}</a>, <span class="title" style="text-transform: capitalize;">{{post.author.role}} at GNAAS</span></p> \n' +
            '</aside> \n' +
            '<aside class="single-shares"> \n' +
            '<h3 class="small-title">Share This Post</h3> \n' +
            '<div class="social-buttons"> \n' +
            '<a facebook-feed-share class="facebookShare" data-url=\'http://gnaas.org\' data-picture="{{post.featured_image}}" \n' +
            'data-shares=\'shares\' data-caption="{{post.title.rendered | htmlToPlaintext}}" data-description="{{post.content.rendered | htmlToPlaintext}}" \n' +
            ' data-properties="{\'text\': {{post.content.rendered | htmlToPlaintext}}, \'href\': {{location}}}">{{ shares }} \n' +
            '</a> \n' +
            '<a twitter  data-lang="en" data-count="horizontal" data-url={{location}} \n' +
            'data-via="GNAAS" data-size="medium" data-text="{{post.title.rendered | htmlToPlaintext | limitTo: 80 }}" ></a> \n' +
            '</div> \n' +
            '</aside> \n' +
            '</section> \n' +
            '<aside class="single-disqus"> \n' +
            '<h3 class="small-title">Comment on this {{post.type}}</h3> \n' +
            '<dir-disqus disqus-shortname="gnaas" disqus-identifier="{{ post.id }}" disqus-title="{{ post.title.rendered | htmlToPlaintext }}" \n' +
            'disqus-url="{{ location }}" disqus-disable-mobile="false" disqus-config-language="en" ready-to-bind="{{ loaded }}"> \n' +
            '</dir-disqus> \n' +
            '</aside> \n' +
            '</div> \n' +
            '</div>';

        var articleTemplate = '<div class="single-view single-view-event"> \n' +
            '<div class="single-view-content"> \n' +
            '<div class="single-hero"> \n' +
            '<a target="_blank" href="{{post.featured_image || defaults.article}}" class="the-image"> \n' +
            '<img src="{{post.featured_image}}" alt="post image"> \n' +
            '</a> \n' +
            '</div> \n' +
            '<section class="post-body"> \n' +
            '<aside class="entry-meta"> \n' +
            '<a style="border-color:#65df7e; color:#65df7e" ui-sref="landing.blog.articles" class="entry-category-icon"> \n' +
            '<ng-md-icon icon="create" size="24" aria-label="Article"></ng-md-icon> \n' +
            '</a> \n' +
            '<p class="entry-categories"><a ui-sref="landing.blog.articles" style="color:#65df7e" \n' +
            'title="View all posts in Articles">Articles</a></p> \n' +
            '<p class="entry-tags"><a href="#" class="blog-tag">{{post.tag}}</a></p> \n' +
            '</aside> \n' +
            '<h4 class="entry-authordate"> \n' +
            '<span class="author"><a href="#" title="Posts by {{post.author.name}}" rel="author">{{post.author.name}}</a> —</span> \n' +
            '<span class="date">{{post.modified | date: \'medium\'}}</span> \n' +
            '</h4> \n' +
            '<h1 class="entry-title" ng-bind-html="post.title.rendered"></h1> \n' +
            '<div class="entry-content wysiwyg-content wp-content" ng-bind-html="post.content.rendered"></div> \n' +
            '<aside class="author-info"> \n' +
            '<div class="author-image"> \n' +
            '<span class="the-image" style="background-image: url({{post.author.avatar}});"></span> \n' +
            '</div> \n' +
            '<p class="posted-on">Posted on {{post.modified | date: \'medium\'}}</p> \n' +
            '<p class="name-title"><a href="#" title="Posts by {{post.author.name}}" rel="author"> \n' +
            '{{post.author.name}}</a>, <span class="title" style="text-transform: capitalize;">{{post.author.role}} at GNAAS</span></p> \n' +
            '</aside> \n' +
            '<aside class="single-shares"> \n' +
            '<h3 class="small-title">Share This Post</h3> \n' +
            '<div class="social-buttons"> \n' +
            '<a facebook-feed-share class="facebookShare" data-url=\'http://gnaas.org\' data-picture="{{post.featured_image}}" \n' +
            'data-shares=\'shares\' data-caption="{{post.title.rendered | htmlToPlaintext}}" data-description="{{post.content.rendered | htmlToPlaintext}}" \n' +
            ' data-properties="{\'text\': {{post.content.rendered | htmlToPlaintext}}, \'href\': {{location}}}">{{ shares }} \n' +
            '</a> \n' +
            '<a twitter  data-lang="en" data-count="horizontal" data-url={{location}} \n' +
            'data-via="GNAAS" data-size="medium" data-text="{{post.title.rendered | htmlToPlaintext | limitTo: 80 }}" ></a> \n' +
            '</div> \n' +
            '</aside> \n' +
            '</section> \n' +
            '<aside class="single-disqus"> \n' +
            '<h3 class="small-title">Comment on this {{post.type}}</h3> \n' +
            '<dir-disqus disqus-shortname="gnaas" disqus-identifier="{{ post.id }}" disqus-title="{{ post.title.rendered | htmlToPlaintext }}" \n' +
            'disqus-url="{{ location }}" disqus-disable-mobile="false" disqus-config-language="en" ready-to-bind="{{ loaded }}"> \n' +
            '</dir-disqus> \n' +
            '</aside> \n' +
            '</div> \n' +
            '</div>';

        var getTemplate = function(type) {
            var template = '';
            switch (type) {
                case 'video':
                    template = videoTemplate;
                    break;
                case 'article':
                    template = articleTemplate;
                    break;
                case 'event':
                    template = eventTemplate;
                    break;
            }
            return template;
        };

        return {
            restrict: 'E',
            scope: {
                post: '=',
                loaded: '@',
                defaults: '='
            },
            link: function(scope, element, attrs) {
                scope.location = config.frontEnd + $location.path();
                if (scope.post.type === 'video') {
                    scope.post.youtubeId = common.getYoutubeId(scope.post.acf['youtube_embed']);
                }
                element.html(getTemplate(scope.post.type)).show();
                $compile(element.contents())(scope);
            }
        };
    }
})();
