import React from "react";
import { Filter, SearchInput, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { DateTimeInput } from "react-admin-date-inputs";
import PropTypes from "prop-types";

const filterStyles = {
  status: { width: 150 }
};

const LiveDataFilter = ({ classes, ...props }) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <SelectInput
      source="status"
      choices={[
        { id: "completed", name: "Completed" },
        { id: "inprogress", name: "In-Progress" },
        { id: "failed", name: "Failed" }
      ]}
      className={classes.status}
    />
    <DateTimeInput source="date_lte" />
  </Filter>
);

LiveDataFilter.propTypes = {
  classes: PropTypes.object
};

export default withStyles(filterStyles)(LiveDataFilter);
