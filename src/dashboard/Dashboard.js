import React, { Component } from "react";
import { GET_LIST, GET_MANY, Responsive } from "react-admin";

import TotalTransfers from "./TotalTransfers";
import CompletedTransfers from "./CompletedTransfers";
import PendingTransfersMinimal from "./PendingTransfersMinimal";
import FailedTransfersMinimal from "./FailedTransfersMinimal";
import FailedTransfers from "./FailedTransfers";

import dataProviderFactory from "../dataProvider";
import { customDataProvider } from "../dataCustomProvider";

import { PieReport } from "../reports/PieReport";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginTop: "2em", marginBottom: "2em" }
};

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    const aMonthAgo = new Date();
    aMonthAgo.setDate(aMonthAgo.getDate() - 30);

    dataProviderFactory().then(dataProvider => {
      dataProvider(GET_LIST, "data", {
        filter: { date_gte: aMonthAgo.toISOString() },
        sort: { field: "date", order: "DESC" },
        pagination: { page: 1, perPage: 50 }
      })
        .then(response =>
          response.data.reduce(
            (stats, transferData) => {
              const statsLocal = stats;
              statsLocal.nbTotal += 1;

              if (transferData.status === "success") {
                statsLocal.nbCompleted += 1;
              }
              if (transferData.status === "inprogress") {
                statsLocal.nbInprogress += 1;
                statsLocal.pendingTransfers.push(transferData);
              }
              if (transferData.status.indexOf("failed") > -1) {
                statsLocal.nbFailed += 1;
                statsLocal.failedTransfers.push(transferData);
              }
              return statsLocal;
            },
            {
              nbTotal: 0,
              nbCompleted: 0,
              nbInprogress: 0,
              nbFailed: 0,
              pendingTransfers: [],
              failedTransfers: []
            }
          )
        )
        .then(
          ({
            nbTotal,
            nbCompleted,
            nbInprogress,
            nbFailed,
            pendingTransfers,
            failedTransfers
          }) => {
            this.setState({
              nbTotal,
              nbCompleted,
              nbInprogress,
              nbFailed,
              pendingTransfers,
              failedTransfers
            });
          }
        );
    });
  }

  render() {
    const {
      nbTotal,
      nbCompleted,
      nbInprogress,
      nbFailed,
      pendingTransfers,
      failedTransfers
    } = this.state;
    return (
      <Responsive
        xsmall={
          <div>
            <div style={styles.flexColumn}>
              <div style={styles.flex}>
                <TotalTransfers value={nbTotal} />
                <CompletedTransfers value={nbCompleted} />
              </div>
              <div style={styles.singleCol}>
                <FailedTransfers transfers={pendingTransfers} />
              </div>
            </div>
          </div>
        }
        small={
          <div style={styles.flexColumn}>
            <div style={styles.flex}>
              <TotalTransfers value={nbTotal} />
              <CompletedTransfers value={nbCompleted} />
            </div>
            <div style={styles.singleCol}>
              <FailedTransfers transfers={failedTransfers} />
            </div>
          </div>
        }
        medium={
          <div style={styles.flex}>
            <div style={styles.leftCol}>
              <div style={styles.flex}>
                <TotalTransfers value={nbTotal} />
                <CompletedTransfers value={nbCompleted} />
              </div>
              <div style={styles.singleCol}>
                <FailedTransfers transfers={failedTransfers} />
              </div>
            </div>
            <div style={styles.rightCol}>
              <div style={styles.flex}>
                <PendingTransfersMinimal
                  nb={nbInprogress}
                  transfers={pendingTransfers}
                />
                <FailedTransfersMinimal
                  nb={nbFailed}
                  transfers={failedTransfers}
                />
              </div>
              <div style={styles.singleCol}>
                <PieReport />
              </div>
            </div>
          </div>
        }
      />
    );
  }
}

export default Dashboard;
