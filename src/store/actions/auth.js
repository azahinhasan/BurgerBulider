import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userID:userID
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logOut=()=>{

    localStorage.removeItem('token');
    localStorage.removeItem('exiprationDate');
    localStorage.removeItem('userId');

    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut=(exirationTime)=>{
    return dispatch=>{
        setTimeout(() =>{
            dispatch(logOut());
        },exirationTime*1000);
    }
}

export const auth = (email, password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email: email,
            password: password,
            returnSecureToken:true
        }
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeTrpHdcnOSKMC8wg94pCuOig_0ztHCaY';
        console.log(isSignUp)
        if(!isSignUp){
            
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeTrpHdcnOSKMC8wg94pCuOig_0ztHCaY';
            //url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyBeTrpHdcnOSKMC8wg94pCuOig_0ztHCaY';
        }
        
        axios.post(url,authData)
        .then(response=>{

            const exiprationDate =new Date(new Date().getTime()+response.data.expiresIn*1000);

            console.log("response[action/auth.js] ",response);

            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('exiprationDate',exiprationDate);
            localStorage.setItem('userId',response.data.localId);

            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));

        }).catch(err=>{
            dispatch(authFail(err.response.data.error));
        })
    };
};


export const setAuthRedirectPath=path=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }else{
            const exiprationDate = new Date(localStorage.getItem('exiprationDate'));
            if(exiprationDate < new Date()){
                dispatch(logOut());
            }else{
                const userId=localStorage.getItem('userId');

                dispatch(authSuccess(token,userId));
                dispatch((checkAuthTimeOut((exiprationDate.getTime() - new Date().getTime())/1000)));
            }

        }
    }
}