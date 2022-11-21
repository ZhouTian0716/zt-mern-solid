import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

// Redux
import { useSelector } from "react-redux";
import {
  getCurrentAccount,
} from "../../redux/reducers/accountsSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const currentAccount = useSelector(getCurrentAccount);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        // isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    !currentAccount?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    // return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(currentAccount?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;


{/* <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</> */}
