/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('ipsf.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('_', _)
        .constant('$', jQuery)
        .constant('morlock', morlock);
})();
