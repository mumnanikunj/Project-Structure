
import {CHANGE_CLUB,
   MOCK_ONBOARD_DATA,
   RESET_SESSION_DATA,
   SET_CALLBACK,
   SET_CURRENT_STEP,
   SET_MESSAGE,
   SET_POST_MESSAGE_UNITY,
   SET_SESSION_DATA, 
   SIGNOUT_REQUEST,
   UPDATE_ONBOARD_DATA} from './Types';

export const setSessionData = (data) => {
  return {
    type: SET_SESSION_DATA,
    payload: data
  };
};

export const changeClub = (club) => {
  return {
    type: CHANGE_CLUB,
    payload: club
  };
};

export const setSessionDataDefault = () => {
  return {
    type: RESET_SESSION_DATA
  };
};

export const setUnityPostMessage = (data) => {
  return {
    type: SET_POST_MESSAGE_UNITY,
    payload: data
  };
};

export const updateOnBoardData = (data) => {
  return {
    type: UPDATE_ONBOARD_DATA,
    payload: data
  };
};

export const mockData = (data)=>{
  return{
    type: MOCK_ONBOARD_DATA,
    payload :data
  }
}

export const setCurrentStep = (data)=>{
  return{
    type: SET_CURRENT_STEP,
    payload :data
  }
}




export const signOUT = () => {
  return {
    type: SIGNOUT_REQUEST
  };
};

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message
  };
};

export const setCallback = (calBack) => {
  return {
    type: SET_CALLBACK,
    payload: calBack
  };
};
