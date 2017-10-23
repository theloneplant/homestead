window.$ 			= window.jQuery = require('jquery');
window.$u 			= require('./util');
window.bootstrap         = require('bootstrap');
window.dt                = require('datatables.net')(window, $);
window.dtRes             = require('datatables.net-responsive')(window, $);
window.page              = require('./util/page.js-master');
window.pages             = require('./pages/pages');
window.Vue               = require('vue');

$(() => {
	var data = {
		loginStatus : {
			checkingStatus : true,
			loggedIn : false
		},
		navigation : [
			{
				name : 'Dashboard',
				url : '/',
				icon : 'dashboard'
			},
			{
				name : 'Charts',
				icon : 'bar-chart-o',
				children: [
					{
						name: 'Flot Charts',
						url : 'morris'
					},
					{
						name: 'Morris.js Charts',
						url : 'morris'
					}
				]
			},
			{
				name : 'Tables',
				url : 'tables.html',
				icon : 'table'
			},
			{
				name : 'Forms',
				url : 'forms.html',
				icon : 'edit'
			},
			{
				name : 'UI Elements',
				icon : 'wrench',
				children: [
					{
						name: 'Panels and Wells',
						url : 'morris'
					},
					{
						name: 'Buttons',
						url : 'morris'
					},
					{
						name: 'Notifications',
						url : 'morris'
					},
					{
						name: 'Typography',
						url : 'morris'
					},
					{
						name: 'Icons',
						url : 'morris'
					},
					{
						name: 'Grid',
						url : 'morris'
					}
				]
			},
			{
				name : 'Multi-Level Dropdown',
				icon : 'sitemap',
				children : [
					{
						name: 'Second Level Item',
						url : 'morris'
					},
					{
						name: 'Second Level Item',
						url : 'morris'
					},
					{
						name: 'Third Level',
						children : [
							{
								name: 'Third Level Item',
								url : 'morris'
							},
							{
								name: 'Third Level Item',
								url : 'morris'
							}
						]
					}
				]
			},
			{
				name : 'Sample Pages',
				icon : 'files-o',
				children : [
					{
						name: 'Blank Page',
						url : 'blank.html'
					},
					{
						name: 'Login Page',
						url : 'login.html'
					}
				]
			}
		]
	};
	var homestead = new Vue({
		el: '#body-wrapper',
		data,
		methods: {
			login() {
				// call /api/v1/account/login
				setTimeout(() => { // testing
					data.loginStatus.loggedIn = true;
					postLogin();
				}, 750);
			},
			logout() {
				// call /api/v1/account/logout
				setTimeout(() => { // testing
					data.loginStatus.loggedIn = false;
					setTimeout(postLogout, 500);
				}, 750);
			}
		}
	});

	// call /api/v1/account/status
	setTimeout(() => { // testing
		data.loginStatus.checkingStatus = false;
	}, 750);

	page('/', render('index'), pages.index.data, pages.index.init);
	page.exit('/', pages.index.exit);
	page('/morris', render('morris'), pages.morris.data, pages.morris.init);
	page.exit('/morris', pages.morris.exit);
	page('/chartjs', render('chartjs'), pages.chartjs.data, pages.chartjs.init);
	page.exit('/chartjs', pages.chartjs.exit);
	page('*', (ctx, next) => {
		console.log('404');
	});

	Vue.nextTick(init);
});

function postLogin() {
	page();
}

function postLogout() {
	page.stop();
	$('#page-wrapper[ui-view]').empty();
}

function render(p) {
	return (ctx, next) => {
		let e = $($('script[template-name="templates\\/'+p+'"]').html());
		let v = $('#page-wrapper[ui-view]');
		v.children().each((i, o) => {
			let oldE = $(o);
			oldE.addClass('slide-fade-leave-active').removeClass('slide-fade-enter-active');
			requestAnimationFrame(() => {
				oldE.addClass('slide-fade-leave').removeClass('slide-fade-enter');
				requestAnimationFrame(() => {
					if(!oldE.hasClass('slide-fade-active')) {
						oldE.addClass('slide-fade-active');
						oldE.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', event => {
							oldE.removeClass('slide-fade-active');
							if(oldE.hasClass('slide-fade-leave-active')) {
								requestAnimationFrame(() => {
									oldE.remove();
								});
							}
						});
					}
				});
			});
		});
		e.addClass('slide-fade-enter').addClass('slide-fade-enter-active');
		requestAnimationFrame(() => {
			v.append(e);
			requestAnimationFrame(() => {
				e.removeClass('slide-fade-enter').removeClass('slide-fade-leave');
				e.addClass('slide-fade-active');
				requestAnimationFrame(() => {
					e.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', ev => {
						e.removeClass('slide-fade-active');
						if(e.hasClass('slide-fade-leave-active')) {
							requestAnimationFrame(() => e.remove);
						}
						requestAnimationFrame(next);
					});
				});
			});
		});
	};
}

function init() {
	$('#side-menu').metisMenu();
	$(window).bind('load resize', function() {
		var topOffset = 50;
		var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
		if (width < 768) {
			$('div.navbar-collapse').addClass('collapse');
			topOffset = 100; // 2-row-menu
		}
		else $('div.navbar-collapse').removeClass('collapse');
		var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
		height = height - topOffset;
		if (height < 1) height = 1;
		if (height > topOffset) {
			$('#page-wrapper').css('min-height', (height) + 'px');
		}
	});
	// This code makes the items on the side "active" looking... might need
	//   to rewrite to make it compatible with page.js and vue.js
	// var url = window.location;
	// var element = $('ul.nav a').filter(function() {
	// 	return this.href == url;
	// }).addClass('active').parent();
	// while (true) {
	// 	if (element.is('li')) {
	// 		element = element.parent().addClass('in').parent();
	// 	}
	// 	else {
	// 		break;
	// 	}
	// }
}
