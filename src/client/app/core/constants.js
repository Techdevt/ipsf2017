/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('gnaas.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('_', lodash)
        .constant('$', jQuery);
})();
