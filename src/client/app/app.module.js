(function() {
    'use strict';

    angular.module('ipsf', [
        /*
         core modules provided...order is unimportant
        */
        'ipsf.core',
        'ipsf.widgets', //needs core

        /*
         feature modules
        */
        'ipsf.layout',
        'ipsf.landing',
        'ipsf.services',
        'ipsf.directives',
        'ipsf.animations',
        'ipsf.filters'
    ]);
})();
