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
            state: 'signup',
            config: {
                url: '/signup',
                title: 'Signup',
                templateUrl: 'app/blocks/users/signup/signup.html',
                controller: 'Signup',
                controllerAs: 'vm'
            }
        }];
    }
})();
