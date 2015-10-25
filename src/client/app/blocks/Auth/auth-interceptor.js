(function() {
    'use strict';

    angular
        .module('blocks.auth')
        .factory('AuthInterceptor', AuthInterceptor)
        .config(config);

    AuthInterceptor.$inject = ['$q', '$location','$injector', 'config'];

    function AuthInterceptor($q, $location,$injector,c) {
        var oauth_timestamp = Math.floor(new Date().getTime() / 1000);
        var service = {
            request: request,
            responseError: responseError
        };

        return service;
        //////////////

        function request(config) {
            config.headers = config.headers || {};
            var AuthToken = $injector.get('AuthToken');
            var authData = AuthToken.getToken();
            var url = config.url,
                httpMethod = config.method,
                parameters = {
                    oauth_consumer_key: c.consumerKey,
                    oauth_nonce: myLocalized.nonce,
                    oauth_signature_method: 'HMAC-SHA1',
                    oauth_timestamp: oauth_timestamp,
                    oauth_token: authData.oauth_token
                },
                consumerSecret = c.consumerSecret,
                signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, null, {
                    encodeSignature: false
                });
                console.log(authData);
            if (authData.oauth_token) {
                config.headers.Authorization = 'OAuth oauth_consumer_key=' + c.consumerKey + ' oauth_nonce =' + myLocalized.nonce + ' oauth_signature=' + signature + ' oauth_signature_method=' + parameters.oauth_signature_method +  ' oauth_timestamp=' + oauth_timestamp + ' oauth_token=' + authData.oauth_token;
            }
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                auth.logout();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    }

    function config($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    }
})();
