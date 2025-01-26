import { call, put, all, takeLatest } from 'redux-saga/effects';

import * as actions from '../example/actions';
import * as types from '../types';

const requisition = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 600);
    });

function* exampleRequest() {
    try {
        yield call(requisition);
        yield put(actions.sendFormSucess());
    } catch {
        yield put(actions.sendFormFailure());
    }
}

export default all([takeLatest(types.SEND_FORM_REQUEST, exampleRequest)]);
