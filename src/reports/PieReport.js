import React from 'react';
import { Chart } from '../components/Chart';

const options = {};

export const PieReport = props => {
	return <Chart title="Transfer Status" type="pie" options={options} />;
};
