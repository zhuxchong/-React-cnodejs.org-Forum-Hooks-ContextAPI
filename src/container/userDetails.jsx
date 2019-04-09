import React, { useState, useEffect, useContext } from "react";
import { httpRequest } from "../utility";
import { withStyles } from "@material-ui/core/styles";

import UserContext from "../store/initialContext";

import Right from "../component/rightContent";
import Tabs from "../component/tabs";
//import Avatar from "@material-ui/core/Avatar";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

const UserDetail = props => {
  const { classes } = props;
  //const [user, setUser] = useState({});
  const context = useContext(UserContext);
  useEffect(() => {
    const url = `https://cnodejs.org/api/v1/user/${props.match.params.name}`;
    httpRequest(url).then(res => {
      context.userDetail(res.data.data);
    });

    const collectUrl = `https://cnodejs.org/api/v1/topic_collect/${
      props.match.params.name
    }`;
    httpRequest(collectUrl).then(res => {
      context.userCollection(res.data.data);
    });
    return () => {
      context.userDetail({});
    };
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "15px" }}>
        Username is {props.match.params.name}
      </div>

      {context.user.loginname && context.collect !== null ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Tabs />

          <Right />
        </div>
      ) : (
        "等等"
      )}
    </div>
  );
};
export default React.memo(withStyles(styles)(UserDetail));
