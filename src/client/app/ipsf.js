(function() {
    'use strict';

    angular
        .module('ipsf')
        .controller('ipsf', ipsf);

    ipsf.$inject = ['$scope', '$location', '$state', '$'];

    function ipsf($scope, $location, $state, $) {
        $scope.Date = new Date();

        $scope.isDashView = function() {
            var current = $state.current.name;
            var sub = '';
            if (current !== '') {
                sub = current.substr(0, 4);
            }
            return sub === 'home';
        };

        $scope.goToUrl = function(url, params) {
            $state.go(url, params);
        };

        $scope.openNav = function() {
            $('html').toggleClass('nav-expanded');
            $('.drawer-about').toggleClass('flip');
        };

    }

})();
