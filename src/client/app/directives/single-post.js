(function() {
    'use strict';

    angular
        .module('gnaas.directives')
        .directive('singlePost', singlePost);

    function singlePost() {
        var videoTemplate = '<h1>video</h1>';
        var eventTemplate = '<h1>event</h1>';
        var articleTemplate = '<h1>article</h1>';

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
        }
        return {
            restrict: 'E',
            scope: {
                post: '='
            },
            link: function(scope, element, attrs) {
                element.html(getTemplate(scope.post.type)).show();
                $compile(element.contents())(scope);
            }
        };
    }
})();
