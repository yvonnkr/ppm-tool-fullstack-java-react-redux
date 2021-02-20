import jwt_decode from "jwt-decode";
import { setJWTToken } from "./securityUtils";
import { SET_CURRENT_USER } from "../actions/types";

export const handleLoginLogout = (jwtToken, store) => {
  if (jwtToken) {
    setJWTToken(jwtToken);
    const decodedJwtToken = jwt_decode(jwtToken);

    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decodedJwtToken,
    });

    const currentTime = Date.now() / 1000;
    if (decodedJwtToken.exp < currentTime) {
      //handle logout
      //window.location.href = "/";
    }
  }
};
