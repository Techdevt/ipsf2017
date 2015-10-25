(function(){
'use strict';

	angular.module('gnaas.core',[
		/*
		angular modules
		*/
		'ngMaterial',
		'ngMessages',
		'ngAnimate',
		'ngSanitize',
		'ngTouch',
		/*
		our app modules
		*/
		'blocks.exception',
		'blocks.logger',
		'blocks.router',
		'blocks.router.404',
		'blocks.users',
		'blocks.auth',

		/*
		third party modules
		*/
		'ngplus',
		'ui.router',
		'ngMdIcons',
		'FBAngular'
		]);

})();
