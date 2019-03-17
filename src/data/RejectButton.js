import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import Button from "@material-ui/core/Button";
import ThumbDown from "@material-ui/icons/ThumbDown";
import { translate } from "react-admin";
import compose from "recompose/compose";
import { liveDataReject as liveDataRejectAction } from "./liveDataActions";

class RejectButton extends Component {
  handleApprove = () => {
    const { liveDataReject, record, comment } = this.props;
    liveDataReject(record.id, { ...record, comment });
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
        <ThumbDown
          color="primary"
          style={{ paddingRight: "0.5em", color: "red" }}
        />
        {translate("resources.reviews.action.reject")}
      </Button>
    ) : (
      <span />
    );
  }
}

RejectButton.propTypes = {
  comment: PropTypes.string,
  record: PropTypes.object,
  liveDataReject: PropTypes.func,
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
      liveDataReject: liveDataRejectAction
    }
  )
);

export default enhance(RejectButton);
