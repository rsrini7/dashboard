import React from "react";
import { Chart } from "../components/Chart";

const options = {};

export const LineReport = props => (
  <Chart title="Line Chart" type="line" options={options} />
);
