import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PostList from "./postList";
import UserContext from "../store/initialContext";
import { httpRequest } from "../utility";

const styles = {
  root: {
    width: "80%",
    padding: "10px",
    boxShadow: "none"
  }
};

const CenteredTabs = props => {
  const context = useContext(UserContext);
  const [value, setValue] = useState(0);

  const changeFormat = obj => {
    let result = [];
    obj.map(i => {
      result.push({
        authorName: i.author.loginname,
        artical: {
          id: i.id,
          lastReply: i.last_reply_at,
          title: i.title
        }
      });
      return null;
    });
    return result;
  };

  const [item, setItem] = useState(changeFormat(context.user.recent_topics));
  const handleChange = (event, value) => {
    setValue(value);
  };
  //   const handleCollect = () => {
  //     const collectUrl = `https://cnodejs.org/api/v1/topic_collect/${
  //       context.user.loginname
  //     }`;
  //     !context.user.collect &&
  //       httpRequest(collectUrl).then(res => {
  //         context.userDetail({ ...context.user, collect: res.data });
  //       });
  //   };

  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Topic"
          onClick={() => {
            setItem(changeFormat(context.user.recent_topics));
          }}
        />
        <Tab
          label="Reply"
          onClick={() => {
            setItem(changeFormat(context.user.recent_replies));
          }}
        />
        <Tab
          label="Collect"
          onClick={() => {
            if (context.collect) {
              setItem(changeFormat(context.collect));
            } else {
              setItem("loading");
            }
          }}
        />
      </Tabs>

      <PostList topic={item} />
    </Paper>
  );
};

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
