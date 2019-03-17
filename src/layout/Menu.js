import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import SettingsIcon from "@material-ui/icons/Settings";
import { withRouter } from "react-router-dom";
import {
  translate,
  DashboardMenuItem,
  MenuItemLink,
  Responsive
} from "react-admin";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@material-ui/core";

import data from "../data";

import config from "../config";
const { menus } = config;

class Menu extends Component {
  state = {
    menuCatalog: false,
    menuSales: false,
    menuCustomers: false
  };

  static propTypes = {
    onMenuClick: PropTypes.func,
    logout: PropTypes.object
  };

  handleToggle = menu => {
    this.setState(state => ({ [menu]: !state[menu] }));
  };

  handleMenuClick = menuName => {
    this.setState({ [menuName]: !this.state[menuName] });
  };

  render() {
    const { onMenuClick, open, logout, translate } = this.props;
    return (
      <div>
        {" "}
        <DashboardMenuItem onClick={onMenuClick} />
        <MenuItemLink
          to={`/data`}
          primaryText={translate(`resources.reviews.name`, {
            smart_count: 2
          })}
          leftIcon={<data.icon />}
          onClick={onMenuClick}
        />
        {menus.map(menu => {
          if (menu.subMenus && menu.subMenus.length > 0) {
            return (
              <div key={menu.name}>
                <ListItem
                  button
                  onClick={() => this.handleMenuClick(menu.name)}
                  style={{ paddingLeft: 16 }}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText
                    inset
                    primary={menu.options.label}
                    style={{ paddingLeft: 5 }}
                  />
                  {this.state[menu.name] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={this.state[menu.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  {menu.subMenus.map(subMenu => (
                    <MenuItemLink
                      key={subMenu.name}
                      to={`/${subMenu.name}`}
                      primaryText={subMenu.options.label}
                      onClick={onMenuClick}
                      style={{ paddingLeft: 63 }}
                    />
                  ))}
                </Collapse>
              </div>
            );
          }
        })}
        <Responsive
          xsmall={
            <MenuItemLink
              to="/configuration"
              primaryText={translate("pos.configuration")}
              leftIcon={<SettingsIcon />}
              onClick={onMenuClick}
            />
          }
          medium={null}
        />
        <Responsive
          small={logout}
          medium={null} // Pass null to render nothing on larger devices
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.admin.ui.sidebarOpen,
  theme: state.theme,
  locale: state.i18n.locale
});

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    {}
  ),
  translate
);

export default enhance(Menu);
