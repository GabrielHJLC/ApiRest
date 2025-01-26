import * as types from '../types';

export function sendFormRequest() {
    return {
        type: types.SEND_FORM_REQUEST,
    };
}

export function sendFormSucess() {
    return {
        type: types.SEND_FORM_SUCESS,
    };
}

export function sendFormFailure() {
    return {
        type: types.SEND_FORM_FAILURE,
    };
}
