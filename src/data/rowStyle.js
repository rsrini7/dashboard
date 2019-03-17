import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";

const rowStyle = (record, index, defaultStyle = {}) => {
  if (record.status === "success")
    return {
      ...defaultStyle,
      borderLeftColor: green[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid"
    };
  if (record.status === "inprogress")
    return {
      ...defaultStyle,
      borderLeftColor: orange[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid"
    };
  if (record.status === "failed")
    return {
      ...defaultStyle,
      borderLeftColor: red[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid"
    };
  return defaultStyle;
};

export default rowStyle;
