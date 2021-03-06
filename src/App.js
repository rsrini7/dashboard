import React, { Component } from "react";
import { Admin, Resource, mergeTranslations } from "react-admin";

import "./App.css";

import authProvider from "./authProvider";
import sagas from "./sagas";
import themeReducer from "./themeReducer";
import { reducer as tree } from "ra-tree-ui-materialui";
import { Login, Layout, Menu } from "./layout";
import { Dashboard } from "./dashboard";
import customRoutes from "./routes";
import englishMessages from "./i18n/en";
import treeEnglishMessages from "ra-tree-language-english";

import { LineReport, BarReport, PieReport } from "./reports";

import data from "./data";

// import jsonServerProvider from 'ra-data-json-server';
import dataProviderFactory from "./dataProvider";
//  import { customDataProvider } from './dataCustomProvider';

const i18nProvider = locale => {
  if (locale === "fr") {
    return import("./i18n/fr").then(msg => msg.default);
  }

  // Always fallback on english
  return mergeTranslations(englishMessages, treeEnglishMessages);
};

const messages = {
  en: mergeTranslations(englishMessages, treeEnglishMessages)
};

class App extends Component {
  state = { dataProvider: null };

  async componentWillMount() {
    // const dataProvider = await customDataProvider;

    //const dataProvider = jsonServerProvider('http://localhost:3007');

    const dataProvider = await dataProviderFactory();

    this.setState({ dataProvider });
  }

  componentWillUnmount() {}

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <Admin
        title=""
        dataProvider={dataProvider}
        customReducers={{ theme: themeReducer, tree }}
        customSagas={sagas}
        customRoutes={customRoutes}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        appLayout={Layout}
        menu={Menu}
        locale="en"
        messages={messages}
        i18nProvider={i18nProvider}
      >
        <Resource name="data" {...data} />
        <Resource name="linereport" list={LineReport} />
        <Resource name="barreport" list={BarReport} />
        <Resource name="piereport" list={PieReport} />
      </Admin>
    );
  }
}

export default App;
