import React from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
  card: {
    float: "left",
    margin: "-20px 20px 0 15px",
    zIndex: 100,
    borderRadius: 3
  },
  icon: {
    float: "right",
    width: 54,
    height: 54,
    padding: 14,
    color: "#fff"
  }
};

const CardIcon = ({ Icon, classes, bgColor }) => (
  <Card className={classes.card} style={{ backgroundColor: bgColor }}>
    <Icon className={classes.icon} />
  </Card>
);

CardIcon.propTypes = {
  classes: PropTypes.object,
  Icon: PropTypes.func,
  bgColor: PropTypes.func
};

export default withStyles(styles)(CardIcon);
