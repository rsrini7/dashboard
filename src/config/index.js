import React from 'react';
import InsertChart from '@material-ui/icons/InsertChart';

const prod = process.env.NODE_ENV === 'production';
const conf_prod = {
	host: 'http://jsonplaceholder.typicode.com',
	title: '',
	menus: [
		{
			name: 'reports',
			icon: <InsertChart />,
			options: { label: 'Reports' },
			roles: ['admin'],
			subMenus: [
				{
					name: 'linereport',
					roles: ['admin'],
					options: { label: 'Line Report', type: 'line' }
				},
				{
					name: 'barreport',
					roles: ['admin'],
					options: { label: 'Bar Report', type: 'bar' }
				},
				{
					name: 'piereport',
					roles: ['admin'],
					options: { label: 'Pie Report', type: 'pie' }
				}
			]
		}
	]
};

const conf_dev = {
	host: 'http://localhost:3007',
	title: '',
	menus: [
		{
			name: 'reports',
			icon: <InsertChart />,
			options: { label: 'Reports' },
			roles: ['admin'],
			subMenus: [
				{
					name: 'linereport',
					roles: ['admin'],
					options: { label: 'Line Report', type: 'line' }
				},
				{
					name: 'barreport',
					roles: ['admin'],
					options: { label: 'Bar Report', type: 'bar' }
				},
				{
					name: 'piereport',
					roles: ['admin'],
					options: { label: 'Pie Report', type: 'pie' }
				}
			]
		}
	]
};

const config = prod ? conf_prod : conf_dev;

export default config;
