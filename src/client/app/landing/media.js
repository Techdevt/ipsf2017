(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .controller('Media', Media);

    Media.$inject = ['$scope', 'albums', '_', 'config', 'angularPlayer', '$mdDialog', '$timeout'];
    /* @ngInject */
    function Media($scope, albums, _, config, angularPlayer, $mdDialog, $timeout) {
        var vm = this;
        vm.media = albums;
        vm.audioImage = '/images/audio-spectrum.svg';
        vm.documentImage = '/images/document.svg';

        vm.playlist = angularPlayer.getPlaylist;
        vm.current = angularPlayer.getCurrentTrack();
        vm.setCurrentTrack = angularPlayer.setCurrentTrack;

        vm.gallery = albums.gallery;
        vm.selectedAlbum = _.toArray(vm.gallery)[0];

        vm.audio = albums.audio;
        vm.documents = albums.documents;
        vm.items = [1, 2, 3];

        vm.viewPDF = function(file) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                template: '<md-dialog aria-label="List dialog">' +
                    '  <md-dialog-content flex="66">' +
                    '<pdf-viewer delegate-handle="{{vm.pdf.title || $index}}" ' +
                    'url="vm.pdf.url" scale="1" show-toolbar="true" headers="{\'Access-Control-Allow-Origin\': \'*\'}">' +
                    '</pdf-viewer>' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions layout layout-align="center center">' +
                    '    <md-button ng-click="vm.closeDialog()" class="md-primary">' +
                    '      Close' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</md-dialog>',
                locals: {
                    pdf: file
                },
                controller: DialogController,
                controllerAs: 'vm'
            });

            function DialogController($mdDialog, pdf) {
                var vm = this;
                vm.pdf = pdf;
                vm.closeDialog = function() {
                    $mdDialog.hide();
                };
            }
        };

        vm.tryRemoveSong = function(song) {
            var playlist = vm.playlist();
            _.each(playlist, function(track, index) {
                if (track.id === song.id && track.title === song.title) {
                    $timeout(function() {
                        var currentTrackId = angularPlayer.getCurrentTrack();
                        if (currentTrackId === song.id) {
                            angularPlayer.stop();
                        }
                        angularPlayer.removeSong(song, index);
                    });
                }
            });
        };
    }

})();
