(function() {
    'use strict';

    angular
        .module('gnaas.widgets')
        .directive('footerTemplate', Footer);

    function Footer() {
        var templateString = [
            '<footer class="footer">',
            '<div class="footer-container" layout="column">',
            '<div layout="row" layout-sm="column">',
            '<div flex="45" flex-sm="100" class="social-links" layout="row" layout-align="center center">',
            '<div class="social-link">',
            '<a href="https://www.facebook.com/gnaas2015" target="_blank">',
            '<i class="fa fa-facebook"></i>',
            '</a>',
            '</div>',
            '<div class="social-link">',
            '<a href="https://twitter.com/gnaasgh" target="_blank">',
            '<i class="fa fa-twitter"></i>',
            '</a>',
            '</div>',
            '<div class="social-link">',
            '<a href="https://www.youtube.com/channel/UCgH3ShIjeuBTTopQeg6aXAA" target="_blank">',
            '<i class="fa fa-youtube-play"></i>',
            '</a>',
            '</div>',
            '<div class="social-link">',
            '<a href="https://plus.google.com/u/0/107903844483698496222" target="_blank">',
            '<i class="fa fa-google-plus"></i>',
            '</a>',
            '</div>',

            '</div>',

            '<div class="links" flex="55" flex-sm="100" layout="column" layout-align="center">',
            '<ul>',
            '<li>',
            '<a target="_blank" href="http://ug.gnaas.org/">University of Ghana</a>',
            '</li>',
            '<li>',
            '<a target="_blank" href="http://udsnav.gnaas.org/">University of Development Studies, Navrongo Campus</a>',
            '</li>',
            '<li>',
            '<a target="_blank" href="http://knust.gnaas.org/">University of Science and Technology</a>',
            '</li>',
            '</ul>',
            '</div>',

            '</div>',
            '<div layout="row" class="copyright" layout-fill>',
            '<p>&copy;{{Date | date : "yyyy"}} GNAAS</p>',
            '</div>',
            '</div>',
            '</footer>'
        ].join('\n');
        return {
            restrict: 'E',
            replace: true,
            template: templateString
        };
    }
})();
