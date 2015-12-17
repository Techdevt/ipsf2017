(function() {
    'use strict';

    angular.module('ipsf.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$scope', '$location', '$mdSidenav', '$mdMedia', 'morlock', '$window', '$state'];

    function Shell($scope, $location, $mdSidenav, $mdMedia, morlock, $window, $state) {
        $scope.$location = $location.path();
        $scope.shrink = $mdMedia('(min-width: 850px)');

        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        function updateShrink() {
            $scope.$apply(function() {
                $scope.shrink = $mdMedia('(min-width: 850px)');
            });
        }

        function goToUrl(url, params) {
            $state.go(url, params);
        }

        function closeSideNav(event) {
            event.preventDefault();
            if ($mdSidenav('left').isOpen()) {
                $mdSidenav('left').close();
            }
        }

        morlock.onResizeEnd(updateShrink);

        $window.addEventListener('resize', updateShrink);
        $window.addEventListener('scroll', closeSideNav);
        $scope.goToUrl = goToUrl;
    }

})();
