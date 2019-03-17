import React, { Fragment, Component } from "react";
import { BulkDeleteButton, List, Responsive } from "react-admin";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route } from "react-router";
import Drawer from "@material-ui/core/Drawer";

import BulkAcceptButton from "./BulkAcceptButton";
import BulkRejectButton from "./BulkRejectButton";
import LiveDataListMobile from "./LiveDataListMobile";
import LiveDataListDesktop from "./LiveDataListDesktop";
import LiveDataFilter from "./LiveDataFilter";
import LiveDataEdit from "./LiveDataEdit";

const LiveDataBulkActionButtons = props => (
  <Fragment>
    <BulkAcceptButton {...props} />
    <BulkRejectButton {...props} />
    <BulkDeleteButton {...props} />
  </Fragment>
);

class LiveDataList extends Component {
  render() {
    const props = this.props;
    return (
      <Fragment>
        <List
          {...props}
          bulkActionButtons={<LiveDataBulkActionButtons />}
          filters={<LiveDataFilter />}
          perPage={25}
          sort={{ field: "date", order: "DESC" }}
        >
          <Responsive
            xsmall={<LiveDataListMobile />}
            medium={<LiveDataListDesktop />}
          />
        </List>
        <Route path="/data/:id">
          {({ match }) => {
            const isMatch =
              match && match.params && match.params.id !== "create";
            return (
              <Drawer
                variant="persistent"
                open={isMatch}
                anchor="right"
                onClose={this.handleClose}
              >
                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                {isMatch ? (
                  <LiveDataEdit
                    id={match.params.id}
                    onCancel={this.handleClose}
                    {...props}
                  />
                ) : null}
              </Drawer>
            );
          }}
        </Route>
      </Fragment>
    );
  }

  handleClose = () => {
    this.props.push("/data");
  };
}

export default connect(
  undefined,
  { push }
)(LiveDataList);
