import React from "react";
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import displayIcon from "@material-ui/icons/SwapVerticalCircle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { translate } from "react-admin";

import CardIcon from "./CardIcon";

const styles = theme => ({
  main: {
    flex: "1",
    marginRight: "1em",
    marginTop: 20
  },
  card: {
    overflow: "inherit",
    textAlign: "right",
    padding: 16,
    minHeight: 52
  }
});

const TotalTransfers = ({ value, translate, classes }) => (
  <div className={classes.main}>
    <CardIcon Icon={displayIcon} bgColor="#31708f" />
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary">
        {translate("pos.dashboard.transfer_total")}
      </Typography>
      <Typography variant="headline" component="h2">
        {value}
      </Typography>
    </Card>
  </div>
);

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(TotalTransfers);
