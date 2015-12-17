(function() {
    'use strict';

    angular.module('ipsf.widgets')
        .directive('ccDate', ccDate);

    ccDate.$inject = ['moment'];

    function ccDate(moment) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.text(moment(attrs.ccDate).format('LLL'));
            }
        };
    }
})();
