export const USER_LOGIN = 'USER_LOGIN';

export const userlogin = (user)=>{
    return {
        type: USER_LOGIN,
        userData: user
    };
};