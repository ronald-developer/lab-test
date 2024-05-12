import { Chart } from 'angular-highcharts';
import { SeriesOptionsType, XAxisOptions } from 'highcharts';
export class TemperatureResultChartOptionBuilder {
	public static buildChartOptions(categories: string[] = [], data: number[] = [], ucl: number = 0, lcl: number = 0, target: number = 0, plotXaxisCount: number = 0) {
		return new Chart({
			title: {
				text: 'Moisture temperature',
				align: 'left',
			},

			subtitle: {
				text: '',
				align: 'left'
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: false,
						color: 'black',
						crop: false,
						overflow: 'allow',
						x: 22,
						y: 0,
						format: '{point.label} {point.y}'
					}
				}
			},
			yAxis: {
				title: {
					text: 'Temperature level',
				}
			},
			tooltip: {
				headerFormat: '<b>Carton no: {point.x}</b><br>',
			},
			xAxis: {
				title: { text: 'Cartons' },
				labels: { rotation: 90 },
				categories: categories,
			},

			legend: {
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'bottom', enabled: false
			},

			series: [
				{
					name: 'Temperature result',
					type: 'line',
					data: data,
					color: 'blue'
				},
				{
					name: 'UCL',
					type: 'line',
					dashStyle: 'ShortDash',
					lineWidth: 2,
					marker: {
						enabled: false
					},
					color: 'orange',
					data: [[0, ucl], { label: 'UCL', x: plotXaxisCount, y: ucl, dataLabels: { enabled: true } }], enableMouseTracking: false
				},
				{
					name: 'TARGET',
					type: 'line',
					dashStyle: 'ShortDash',
					lineWidth: 2,
					marker: {
						enabled: false
					},
					color: 'green',
					data: [[0, target], { label: 'TARGET', x: plotXaxisCount, y: target, dataLabels: { enabled: true } }], enableMouseTracking: false
				},
				{
					name: 'LCL',
					type: 'line',
					dashStyle: 'ShortDash',
					lineWidth: 2,
					marker: {
						enabled: false
					},
					color: 'gray',
					data: [[0, lcl], { label: 'LCL', x: plotXaxisCount, y: lcl, dataLabels: { enabled: true } }], enableMouseTracking: false
				}
			],
			responsive: {
				rules: [
					{
						condition: {
							maxWidth: 500,
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom',
							},
						},
					},
				],
			},
		});
	}
}
