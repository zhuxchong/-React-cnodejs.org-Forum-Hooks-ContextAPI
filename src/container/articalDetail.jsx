import React, { useState, useEffect } from "react";
import { httpRequest } from "../utility";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { httpPostRequest } from "../utility";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
const ArticalDetail = props => {
  const { classes } = props;
  const [artical, setArtical] = useState({});
  useEffect(() => {
    const url = localStorage.getItem("token")
      ? `https://cnodejs.org/api/v1/topic/${
          props.match.params.id
        }?accesstoken=${localStorage.getItem("token")}`
      : `https://cnodejs.org/api/v1/topic/${props.match.params.id}`;
    // console.log(url);
    httpRequest(url)
      .then(res => {
        setArtical(res.data.data);
      })
      .catch(e => console.log(e));
  }, []);
  const handleCancelCollect = () => {
    const url = "https://cnodejs.org/api/v1//topic_collect/de_collect";
    const obj = {
      accesstoken: localStorage.getItem("token"),
      topic_id: props.match.params.id
    };
    httpPostRequest(url, obj).then(
      res => res.data.success && setArtical({ ...artical, is_collect: false })
    );
  };

  const handleCollect = () => {
    const url = "https://cnodejs.org/api/v1//topic_collect/collect";
    const obj = {
      accesstoken: localStorage.getItem("token"),
      topic_id: props.match.params.id
    };
    httpPostRequest(url, obj).then(
      res => res.data.success && setArtical({ ...artical, is_collect: true })
    );
  };
  return (
    <div>
      {props.match.params.id}
      {`=====`}

      {artical.is_collect ? (
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          onClick={handleCancelCollect}
        >
          取消收藏
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleCollect}
        >
          收藏
        </Button>
      )}
      {/* {console.log(artical)} */}
    </div>
  );
};
export default withStyles(styles)(ArticalDetail);
