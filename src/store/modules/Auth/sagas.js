import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
    try {
        const response = yield call(axios.post, '/tokens', payload);

        yield put(actions.loginSucess({ ...response.data }));

        toast.success('Logado com sucesso');
        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        history.push(payload.prevPath);
    } catch (e) {
        toast.error('Usuário ou senha inválidos');
        yield put(actions.loginFailure());
    }
}

function persistRehydrate({ payload }) {
    const token = get(payload, 'Auth.token', '');
    if (!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
    const { nome, email, password, id } = payload;

    try {
        if (id) {
            yield call(axios.put, '/users/', {
                nome,
                email,
                password: password || undefined,
            });
            toast.success('Perfil editado com sucesso!');
            yield put(
                actions.registerUpdatedSuccess({ nome, email, password }),
            );
        } else {
            yield call(axios.post, '/users/', {
                nome,
                email,
                password: password || undefined,
            });
            toast.success('Conta criada com sucesso!');
            yield put(
                actions.registerCreatedSuccess({ nome, email, password }),
            );
            history.push('/login');
        }
    } catch (e) {
        const errors = get(e, 'response.data.errors');
        const status = get(e, 'response.status');

        if (status === 401) {
            toast.error(
                'Ocorreu um erro com seu login atual, faça login novamente para acessar a pagina.',
            );
            yield put(actions.loginFailure());
            return history.push('/login');
        }

        if (errors.length > 0) {
            errors.map((err) => toast.error(err));
            yield put(actions.registerFailure());
        } else {
            toast.error('Ocorreu um erro, tente novamente mais tarde');

            yield put(actions.registerFailure());
        }
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
