import {all} from 'redux-saga/effects'

import auth from './auth/reducer'

export default function* rootSaga() {
    return yield all([auth])
}

