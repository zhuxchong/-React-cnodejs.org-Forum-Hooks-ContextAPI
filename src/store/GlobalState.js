import React, { useReducer, useState } from "react";
import TestContext from "./initialContext";
const GlobalState = props => {
  const [status, setStatus] = useState({ user: {}, status: false });
  const [user, setUser] = useState({});
  const [collect, setCollect] = useState(null);
  const userDetail = newObj => {
    setUser(newObj);
  };
  const userCollection = newObj => {
    setCollect(newObj);
  };
  const userLogin = async (name, id, url) => {
    setStatus(() => {
      return { user: { name: name, id: id, url: url }, status: true };
    });
  };
  const userLogout = () => {
    setStatus(() => {
      return { status: false };
    });
  };

  //console.log(data);
  return (
    <TestContext.Provider
      value={{
        status,
        user,
        collect,
        userCollection: userCollection,
        userLogin: userLogin,
        userLogout: userLogout,
        userDetail: userDetail
      }}
    >
      {props.children}
    </TestContext.Provider>
  );
};
export default GlobalState;
