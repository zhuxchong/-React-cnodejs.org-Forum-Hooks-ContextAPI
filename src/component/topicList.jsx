import React, { memo } from "react";
import { Title } from "./style";
import { getDiff } from "../utility";
import { Link } from "react-router-dom";

const Topic = props => {
  return (
    <React.Fragment>
      <div style={{ display: "flex", position: "relative" }}>
        <Title count={props.data.count}>
          {console.log(props)}
          <img
            src="https://avatars0.githubusercontent.com/u/40711969?v=4&s=120"
            style={{ height: "30px", width: "30px" }}
            alt="as"
          />
          {props.data.reply_count}/{props.data.visit_count}
          {}
          <Link to={`/artical/${props.data.id}`}>{props.data.title}</Link>
          <span>{` ----${getDiff(props.data.date)} days ago`}</span>
          <span>
            <Link to={`/user/${props.data.author.loginname}`}>{`  ${
              props.data.author.loginname
            }`}</Link>
          </span>
        </Title>
      </div>
    </React.Fragment>
  );
};
export default memo(Topic);
