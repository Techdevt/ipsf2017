(function() {
    'use strict';

    angular.module('blocks.auth')
        .factory('auth', auth);

    auth.$inject = ['logger', 'XHR', 'AuthToken', '$state', '$window', '$q', 'config', '$timeout', 'authorization', '$interval'];

    function auth(logger, XHR, AuthToken, $state, $window, $q, config, $timeout, authorization, $interval) {
        var storage = $window.localStorage;
        var oauth_data = {};
        var requestEnd = '/oauth1/request';
        var authBackend = '/oauth1/authorize';
        var accessTokenBackend = '/oauth1/access';
        var consumerId = 29;
        var oauth_timestamp = Math.floor(new Date().getTime() / 1000);
        var callback = config.backend + '/callback.php';

        var userInfo = JSON.parse(storage.getItem('userInfo')) || undefined;

        var service = {
            authenticate: authenticate,
            oauth_data: oauth_data,
            login: login,
            registerClient: register,
            logout: logout,
            user: getUser
        };

        return service;
        //////////////
        function authenticate() {
            var httpMethod = 'POST',
                url = config.backend + '/gnaas/oauth1/request',
                parameters = {
                    oauth_consumer_key: config.consumerKey,
                    oauth_nonce: myLocalized.nonce,
                    oauth_signature_method: 'HMAC-SHA1',
                    oauth_timestamp: oauth_timestamp
                },
                consumerSecret = config.consumerSecret,
                signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, null, {
                    encodeSignature: false
                });

            var data = 'oauth_consumer_key=' + config.consumerKey + '&oauth_nonce=' + myLocalized.nonce + '&oauth_signature=' + signature + '&oauth_signature_method=HMAC-SHA1&oauth_timestamp=' + oauth_timestamp;
            XHR
                .postwww(requestEnd, data)
                .then(function(result) {
                    oauth_data = form2json(result);
                    oauth_data.signature = signature;
                    $state.go('login');
                }, function(error) {
                    $window.location.reload();
                });
        }

        function login(loginData) {
            if (!oauth_data.hasOwnProperty('oauth_token'))
                return;
            var data = 'log=' + loginData.userName + '&pwd=' + loginData.password;

            XHR.postwww('/wp-login.php', data)
                .then(function(result) {
                    //get access token
                    XHR.postwww('/wp-login.php?action=oauth1_authorize', 'oauth_token=' + oauth_data.oauth_token)
                        .then(function(result) {
                            var _url = config.backend + '/wp-login.php?action=oauth1_authorize&oauth_token=' + oauth_data.oauth_token + '&oauth_callback=' + callback;
                            var win = $window.open(_url, 'Authorize', 500, 500);
                            win.focus();
                            win.onload = function() {
                                var popupPromise = $interval(function() {
                                    try {
                                        if (typeof String.prototype.startsWith != 'function') {
                                            String.prototype.startsWith = function(str) {
                                                return str.length > 0 && this.substring(0, str.length) === str;
                                            }
                                        };
                                        if (win.document.URL.startsWith(callback)) {
                                            $interval.cancel(popupPromise);
                                            var url = win.document.URL;
                                            var oauth_values = form2json(url);

                                            oauth_data.wp_scope = decodeURIComponent(gup(url, 'wp_scope'));
                                            oauth_data.oauth_verifier = decodeURIComponent(gup(url, 'oauth_verifier'));
                                            win.close();
                                            var access_query = 'oauth_consumer_key=' + config.consumerKey + '&oauth_timestamp=' + oauth_timestamp + '&oauth_nonce=' + myLocalized.nonce + '&oauth_signature=' + oauth_data.signature + '&oauth_signature_method=HMAC-SHA1&oauth_verifier=' + oauth_data.oauth_verifier + '&oauth_token=' + oauth_data.oauth_token;
                                            XHR.postwww(accessTokenBackend, access_query)
                                                .then(function(result) {
                                                    oauth_data.access_token = form2json(result);
                                                    AuthToken.setToken(oauth_data.access_token);
                                                    XHR.get('/wp-json/wp/v2/users/me')
                                                        .then(function(result) {
                                                            console.log(result);
                                                            $state.go('home');
                                                        }, function(error) {
                                                            console.log(error);
                                                        });
                                                }, function(error) {
                                                    console.log(error);
                                                });
                                        }
                                    } catch (e) {

                                    }
                                }, 100);
                            }
                        });
                }, function(error) {
                    console.log(error);
                });
        }

        function logout() {
            //implement logout after token kill on backend
            var logoutBackend = '/api/logout';

            AuthToken.removeToken();
            authorization
                .resetPermissions()
                .then(function() {
                    userInfo = null;
                    storage.removeItem('userInfo');
                    $state.go('login');
                }, function() {
                    logger.error('Logout Failure, Try again...', null, 'Oops!');
                });
        }


        function register(data, userType) {
            var url = '/api/account/register/' + userType;
            var successMsg = 'You Have Successfully Registered, You will be redirected to Login Page in 3 Seconds...';
            var errorMsg = 'Registration Failed';

            XHR.post(url, data)
                .then(function(result) {
                    logger.success(successMsg, null, 'Congratulations!');
                    $timeout(function() {
                        $state.go('login');
                    }, 3000);
                }, function(response) {
                    if (response.modelState) {
                        var errors = [];
                        for (var key in response.modelState) {
                            for (var i = 0; i < response.modelState[key].length; i++) {
                                errors.push(response.modelState[key][i]);
                            }
                        }

                        angular.forEach(errors, function(error) {
                            logger.error(error, null, response.message);
                        });
                    } else {
                        logger.error(response.exceptionMessage, null, response.message);
                    }
                });
        }

        function getUser() {
            var deferred = $q.defer();

            if (typeof userInfo === 'string') {
                deferred.resolve(JSON.parse(userInfo));
            } else if (typeof userInfo === 'object') {
                deferred.resolve(userInfo);
            } else {
                deferred.reject(userInfo);
            }
            return deferred.promise;
        }

        function form2json(str) {
            var keyValuePairs = str.split('&');
            var json = {};
            for (var i = 0, len = keyValuePairs.length, tmp, key, value; i < len; i++) {
                tmp = keyValuePairs[i].split('=');
                key = decodeURIComponent(tmp[0]);
                value = decodeURIComponent(tmp[1]);
                if (key.search(/\[\]$/) != -1) {
                    tmp = key.replace(/\[\]$/, '');
                    json[tmp] = json[tmp] || [];
                    json[tmp].push(value);
                } else {
                    json[key] = value;
                }
            }
            return json;
        }

        function gup(url, name) {
            name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
            var regexS = "[\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            if (results == null)
                return "";
            else
                return results[1];
        }
    }
})();
