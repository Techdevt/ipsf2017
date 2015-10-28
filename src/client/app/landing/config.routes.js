(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .run(routeConfig);

    routeConfig.$inject = ['routerHelper'];
    /* @ngInject */

    function routeConfig(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'landing',
            config: {
                abstract: true,
                url: '/',
                title: 'Landing Page',
                template: '<div ui-view class="page-wrap fade-in-animation"></div>',
                controller: 'Landing',
                controllerAs: 'vm'
            }
        }, {
            state: 'landing.home',
            config: {
                url: '',
                title: 'Home',
                templateUrl: 'app/landing/home.html'
            }
        }, {
            state: 'landing.about',
            config: {
                url: '^/about',
                title: 'About Us',
                templateUrl: 'app/landing/about.html'
            }
        }, {
            state: 'landing.about.history',
            config: {
                url: '^/about/',
                title: 'History',
                templateUrl: 'app/landing/about/history.html'
            }
        }, {
            state: 'landing.about.executives',
            config: {
                url: '^/about/executives',
                title: 'Executives',
                templateUrl: 'app/landing/about/executives.html'
            }
        }, {
            state: 'landing.about.nec',
            config: {
                url: '^/about/NEC',
                title: 'NEC',
                templateUrl: 'app/landing/about/nec.html'
            }
        }, {
            state: 'landing.about.aims',
            config: {
                url: '^/about/aims',
                title: 'Aims',
                templateUrl: 'app/landing/about/aims.html'
            }
        }, {
            state: 'landing.about.operations',
            config: {
                url: '^/about/operations',
                title: 'Operations',
                templateUrl: 'app/landing/about/operations.html'
            }
        }, {
            state: 'landing.about.structure',
            config: {
                url: '^/about/structure',
                title: 'Structure',
                templateUrl: 'app/landing/about/structure.html'
            }
        }, {
            state: 'landing.contact',
            config: {
                url: '^/contact',
                title: 'Contact Us',
                templateUrl: 'app/landing/contact.html'
            }
        }, {
            state: 'landing.blog',
            config: {
                url: '^/blog',
                title: 'Blog',
                templateUrl: 'app/landing/blog.html',
                controller: 'Blog',
                controllerAs: 'vm'
            }
        }];
    }

})();
