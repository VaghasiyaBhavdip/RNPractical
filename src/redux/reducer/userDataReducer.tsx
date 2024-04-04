import type from "../type";

const initialState = {
    data: null,
  };
  
  export const getUserData = (state = initialState, action: any) => {
    switch (action.type) {
      case type.SET_DATA:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };