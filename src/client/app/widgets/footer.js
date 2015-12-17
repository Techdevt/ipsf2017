(function() {
    'use strict';

    angular
        .module('ipsf.widgets')
        .directive('footerTemplate', Footer);

    function Footer() {
        var templateString = [
            '<footer class="footer">',
            '<div class="footer-container" layout="column">',

            '</div>',
            '<div layout="row" class="copyright" layout-fill>',
            '<p>&copy;{{Date | date : "yyyy"}} IPSF2017</p>',
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
