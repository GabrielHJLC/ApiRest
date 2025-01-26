import * as types from '../types';

const initialState = {
    clickedButton: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SEND_FORM_SUCESS: {
            console.log('sucess');
            const newState = { ...state };
            newState.clickedButton = !newState.clickedButton;
            return newState;
        }
        case types.SEND_FORM_FAILURE: {
            console.log('Ocorreu um erro.');
            return state;
        }
        case types.SEND_FORM_REQUEST: {
            console.log('Fazendo a requisição');
            return state;
        }
        default:
            return state;
    }
}
