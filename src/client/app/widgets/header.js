(function() {
    'use strict';
    angular
        .module('gnaas.widgets')
        .directive('appHeader', appHeader);

    appHeader.$inject = ['$compile', '$templateRequest', '$timeout', '$location', '$mdMedia', '$mdSidenav', '$window', '$state', 'auth'];
    /* @ngInject */
    function appHeader($compile, $templateRequest, $timeout, $location, $mdMedia, $mdSidenav, $window, $state, auth) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/header.html',
            controller: HeaderCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        function HeaderCtrl() {
            var vm = this;
            vm.src = './bower_components/material-design-icons';
            vm.shrink = $mdMedia('(min-width: 850px)');
            vm.shrinkLinks = updateShrink;

            vm.$blog = function() {
                return $location.path() === '/blog';
            };

            vm.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
            };

            vm.authenticate = auth.authenticate;

            function updateShrink() {
                vm.shrink = $mdMedia('(min-width: 850px)');

                if (!vm.$blog()) {
                    vm.shrinkLinks = $mdMedia('(min-width: 850px)');
                }
            }

            function setShadow(pageYOffset, pageXOffset) {
                return (pageYOffset > 0) ? addShadow() : removeShadow();
            }

            function addShadow() {
                angular.element('.header').addClass('box');
            }

            function removeShadow() {
                angular.element('.header').removeClass('box');
            }

            function goToUrl(url, params) {
                $state.go(url, params);
            }

            morlock.onResizeEnd(updateShrink);
            morlock.onScroll(setShadow);

            $window.addEventListener('resize', updateShrink);
            vm.goToUrl = goToUrl;
        }
    }

})();
