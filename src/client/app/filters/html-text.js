(function() {
    'use strict';

    angular
        .module('ipsf.filters')
        .filter('htmlToPlaintext', htmlToPlaintext);

    function htmlToPlaintext() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }
})();
