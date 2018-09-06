import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({
    login: false,
    userName: '',
    password: '',
});

const loginUser = (state, action) => {
    const { login } = action;
    return state.merge({
       login,
    });
};

const logOut = (state, action) => {
    const { login } = action;
    return state.merge({
        login,
    })
}

export  default  (state = defaultState, action) => {
    const { type } = action;
    switch (type){
        case constants.LOGIN_USER:
            return loginUser(state, action);
        case constants.LOGIN_OUT:
            return logOut(state, action);
        default:
            return state;
    }
};