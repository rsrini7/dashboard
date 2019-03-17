import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import Button from "@material-ui/core/Button";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { translate } from "react-admin";
import compose from "recompose/compose";
import { liveDataApprove as liveDataApproveAction } from "./liveDataActions";

class AcceptButton extends Component {
  handleApprove = () => {
    const { liveDataApprove, record, comment } = this.props;
    liveDataApprove(record.id, { ...record, comment });
  };

  render() {
    const { record, translate } = this.props;
    return record && record.status === "failed" ? (
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={this.handleApprove}
      >
        <ThumbUp
          color="primary"
          style={{ paddingRight: "0.5em", color: "green" }}
        />
        {translate("resources.reviews.action.accept")}
      </Button>
    ) : (
      <span />
    );
  }
}

AcceptButton.propTypes = {
  record: PropTypes.object,
  comment: PropTypes.string,
  liveDataApprove: PropTypes.func,
  translate: PropTypes.func
};

const selector = formValueSelector("record-form");

const enhance = compose(
  translate,
  connect(
    state => ({
      comment: selector(state, "comment")
    }),
    {
      liveDataApprove: liveDataApproveAction
    }
  )
);

export default enhance(AcceptButton);
