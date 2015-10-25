(function(){
	'use strict';

	angular.module('blocks.users')
		   .controller('Signup', Signup);
		   
	Signup.$inject = ['auth'];

	function Signup(auth){
		var vm = this;
		vm.formData = {};

		vm.submit = function(){
			auth.registerClient(vm.formData, 'client');
		};
	}
	
})();