import type from "../type";
import store from "../store";
const {dispatch}=store
export const setUserData = (data: any) => {
    return dispatch({
      type: type.SET_DATA,
      payload: data,
    });
  };
  