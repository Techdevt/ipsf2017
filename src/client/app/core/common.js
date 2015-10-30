(function() {
    'use strict';
    angular.module('gnaas.core')
        .factory('common', common);

    common.$inject = ['$location', '$http', '$q', '$rootScope', '$timeout', 'logger'];

    /* @ngInject */
    function common($location, $http, $q, $rootScope, $timeout, logger) {
        var service = {
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            form2json: form2Json,
            randomString: randomString,
            getYoutubeId: getYoutubeId
        };

        return service;
        //////////////

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function form2Json(str) {
            var obj, i, pt, keys, j, ev;
            if (typeof form2Json.br !== 'function') {
                form2Json.br = function(repl) {
                    if (repl.indexOf(']') !== -1) {
                        return repl.replace(/\](.+?)(,|$)/g, function($1, $2, $3) {
                            return form2Json.br($2 + '}' + $3);
                        });
                    }
                    return repl;
                };
            }
            str = '{"' + (str.indexOf('%') !== -1 ? decodeURI(str) : str) + '"}';
            obj = str.replace(/\=/g, '":"').replace(/&/g, '","').replace(/\[/g, '":{"');
            obj = JSON.parse(obj.replace(/\](.+?)(,|$)/g, function($1, $2, $3) {
                return form2Json.br($2 + '}' + $3);
            }));
            pt = ('&' + str).replace(/(\[|\]|\=)/g, '"$1"')
                .replace(/\]"+/g, ']').replace(/&([^\[\=]+?)(\[|\=)/g, '"&["$1]$2');
            pt = (pt + '"').replace(/^"&/, '').split('&');
            for (i = 0; i < pt.length; i++) {
                ev = obj;
                keys = pt[i].match(/(?!:(\["))([^"]+?)(?=("\]))/g);
                for (j = 0; j < keys.length; j++) {
                    if (!ev.hasOwnProperty(keys[j])) {
                        if (keys.length > (j + 1)) {
                            ev[keys[j]] = {};
                        } else {
                            ev[keys[j]] = pt[i].split('=')[1].replace(/"/g, '');
                            break;
                        }
                    }
                    ev = ev[keys[j]];
                }
            }
            return obj;
        }

        function randomString(length) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        function getYoutubeId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            } else {
                //error
            }
        }
    }

})();
