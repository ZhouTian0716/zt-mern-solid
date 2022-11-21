import React from "react";
import { Link, useParams } from "react-router-dom";

import Users from '../../components/List/Users'

// Redux


// testing function
import useRefreshToken from "../../hooks/useRefreshToken";

import classes from "./Dashboard.module.scss";
const { dashboard } = classes;

const Dashboard = () => {
  const { id } = useParams();

  


  const refresh = useRefreshToken();


  return (
    <div className={dashboard}>
      <h1>{id}</h1>
      
  
      <br />
      <button className="test_btn" onClick={() => refresh()}>
        Refresh
      </button>
      
        <Users/>
     
    </div>
  );
};

export default Dashboard;
