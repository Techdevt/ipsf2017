(function() {
    'use strict';

    angular
        .module('blocks.users')
        .run(routeConfig);

    routeConfig.$inject = ['routerHelper'];
    /* @ngInject */

    function routeConfig(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'login',
            config: {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/blocks/users/login/login.html',
                controller: 'Login',
                controllerAs: 'vm'
            }
        }];
    }
})();
