(function() {
    'use strict';

    angular
        .module('gnaas.landing')
        .run(routeConfig);

    routeConfig.$inject = ['routerHelper'];
    /* @ngInject */

    function routeConfig(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'landing',
            config: {
                abstract: true,
                url: '/',
                title: 'Landing Page',
                template: '<div ui-view class="page-wrap"></div>',
                controller: 'Landing',
                controllerAs: 'vm'
            }
        }, {
            state: 'landing.home',
            config: {
                url: '',
                title: 'Home',
                templateUrl: 'app/landing/home.html'
            }
        }, {
            state: 'landing.about',
            config: {
                url: '^/about',
                title: 'About Us',
                templateUrl: 'app/landing/about.html'
            }
        }, {
            state: 'landing.media',
            config: {
                url: '^/media',
                title: 'Media',
                templateUrl: 'app/landing/media.html',
                controller: 'Media',
                controllerAs: 'vm',
                resolve: {
                    albums: ['XHR', '$q', '$filter', function(XHR, $q, $filter) {
                        var deferred = $q.defer();
                        XHR.get('/wp-json/wp/v2/media?filter[per_page]=-1').then(function(result) {
                            var pictures = $filter('filter')(result.data, {
                                'media_type': 'image'
                            });
                            var audio = $filter('filter')(result.data, {
                                'media_type': 'file',
                                'media_details': {
                                    'dataformat': 'mp3'
                                }
                            });
                            var pdfs = $filter('filter')(result.data, {
                                'media_type': 'file',
                                'media_details': {
                                    'dataformat': 'pdf'
                                }
                            });

                            var orderedPictures = $filter('orderBy')(pictures, 'album');
                            var groupedPictures = $filter('groupBy')(orderedPictures, 'album');
                            var orderedAudio = $filter('orderBy')(audio, 'album');
                            var groupedAudio = $filter('groupBy')(orderedAudio, 'album');
                            var orderedPdfs = $filter('orderBy')(pdfs, 'album');
                            var groupedPdfs = $filter('groupBy')(orderedPdfs, 'album');

                            deferred.resolve({
                                gallery: groupedPictures,
                                audio: groupedAudio,
                                documents: groupedPdfs
                            });
                        }, function(error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }]
                }
            }
        }, {
            state: 'landing.media.gallery',
            config: {
                url: '^/media/gallery',
                title: 'Gallery',
                templateUrl: 'app/landing/media/gallery.html'
            }
        }, {
            state: 'landing.media.audio',
            config: {
                url: '^/media/audio',
                title: 'Audio',
                templateUrl: 'app/landing/media/audio.html',
                onExit: ['angularPlayer', '$timeout', function(angularPlayer, $timeout) {
                    $timeout(function() {
                        angularPlayer.stop();
                    });
                }]
            }
        }, {
            state: 'landing.media.documents',
            config: {
                url: '^/media/documents',
                title: 'Documents',
                templateUrl: 'app/landing/media/documents.html'
            }
        }, {
            state: 'landing.about.history',
            config: {
                url: '^/about/history',
                title: 'History',
                templateUrl: 'app/landing/about/history.html'
            }
        }, {
            state: 'landing.about.congress',
            config: {
                url: '^/about/congress',
                title: 'Congress Registration',
                templateUrl: 'app/landing/about/congress.html'
            }
        }, {
            state: 'landing.about.theme',
            config: {
                url: '^/about/theme',
                title: 'Theme',
                templateUrl: 'app/landing/about/theme.html'
            }
        }, {
            state: 'landing.about.executives',
            config: {
                url: '^/about/executives',
                title: 'Executives',
                templateUrl: 'app/landing/about/executives.html',
                controller: 'Executives',
                controllerAs: 'vm',
                resolve: {
                    executives: ['XHR', '$q', '_', '$filter', function(XHR, $q, _, $filter) {
                        var deferred = $q.defer();

                        XHR.get('/wp-json/wp/v2/executives?filter[posts_per_page]=-1').then(function(result) {
                            var executives = {};
                            executives.president = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'president'
                                }
                            }, true)[0];
                            executives.vice = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'vice-president'
                                }
                            }, true)[0];
                            executives.secretary = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'secretary'
                                }
                            })[0];
                            executives.treasurer = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'treasurer'
                                }
                            })[0];
                            executives['financial_secretary'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'financial-secretary'
                                }
                            })[0];
                            executives['coordinating_secretary'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'coordinating-secretary'
                                }
                            })[0];
                            executives['asst_coordinating_secretary'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'asst-coordinating-secretary'
                                }
                            })[0];
                            executives['web_admin'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'web-admin'
                                }
                            })[0];
                            executives['vice_web_admin'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'vice-web-admin'
                                }
                            })[0];
                            executives['auditor'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'auditor'
                                }
                            })[0];
                            executives['coordinator_southern'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'coordinator-southern-sector'
                                }
                            })[0];
                            executives['coordinator_northern'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'coordinator-northern-sector'
                                }
                            })[0];
                            executives['coordinator_middle'] = $filter('filter')(result.data, {
                                'acf': {
                                    'position': 'coordinator-middle-sector'
                                }
                            })[0];

                            deferred.resolve(executives);
                        }, function(error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }]
                }
            }
        }, {
            state: 'landing.about.nec',
            config: {
                url: '^/about/NEC',
                title: 'NEC',
                templateUrl: 'app/landing/about/nec.html'
            }
        }, {
            state: 'landing.about.aims',
            config: {
                url: '^/about/aims',
                title: 'Aims',
                templateUrl: 'app/landing/about/aims.html'
            }
        }, {
            state: 'landing.about.operations',
            config: {
                url: '^/about/operations',
                title: 'Operations',
                templateUrl: 'app/landing/about/operations.html'
            }
        }, {
            state: 'landing.about.structure',
            config: {
                url: '^/about/structure',
                title: 'Structure',
                templateUrl: 'app/landing/about/structure.html'
            }
        }, {
            state: 'landing.contact',
            config: {
                url: '^/contact',
                title: 'Contact Us',
                templateUrl: 'app/landing/contact.html',
                controller: 'Landing',
                controllerAs: 'vm'
            }
        }, {
            state: 'landing.blog',
            config: {
                url: '^/blog',
                title: 'Blog',
                templateUrl: 'app/landing/blog.html',
                controller: 'Blog',
                controllerAs: 'vm',
                resolve: {
                    all: ['BlogService', '$q', '$filter', function(BlogService, $q, $filter) {
                        var deferred = $q.defer();
                        BlogService.getAll().then(function(result) {
                            var filtered = $filter('unique')(result, 'link');
                            deferred.resolve(filtered);
                        }, function(error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }],
                    featured: ['BlogService', '$q', function(BlogService, $q) {
                        var deferred = $q.defer();
                        BlogService.getFeatured().then(function(result) {
                            if (result.length > 1) {
                                deferred.resolve(result[0]);
                            } else {
                                deferred.resolve(result);
                            }
                        }, function(error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }]
                }
            }
        }, {
            state: 'landing.blog.all',
            config: {
                url: '^/blog/all',
                title: 'All Posts',
                templateUrl: 'app/landing/blog/all.html'
            }
        }, {
            state: 'landing.blog.events',
            config: {
                url: '^/blog/events',
                title: 'Events',
                templateUrl: 'app/landing/blog/events.html'
            }
        }, {
            state: 'landing.blog.articles',
            config: {
                url: '^/blog/articles',
                title: 'Articles',
                templateUrl: 'app/landing/blog/articles.html'
            }
        }, {
            state: 'landing.blog.videos',
            config: {
                url: '^/blog/videos',
                title: 'Videos',
                templateUrl: 'app/landing/blog/videos.html'
            }
        }, {
            state: 'landing.blog.news',
            config: {
                url: '^/blog/news',
                title: 'News',
                templateUrl: 'app/landing/blog/news.html'
            }
        }, {
            state: 'landing.single',
            config: {
                url: '^/blog/post/:slug',
                title: 'Blog Post',
                templateUrl: 'app/landing/blog/single.html',
                controller: 'Single',
                controllerAs: 'vm',
                resolve: {
                    post: ['BlogService', '$q', '$stateParams', function(BlogService, $q, $stateParams) {
                        var deferred = $q.defer();
                        BlogService.getSingle($stateParams.slug)
                            .then(function(result) {
                                deferred.resolve(result);
                            }, function(error) {
                                console.log(error);
                                deferred.reject(error);
                            });
                        return deferred.promise;
                    }]
                }
            }
        }];
    }

})();
