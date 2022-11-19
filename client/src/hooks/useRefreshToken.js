import {API} from "../api/index";

// Redux
import { useDispatch } from "react-redux";
import { tokenRefresh } from "../redux/reducers/accountsSlice"

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    // Your backend refresh end point!
    // 👻 ZT NOTE: allow us to send cookie
    // MAKE SURE when u login, have the same withCredentials: true,
    const response = await API.get("/refresh", {
      withCredentials: true, 
    });
    
    const newAccessToken = response.data.accessToken_refreshed
    dispatch(tokenRefresh(newAccessToken))

    console.log(newAccessToken);
    return newAccessToken
  };
  return refresh;
};

export default useRefreshToken;