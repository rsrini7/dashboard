import React from "react";
import { AppBar, UserMenu, MenuItemLink, translate } from "react-admin";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

import Logo from "./Logo";
import PropTypes from "prop-types";

const styles = {
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  spacer: {
    flex: 1
  }
};

const CustomUserMenu = translate(({ ...props }) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/configuration"
      primaryText={translate("pos.configuration")}
      leftIcon={<SettingsIcon />}
    />
  </UserMenu>
));

const CustomAppBar = ({ classes, ...props }) => (
  <AppBar {...props} userMenu={<CustomUserMenu />}>
    <Typography
      variant="title"
      color="inherit"
      className={classes.title}
      id="react-admin-title"
    />
    <Logo />
    <span className={classes.spacer} />
  </AppBar>
);

CustomAppBar.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CustomAppBar);
