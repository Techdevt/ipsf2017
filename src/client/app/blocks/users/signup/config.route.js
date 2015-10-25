(function(){
	'use strict';

	angular
		.module('blocks.users')
		.run(routeConfig);

	routeConfig.$inject = ['routehelper'];
	/* @ngInject */

	function routeConfig(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [{
			name : 'signup',
			url : '/signup',
			title : 'Signup',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.blocks + 'users/signup/signup.html',
							controller: 'Signup',
							controllerAs: 'vm'
					}
				},
				resolve: {
					
				}
			}
		}];
	}
})();