(function(){
	'use strict';

	angular
		.module('blocks.auth')
		.factory('RoleManager', RoleManager);

	RoleManager.$inject = ['$window','authorization'];
	function RoleManager($window,authorization){
		var storage = $window.localStorage;
		// var user = JSON.parse(storage.getItem('userInfo')) || {};
		var permissionModel = authorization.permissionModel;
		var service = {
			getUserRoles: getUserRoles,
		};
		return service;
		//////////////

		function getUserRoles(){
			if(permissionModel.hasOwnProperty('permission')){
				return permissionModel.permission;
			}else{
				return [];
			}
		}


	}
})();