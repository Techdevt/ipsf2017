(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .controller('Single', Single);

    Single.$inject = ['post'];
    /* @ngInject */
    function Single(post) {
        var vm = this;
        vm.post = post;
    }
})();
