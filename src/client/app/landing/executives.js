(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .controller('Executives', Executives);

    Executives.$inject = ['executives'];
    /* @ngInject */
    function Executives(executives) {
        var vm = this;
        vm.executives = executives;
    }
})();
