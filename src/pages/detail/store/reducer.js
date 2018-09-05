import { fromJS } from  'immutable';
import { constants } from './index';
const defaultState = fromJS({
    title: '',
    content:'',
});

const initDetailMethod = (state, action) => {
    const { title, content } = action;
    return state.merge({
        title,
        content
    });
};

export default  (state = defaultState, action) => {
    const { type } = action ;

    switch (type) {
        case constants.INIT_DETAIL_DATA:
           return initDetailMethod(state,action);
        default:
            return state;
    }
};