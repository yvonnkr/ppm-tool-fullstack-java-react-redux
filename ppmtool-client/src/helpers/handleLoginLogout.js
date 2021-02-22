import jwt_decode from "jwt-decode";
import { setJWTToken } from "./securityUtils";
import { SET_CURRENT_USER } from "../actions/types";
import { logout } from "../actions/securityActions";

export const handleLoginLogout = async (store) => {
  const jwtToken = localStorage.jwtToken;

  if (jwtToken) {
    setJWTToken(jwtToken);
    const decodedJwtToken = jwt_decode(jwtToken);

    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decodedJwtToken,
    });

    // Logout
    const currentTime = Date.now() / 1000;
    if (decodedJwtToken.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/";
    }
  }
};
