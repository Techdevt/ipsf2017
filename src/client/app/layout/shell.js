(function(){
	'use strict';

	angular.module('gnaas.layout')
		   .controller('Shell', Shell);

	Shell.$inject = ['$scope','$location','auth','$mdSidenav','$mdMedia','morlock','$window','$state'];
	function Shell($scope,$location,auth,$mdSidenav,$mdMedia,morlock,$window,$state){
		$scope.$location = $location.path();
	    $scope.shrink = $mdMedia('(min-width: 850px)');

	    $scope.toggleSidenav = function(menuId) {
		    $mdSidenav(menuId).toggle();
		};

		function updateShrink()
		{
			$scope.$apply(function(){
				$scope.shrink = $mdMedia('(min-width: 850px)');
			});
		}

		function goToUrl(url,params)
		{
			$state.go(url, params);
		}

		morlock.onResizeEnd(updateShrink);

		$window.addEventListener('resize', updateShrink);
		$scope.goToUrl = goToUrl;
	}
	
})();