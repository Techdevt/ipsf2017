(function() {
    'use strict';

    angular
        .module('ipsf.landing')
        .controller('Landing', Landing);

    Landing.$inject = ['$scope', '$timeout', 'XHR', 'logger'];

    function Landing($scope, $timeout, XHR, logger) {
        var vm = this;
        vm.contactForm = {};

        vm.submit = function() {
            XHR.postwww('/wp-json/contact/send?name=' + vm.contactForm.name +
                    '&email=' + vm.contactForm.email + '&subject=' + vm.contactForm.subject +
                    '&message=' + vm.contactForm.message)
                .then(function(result) {
                    //console.log(result);
                    logger.success(result);
                    vm.contactForm = {};
                }, function(error) {
                    logger.error(error, null, 'Oops!');
                });
        };
    }

})();
