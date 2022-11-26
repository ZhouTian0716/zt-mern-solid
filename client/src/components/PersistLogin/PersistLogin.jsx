import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

// Redux
import { useSelector } from "react-redux";
import { getCurrentAccount } from "../../redux/reducers/accountsSlice";
import { persistStatus } from "../../redux/reducers/displaySlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const currentAccount = useSelector(getCurrentAccount);
  const persist = useSelector(persistStatus);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        console.log("test start");
        await refresh();
        console.log("test pass");
      } catch (err) {
        console.error(err);
      } finally {
        
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    !currentAccount?.accessToken && persist
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(currentAccount?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
