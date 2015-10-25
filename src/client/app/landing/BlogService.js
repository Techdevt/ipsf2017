(function(){
	'use strict';

	angular
		.module('gnaas.landing')
		.factory('BlogService', BlogService);

	BlogService.$inject = ['XHR','$q','logger'];
	function BlogService(XHR,$q,logger){
		var service = {
			create: create,
			getAll: getAll
		};
		return service;
		//////////////


		function create(postModel){
			var url = '/api/BlogPosts/create';
			var deferred = $q.defer();
			XHR.post(url, postModel)
			   .then(function(result){
			   	   deferred.resolve(result);
			   }, function(error){
			   	   logger.error(error);
			   });

			return deferred.promise;
		}

		function getAll(){
			var url = '/api/BlogPosts';
			var deferred = $q.defer();
			XHR.get(url)
			   .then(function(result){
			   		deferred.resolve(result.data);
			   }, function(error){
			   		logger.error(error);
			   });
			return deferred.promise;
		}
	}

})();