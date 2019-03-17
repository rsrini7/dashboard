import React from "react";
import { List, TextField } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Tree, NodeView, NodeActions } from "ra-tree-ui-materialui";
import rowStyle from "./rowStyle";
import CustomizableDataGrid from "../components/CustomizableDatagrid";

const listStyles = theme => ({
  headerRow: {
    borderLeftColor: "white",
    borderLeftWidth: 5,
    borderLeftStyle: "solid"
  },
  comment: {
    maxWidth: "5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const LiveDataListDesktop = ({ classes, ...props }) => (
  <CustomizableDataGrid
    defaultColumns={["theme", "category", "filename", "status"]}
    rowClick="edit"
    rowStyle={rowStyle}
    classes={{ headerRow: classes.headerRow }}
    {...props}
  >
    <TextField source="theme" cellClassName={classes.comment} />
    <TextField source="category" />
    <TextField source="filename" />
    <TextField source="source" />
    <TextField source="destination" />
    <TextField source="initialtime" />
    <TextField source="updatetime" />
    <TextField source="status" />
  </CustomizableDataGrid>

  // <List {...props}>
  //   <Tree  allowDropOnRoot enableDragAndDrop>
  //     <NodeView>
  //       <TextField source="theme" cellClassName={classes.comment} />
  //       <TextField source="category" />
  //       <TextField source="filename" />
  //       <TextField source="source" />
  //       <TextField source="destination" />
  //       <TextField source="initialtime" />
  //       <TextField source="updatetime" />
  //       <TextField source="status" />
  //     </NodeView>
  //   </Tree>
  //   </List>
);

LiveDataListDesktop.propTypes = {
  classes: PropTypes.object
};

export default withStyles(listStyles)(LiveDataListDesktop);
