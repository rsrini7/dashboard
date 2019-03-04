import React from 'react';
import { Chart } from '../components/Chart';

const options = {};

export const BarReport = props => {
	return <Chart title="Bar Chart" type="bar" options={options} />;
};
