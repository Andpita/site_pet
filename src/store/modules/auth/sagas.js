import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { get } from 'lodash';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/token', payload);

    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('E-mail e/ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { nome, password, email, id } = payload;
  console.log(payload);

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      yield put(actions.registerSuccess({ nome, email, password }));
      toast.success('Usuário alterado com sucesso');
    } else {
      yield call(axios.post, '/users', {
        nome,
        password,
        email,
      });

      yield put(actions.registerSuccess({ nome, email, password }));
      toast.success('Usuário criado com sucesso');
      history.push('/login');
    }
  } catch (e) {
    const status = get(e, 'response.status', 0);
    const errors = get(e, 'response.data.errors', []);

    if (status === 401) {
      toast.warn('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido >:(');
    }

    yield put(actions.loginFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
