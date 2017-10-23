module.exports = (() => {
	var iapp;
	function init(ctx) {
		console.log('hello from index init');
		iapp = new Vue({
			el: '#IndexContent',
			data : {},
			methods: {}
		});
		initChartJS();
	}
	function data(ctx, next) {
		console.log('hello from index data');
		next();
	}
	function exit(ctx, next = () => {}) {
		console.log('hello from index exit');
		iapp.$destroy();
		iapp = null;
		next();
	}
	return { init, data, exit };
})();


function initChartJS() {
	var line = new Chart($('#chartjs-line-chart')[0], {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'My First dataset',
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				data: [0, 10, 5, 2, 20, 30, 45],
			}]
		},

		// Configuration options go here
		options: {}
	});

	var bar = new Chart($('#chartjs-bar-chart')[0], {
		type: 'bar',
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});

	var myDoughnutChart = new Chart($('#chartjs-donut-chart')[0], {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [10, 20, 30],
				backgroundColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
			}],
			labels: [
				'Red',
				'Blue',
				'Yellow'
			]
		},
		options: {}
	});
}

function initMorris() {
	Morris.Area({
		element: 'morris-area-chart',
		data: [{
			period: '2010 Q1',
			iphone: 2666,
			ipad: null,
			itouch: 2647
		}, {
			period: '2010 Q2',
			iphone: 2778,
			ipad: 2294,
			itouch: 2441
		}, {
			period: '2010 Q3',
			iphone: 4912,
			ipad: 1969,
			itouch: 2501
		}, {
			period: '2010 Q4',
			iphone: 3767,
			ipad: 3597,
			itouch: 5689
		}, {
			period: '2011 Q1',
			iphone: 6810,
			ipad: 1914,
			itouch: 2293
		}, {
			period: '2011 Q2',
			iphone: 5670,
			ipad: 4293,
			itouch: 1881
		}, {
			period: '2011 Q3',
			iphone: 4820,
			ipad: 3795,
			itouch: 1588
		}, {
			period: '2011 Q4',
			iphone: 15073,
			ipad: 5967,
			itouch: 5175
		}, {
			period: '2012 Q1',
			iphone: 10687,
			ipad: 4460,
			itouch: 2028
		}, {
			period: '2012 Q2',
			iphone: 8432,
			ipad: 5713,
			itouch: 1791
		}],
		xkey: 'period',
		ykeys: ['iphone', 'ipad', 'itouch'],
		labels: ['iPhone', 'iPad', 'iPod Touch'],
		pointSize: 2,
		hideHover: 'auto',
		resize: true
	});

	Morris.Donut({
		element: 'morris-donut-chart',
		data: [{
			label: "Download Sales",
			value: 12
		}, {
			label: "In-Store Sales",
			value: 30
		}, {
			label: "Mail-Order Sales",
			value: 20
		}],
		resize: true
	});

	Morris.Bar({
		element: 'morris-bar-chart',
		data: [{
			y: '2006',
			a: 100,
			b: 90
		}, {
			y: '2007',
			a: 75,
			b: 65
		}, {
			y: '2008',
			a: 50,
			b: 40
		}, {
			y: '2009',
			a: 75,
			b: 65
		}, {
			y: '2010',
			a: 50,
			b: 40
		}, {
			y: '2011',
			a: 75,
			b: 65
		}, {
			y: '2012',
			a: 100,
			b: 90
		}],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Series A', 'Series B'],
		hideHover: 'auto',
		resize: true
	});
}
