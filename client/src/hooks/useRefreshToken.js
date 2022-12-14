import { API } from "../api/index";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { tokenRefresh } from "../redux/reducers/accountsSlice";
import { getCurrentAccount } from "../redux/reducers/accountsSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(getCurrentAccount);

  const refresh = async () => {
    // Your backend refresh end point!
    // π» ZT NOTE: allow us to send cookie
    // MAKE SURE when u login, have the same withCredentials: true,

    const response = await API.get("/refresh", {
      withCredentials: true,
    });

    console.log(response);
    const newAccessToken = response.data.accessToken_refreshed;

    // θΏιεει»θΎ
    // check if we have currentAccount here, if not means user refreshed page
    if (currentAccount) {
      dispatch(tokenRefresh(newAccessToken));
    }
    // θΏιεει»θΎ
    // check if we have currentAccount here, if not means user refreshed page
    console.log(newAccessToken);

    return newAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
