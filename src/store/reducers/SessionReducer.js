import Strings from '../../constants/Strings';
import { CHANGE_CLUB, MOCK_ONBOARD_DATA, RESET_SESSION_DATA, SET_CALLBACK, SET_CURRENT_STEP, SET_MESSAGE, SET_POST_MESSAGE_UNITY, SET_SESSION_DATA, SET_STAGE_ID, UPDATE_ONBOARD_DATA } from '../actions/Types';

const intialState = {
  id: "",
  game_type: "",
  sub_game_type: "",
  distance: "",
  club: "",
  created_at: "",
  message: Strings.error_alert_message,
  unityPostMessage: {},
  callBack: {},
  onboardData: {},
  currentStep: 0,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_SESSION_DATA: {
      return {
        ...state,
        id: action.payload.id,
        game_type: action.payload.game_type,
        sub_game_type: action.payload.sub_game_type,
        distance: action.payload.distance,
        club: action.payload.club,
        created_at: action.payload.created_at
      };
    }
    case CHANGE_CLUB: {
      return {
        ...state,
        club: action.payload
      };
    }
    case SET_CURRENT_STEP: {
      return {
        ...state,
        currentStep: action.payload
      };
    }
    case RESET_SESSION_DATA: {
      return {
        id: "",
        game_type: "",
        sub_game_type: "",
        distance: "",
        created_at: "",
        club: ""
      };
    }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case SET_POST_MESSAGE_UNITY:
      return {
        ...state,
        unityPostMessage: action.payload
      };
    case UPDATE_ONBOARD_DATA:
      return {
        ...state,
        onboardData: action.payload
      };
    case SET_CALLBACK:
      return {
        ...state,
        callBack: action.payload
      };
    default: {
      return state;
    }
  }
};
