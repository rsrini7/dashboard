import { all, takeEvery } from "redux-saga/effects";
import {
  LIVE_DATA_APPROVE_FAILURE,
  LIVE_DATA_REJECT_FAILURE
} from "./liveDataActions";

export default function* liveDataSaga() {
  yield all([
    takeEvery(LIVE_DATA_APPROVE_FAILURE, function*({ error }) {
      console.error(error);
      yield all([]);
    }),
    takeEvery(LIVE_DATA_REJECT_FAILURE, function*({ error }) {
      console.error(error);
      yield all([]);
    })
  ]);
}
