import { constants } from './index';
import axios from 'axios';
import { fromJS } from 'immutable';

const getHeaderList = (data) => {
    return {
        type: constants.GET_HEADER_LIST,
        data: fromJS(data),
        totalPage: Math.ceil(data.length / 10),
    }
};

export const  handleInputOnFocus = () => {
    return {
        type: constants.SEARCH_FOCUS,
    }
};

export const  handleInputOnBlur = () => {
    return {
        type: constants.SEARCH_BLUR,
    }
};

export const  getListAreaHandleChanged = () => {
    return {
        type: constants.CHANGE_HEADER_LIST,
    }
};

export const  handleMouseEnter = () =>　{
    return{
        type: constants.HANDLE_MOUSE_ENTER,
    }
};

export const handleMouseLeave = () => {
    return{
        type: constants.HADNLE_MOUSE_LEAVE,
    }
};


export const  getList = () =>{
    return (dispatch) => {
       axios.get('/api/headerList.json').then((res) => {
          const { data : { data : array } } = res;
          dispatch(getHeaderList(array));
       }).catch((res) => {
           console.log('error');
       });
    }
};