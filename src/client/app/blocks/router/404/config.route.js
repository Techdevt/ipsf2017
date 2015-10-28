(function() {
    'use strict';

    angular
        .module('blocks.router.404')
        .run(routeConfig);

    routeConfig.$inject = ['routerHelper'];
    /* @ngInject */

    function routeConfig(routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [{
            state: '404',
            config: {
                url: '/404',
                title: 'Page Not Found',
       			templateUrl: 'app/blocks/router/404/404.html'
            }

        }];
    }
})();
