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
            state: 'landing.gallery',
            config: {
                url: '^/gallery',
                title: 'Gallery',
                templateUrl: 'app/landing/gallery.html'
            }
        }, {
            state: 'landing.about.history',
            config: {
                url: '^/about/history',
                title: 'History',
                templateUrl: 'app/landing/about/history.html'
            }
        }, {
            state: 'landing.about.executives',
            config: {
                url: '^/about/executives',
                title: 'Executives',
                templateUrl: 'app/landing/about/executives.html'
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
                templateUrl: 'app/landing/contact.html'
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
                    all: ['BlogService', '$q', function(BlogService, $q) {
                        var deferred = $q.defer();
                        BlogService.getAll().then(function(result) {
                            deferred.resolve(result);
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
        }, ];
    }
 
})();
