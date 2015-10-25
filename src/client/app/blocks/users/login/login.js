(function() {
    'use strict';

    angular.module('blocks.users')
        .controller('login', Login);

    Login.$inject = ['auth'];
    function Login(auth) {
        var vm = this;
        vm.loginData = {
            userName: '',
            password: ''
        };

        vm.isAuth = function() {
            if (!auth.oauth_data.hasOwnProperty('oauth_token'))
                return false;
            return true;
        }

        vm.isAuth() ? false : auth.authenticate();
        vm.isLoginActive = vm.isAuth();

        vm.login = function() {
            auth.login(vm.loginData);
        };

    }

})();
