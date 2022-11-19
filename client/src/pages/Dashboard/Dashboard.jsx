import React from "react";
import { Link, useParams } from "react-router-dom";

import Users from '../../components/List/Users'

// Redux
import { useSelector } from "react-redux";
import {
  getCurrentAccount,
 

} from "../../redux/reducers/accountsSlice";

// testing function
import useRefreshToken from "../../hooks/useRefreshToken";

import classes from "./Dashboard.module.scss";
const { dashboard } = classes;

const Dashboard = () => {
  const { id } = useParams();

  const currentAccount = useSelector(getCurrentAccount);


  const refresh = useRefreshToken();


  return (
    <div className={dashboard}>
      <h1>{id}</h1>
      <h1>hello: {currentAccount.login_account.email}</h1>
  
      <br />
      <button className="test_btn" onClick={() => refresh()}>
        Refresh
      </button>
      
        <Users/>
     
    </div>
  );
};

export default Dashboard;
