import React from "react";
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { translate } from "react-admin";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";

const style = theme => ({
  flex: 1,

  avatar: {
    backgroundColor: red[500]
  }
});

const FailedTransfers = ({ transfers = [], translate, classes }) => (
  <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" className={classes.avatar}>
          F
        </Avatar>
      }
      title={translate("pos.dashboard.failed_transfers")}
    />
    <List dense={true}>
      {transfers.map(record => (
        <ListItem
          key={record.id}
          button
          component={Link}
          to={`/data/${record.id}`}
        >
          <ListItemText
            primary={translate("pos.dashboard.transfer.first_line", {
              theme: record.theme,
              category: record.category,
              filename: record.filename
            })}
            secondary={translate("pos.dashboard.transfer.second_line", {
              source: record.source,
              destination: record.destination,
              remarks: record.remarks
            })}
          />
        </ListItem>
      ))}
    </List>
  </Card>
);

const enhance = compose(
  withStyles(style),
  translate
);

export default enhance(FailedTransfers);
