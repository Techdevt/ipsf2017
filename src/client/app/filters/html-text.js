(function() {
    'use strict';

    angular
        .module('gnaas.filters')
        .filter('htmlToPlaintext', htmlToPlaintext);

    function htmlToPlaintext() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }
})();
