import { axiosPrivate } from "../api/index";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
// Redux
import { useSelector } from "react-redux";
import { getCurrentAccount } from "../redux/reducers/accountsSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const currentAccount = useSelector(getCurrentAccount);

  useEffect(() => {
    // Note: concept of this interceptor comes from axios doc
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${currentAccount?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // This refresh() can be tested by a button in any component before using in here
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [currentAccount.accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
