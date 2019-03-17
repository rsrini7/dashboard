import { UPDATE } from "react-admin";

export const LIVE_DATA_APPROVE = "LIVE_DATA_APPROVE";
export const LIVE_DATA_APPROVE_LOADING = "LIVE_DATA_APPROVE_LOADING";
export const LIVE_DATA_APPROVE_FAILURE = "LIVE_DATA_APPROVE_FAILURE";
export const LIVE_DATA_APPROVE_SUCCESS = "LIVE_DATA_APPROVE_SUCCESS";

export const liveDataApprove = (id, data, basePath) => ({
  type: LIVE_DATA_APPROVE,
  payload: { id, data: { ...data, status: "inprogress" }, basePath },
  meta: {
    resource: "data",
    fetch: UPDATE,
    onSuccess: {
      notification: {
        body: "resources.reviews.notification.approved_success",
        level: "info"
      },
      redirectTo: "/data",
      basePath
    },
    onFailure: {
      notification: {
        body: "resources.reviews.notification.approved_error",
        level: "warning"
      }
    }
  }
});

export const LIVE_DATA_REJECT = "LIVE_DATA_REJECT";
export const LIVE_DATA_REJECT_LOADING = "LIVE_DATA_REJECT_LOADING";
export const LIVE_DATA_REJECT_FAILURE = "LIVE_DATA_REJECT_FAILURE";
export const LIVE_DATA_REJECT_SUCCESS = "LIVE_DATA_REJECT_SUCCESS";

export const liveDataReject = (id, data, basePath) => ({
  type: LIVE_DATA_REJECT,
  payload: { id, data: { ...data, status: "failed" }, basePath },
  meta: {
    resource: "data",
    fetch: UPDATE,
    onSuccess: {
      notification: {
        body: "resources.reviews.notification.rejected_success",
        level: "info"
      },
      redirectTo: "/data",
      basePath
    },
    onFailure: {
      notification: {
        body: "resources.reviews.notification.rejected_error",
        level: "warning"
      }
    }
  }
});
