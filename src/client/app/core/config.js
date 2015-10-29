(function() {
    'use strict';

    var core = angular.module('gnaas.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: 'GNAAS Error - ',
        appTitle: 'GNAAS',
        backend: 'http://localhost:8080/gnaas',
        consumerId: 29,
        consumerKey: 'WIAvrQRSeIDS',
        consumerSecret: 'VPzvJv2iyrxrHxXTuc7IXQxzGLhuiK8JlM3yMKHrrbeTcaqb',
        routeForUnauthorizedAccess: 'login',
        version: '0.0.1'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider',
        'exceptionHandlerProvider', '$mdThemingProvider', '$httpProvider'
    ];
    /* @ngInject */
    function configure(
        $logProvider,
        routerHelperProvider,
        exceptionHandlerProvider,
        $mdThemingProvider,
        $httpProvider
    ) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ': '
        });

        configureMdTheme();
        configureWithCredentials();

        function configureMdTheme() {
            var tealCustom = $mdThemingProvider.extendPalette('teal', {
                '400': '5fcf80'
            });

            $mdThemingProvider.definePalette('myCustomPalette', {
                '50': '8CA192',
                '100': '82AB8E',
                '200': '77B68A',
                '300': '6DC086',
                '400': '009688',
                '500': '58D57D',
                '600': '4DE079',
                '700': '43EA75',
                '800': '38F571',
                '900': '2EFF6D',
                'A100': 'EFFAF3',
                'A200': 'E0F6E6',
                'A400': 'D0F1DA',
                'A700': 'C0ECCD',
                'contrastDefaultColor': 'light', // whether, by default, text (contrast)
                // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'
                ],
                'contrastLightColors': undefined
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('myCustomPalette', {
                    'default': '400'
                })
                .accentPalette('pink', {
                    'default': '300'
                });

            $mdThemingProvider
                .theme('form-dark', 'default')
                .primaryPalette('amber')
                .accentPalette('blue-grey')
                .dark();
        }

        function configureWithCredentials() {
            $httpProvider
                .defaults.withCredentials = true;
        }

    }

})();
