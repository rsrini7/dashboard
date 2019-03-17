import React, { Fragment } from "react";
import MuiToolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { SaveButton } from "react-admin";
import AcceptButton from "./AcceptButton";
import RejectButton from "./RejectButton";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "space-between"
  }
});

const LiveDataEditToolbar = ({
  basePath,
  classes,
  handleSubmitWithRedirect,
  record
}) => (
  <MuiToolbar className={classes.root}>
    {record.status === "failed" ? (
      <Fragment>
        <AcceptButton record={record} />
        <RejectButton record={record} />
      </Fragment>
    ) : (
      <Fragment>
        <SaveButton
          basePath={basePath}
          label="Ok"
          handleSubmitWithRedirect={handleSubmitWithRedirect}
          redirect="data"
        />
      </Fragment>
    )}
  </MuiToolbar>
);

LiveDataEditToolbar.propTypes = {
  basePath: PropTypes.string,
  classes: PropTypes.object,
  record: PropTypes.object,
  handleSubmitWithRedirect: PropTypes.func
};

export default withStyles(styles)(LiveDataEditToolbar);
