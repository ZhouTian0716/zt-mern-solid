import { API } from "../api/index";

import { useDispatch } from "react-redux";
import { logoutCurrent } from "../redux/reducers/accountsSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  
  const logout = async () => {
    try {
        dispatch(logoutCurrent());
      const response = await API.get("/accounts/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};
