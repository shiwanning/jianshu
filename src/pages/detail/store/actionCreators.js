import axios from 'axios';
import { fromJS } from 'immutable';
import { constants } from './index';


const initDataFromDetail = (initData) => {
    const { title, content } = initData;
    return {
        type: constants.INIT_DETAIL_DATA,
        title: fromJS(title),
        content: fromJS(content),
    };
};

export const initDetailData = (id) => {
   return (dispatch) => {
       axios.get('/api/detail.json?id='+id).then((res) => {
           const { data : { data : initData }} = res;
           dispatch(initDataFromDetail(initData));
       })
   }
};