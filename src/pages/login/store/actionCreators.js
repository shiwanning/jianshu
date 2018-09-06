import { constants } from './index';
import axios from 'axios';

const loginUserData = (status) => {

     return {
         type: constants.LOGIN_USER,
         login: status,
     }
};


export const loginUser = (user) => {
     const { userName, passWord } = user;
     const urlParams = 'userName='+userName+'&password='+passWord;
     return (dispatch) => {
         axios.get('/api/login.json?'+urlParams).then(
             (res)=>{
                 const { data : { success : status }} = res;
                 dispatch(loginUserData(status));
             }
         ).catch(()=>{
             console.log('error');
         })
     };
};

export const logOut = () => {
    return {
        type: constants.LOGIN_OUT,
        login: false,
    }
};