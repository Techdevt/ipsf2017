(function() {
    'use strict';

    angular.module('ipsf.core', [
        /*
        angular modules
        */
        'ngMaterial',
        'ngMessages',
        'ngAnimate',
        'ngSanitize',
        'ngTouch',
        /*
        our app modules
        */
        'blocks.exception',
        'blocks.logger',
        'blocks.router',
        'blocks.router.404',

        /*
        third party modules
        */
        'ngplus',
        'ui.router',
        'ngMdIcons',
        'angularUtils.directives.dirPagination',
        'djds4rce.angular-socialshare',
        'angularUtils.directives.dirDisqus',
        'angular.filter',
        'jkuri.gallery',
        'angularSoundManager',
        'pdf',
        'smoothScroll'
    ]);

})();
