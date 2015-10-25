(function(){
	'use strict';

	angular
		.module('blocks.auth')
		.factory('AuthToken', AuthToken);

	AuthToken.$inject = ['$window','$q'];
	function AuthToken($window,$q){
		var storage = $window.localStorage;
		var cachedToken = JSON.parse(storage.getItem('userToken')) || {oauth_token: '', oauth_token_secret: ''};

		var service = {
			setToken: setToken,
			getToken: getToken,
			isAuthenticated: isAuthenticated,
			removeToken: removeToken
		};

		return service;
		///////////////

		function setToken(tokenObject){

			if(typeof tokenObject !== 'undefined'){
				storage.setItem('userToken', JSON.stringify(tokenObject));
				cachedToken = tokenObject;
				return true;
			}
			
			return false;
		}

		function getToken(){
			if(typeof cachedToken === 'object'){
				return cachedToken;
			}else{
				return JSON.parse(cachedToken);
			}
		}

		function isAuthenticated(){
			var deferred = $q.defer();			
			return !!(JSON.parse(storage.getItem('userToken')) || cachedToken.oauth_token);
		}

		function removeToken(){
			var deferred = $q.defer();

			cachedToken = {oauth_token: '', oauth_token_secret: ''};
			storage.removeItem('userToken');

			if(!cachedToken.token){
				deferred.resolve(true);
			}else{
				deferred.reject(false);
			}

			return deferred.promise;
		}
	}

})();