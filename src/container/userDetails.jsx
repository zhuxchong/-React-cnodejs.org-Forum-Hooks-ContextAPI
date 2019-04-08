import React, { useState, useEffect, useContext } from "react";
import { httpRequest } from "../utility";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import UserContext from "../store/initialContext";
import PostItem from "../component/postList";
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
    // console.log(url);
    httpRequest(url).then(res => {
      context.userDetail(res.data.data);
    });
    return () => {
      context.userDetail({});
    };
  }, []);
  const handleCollect = () => {
    const collectUrl = `https://cnodejs.org/api/v1/topic_collect/${
      props.match.params.name
    }`;
    httpRequest(collectUrl).then(res => {
      context.userDetail({ ...context.user, collect: res.data });
    });
  };
  return (
    <div>
      <div style={{ marginLeft: "15px" }}>
        Username is {props.match.params.name}
      </div>
      {console.log(context.user)}
      <Button
        onClick={handleCollect}
        variant="outlined"
        component="span"
        className={classes.button}
      >
        Get Collect Artical
      </Button>
      {context.user.collect &&
        context.user.collect.data.map((i, index) => {
          return (
            <div key={index}>
              <Chip label={i.title} className={classes.chip} />
            </div>
          );
        })}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Tabs />

        <Right />
      </div>
    </div>
  );
};
export default React.memo(withStyles(styles)(UserDetail));
