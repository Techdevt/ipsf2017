(function() {
    'use strict';

    angular.module('blocks.users')
        .controller('Signup', Signup);

    Signup.$inject = ['auth'];
    /* @ngInject */
    function Signup(auth) {
        var vm = this;
        vm.formData = {};

        vm.submit = function() {
            auth.registerUser(vm.formData);
        };
    }
})();
