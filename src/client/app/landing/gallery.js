(function(){
	'use strict';

	angular
		.module('gnaas.landing')
		.controller('Gallery', Gallery);

	Gallery.$inject = ['$scope', 'albums', '_'];
	/* @ngInject */
	function Gallery($scope, albums, _){
		var vm = this;
		vm.active = 0;
		vm.albums = albums;
		vm.albumsArray = _.toArray(albums);
		vm.activeAlbum = vm.albumsArray[0];

		vm.setActive = function(index){
			vm.active = index;
			vm.activeAlbum = vm.albumsArray[vm.active];
		};
	}

})();