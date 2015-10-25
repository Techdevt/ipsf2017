(function(){
	'use strict';

	angular
		.module('gnaas.landing')
		.run(routeConfig);

	routeConfig.$inject = ['routehelper'];
	/* @ngInject */

	function routeConfig(routehelper){
		routehelper.configureRoutes(getRoutes());
	}

	function getRoutes(){
		return [{
			name : 'landing',
			abstract: true,
			url : '/',
			title : 'Landing Page',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							template : '<div ui-view class="page-wrap fade-in-animation"></div>',
							controller : 'Landing',
							controllerAs : 'vm'
					}
				}
			}
		},
		{
			name : 'landing.home',
			url : '',
			title : 'Home',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + 'home.html'
					}
				}
			}
		},{
			name : 'landing.about',
			url : '^/about',
			title : 'About Us',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + 'about.html'
					}
				}
			}
		},
		,{
			name : 'landing.about.history',
			url : '^/about/',
			title : 'History',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + '/about/history.html'
					}
				}
			}
		},
		{
			name : 'landing.about.executives',
			url : '^/about/executives',
			title : 'Executives',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + '/about/executives.html'
					}
				}
			}
		},
		{
			name : 'landing.about.nec',
			url : '^/about/NEC',
			title : 'NEC',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + '/about/nec.html'
					}
				}
			}
		},
		{
			name : 'landing.about.aims',
			url : '^/about/aims',
			title : 'Aims',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + '/about/aims.html'
					}
				}
			}
		},
		{
			name : 'landing.about.operations',
			url : '^/about/operations',
			title : 'Operations',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + '/about/operations.html'
					}
				}
			}
		},
		{
			name : 'landing.about.structure',
			url : '^/about/structure',
			title : 'Structure',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + '/about/structure.html'
					}
				}
			}
		},
		{
			name : 'landing.contact',
			url : '^/contact',
			title : 'Contact Us',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + 'contact.html'
					}
				}
			}
		},
		{
			name : 'landing.blog',
			url : '^/blog',
			title : 'Blog',
			config : {
				//add route resolve properties if any on resolve
				views:{
					'' : {
							templateUrl : myLocalized.landing + 'blog.html',
							controller: 'Blog',
							controllerAs: 'vm'
					}
				}
			}
		}];
	}

})();