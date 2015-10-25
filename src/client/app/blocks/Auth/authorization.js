(function() {
    'use strict';

    angular
        .module('blocks.auth')
        .factory('authorization', Authorization);

    Authorization.$inject = ['AuthToken', '$q', '$rootScope', '$location', 'config', '$window', 'logger', '$state'];

    function Authorization(AuthToken, $q, $rootScope, $location, config, $window, logger, $state) {
        var permissionModel = {
            permission: {},
            isPermissionLoaded: false
        };

        var service = {
            permissionModel: permissionModel,
            permissionCheck: permissionCheck,
            getPermission: getPermission,
            resetPermissions: resetPermissions
        };
        return service;
        //////////////

        function permissionCheck(roleCollection) {
            var deferred = $q.defer();

            if (permissionModel.isPermissionLoaded) {
                getPermission(permissionModel, roleCollection, deferred);
            } else {
                //get from authenticated user model
                var storage = $window.localStorage;
                var userObject = XHR.post(config.backend + '/wp-json/v2/users/me');
                console.log(userObject);
                if(userObject.hasOwnProperty('roles')){
                    permissionModel.isPermissionLoaded = true;
                    permissionModel.permission = userObject.roles;

                    getPermission(permissionModel, roleCollection, deferred);
                }else{
                    permissionModel.permission = [];
                    getPermission(permissionModel, roleCollection, deferred);
                }
            }
            return deferred.promise;
        }

        function getPermission(permissionModel, roleCollection, deferred) {
            var ifPermissionPassed = false;
            var falseCheck = -1;
            angular.forEach(roleCollection, function(role) {
                if(permissionModel.permission.indexOf(role) !== falseCheck){
                    ifPermissionPassed = true;
                }
            });

            if (!ifPermissionPassed) {
                $state.go(config.routeForUnauthorizedAccess);
                $rootScope.$on('$stateChangeSuccess', function(next, current) {
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        }

        function resetPermissions(){
            var deferred = $q.defer();

            permissionModel.permission = {};
            permissionModel.isPermissionLoaded = false;

            if(!permissionModel.isPermissionLoaded){
                deferred.resolve();
            }else{
                deferred.reject();
            }
            return deferred.promise;
        }
}


})();
