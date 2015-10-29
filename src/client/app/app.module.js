(function() {
    'use strict';

    angular.module('gnaas', [
        /*
         core modules provided...order is unimportant
        */
        'gnaas.core',
        'gnaas.data', //needs core
        'gnaas.widgets', //needs core

        /*
         feature modules
        */
        'gnaas.layout',
        'gnaas.landing',
        'gnaas.services',
        'gnaas.directives',
        'gnaas.animations',
        'gnaas.filters'
    ]);
})();
