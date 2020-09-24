import {USER_LOGIN } from '../actiontype';

export const userlogin = (user)=>{
    return {
        type: USER_LOGIN,
        userData: user
    };
};