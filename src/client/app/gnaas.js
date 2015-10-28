(function() {
    'use strict';

    angular
        .module('gnaas')
        .controller('Gnaas', Gnaas);

    Gnaas.$inject = ['$scope','$location','AuthToken','auth', '$state', '$'];
    function Gnaas($scope,$location,AuthToken,auth, $state, $) {
        $scope.Date = new Date();
        $scope.isAuthenticated = AuthToken.isAuthenticated;

    	$scope.isDashView = function(){
            var current = $state.current.name;
            var sub = '';
            if(current !== ''){
              sub = current.substr(0, 4);
            }
            return sub === 'home';
        };

        $scope.logout = function(){
            auth.logout();
        };

        $scope.goToUrl = function(url, params) {
            $state.go(url, params);
        };

        $scope.openNav = function(){
            $('html').toggleClass('nav-expanded');
            $('.drawer-about').toggleClass('flip');
        };

    }

})();

