import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import Topics from "../component/topicList";
import { InfiniteLoader, List } from "react-virtualized";

const ListShow = props => {
  //setCount(1);
  //const [count, setCount] = useState(0);
  const [title, setTitle] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
  const sendHttp = () => {
    let numList = title.length;
    axios
      .get(`https://cnodejs.org/api/v1/topics?page=${page}&limit=20`, {
        cancelToken: source.token
      })
      .then(res => {
        // console.log(res.data.data);
        let list = [];
        res.data.data.map(async i => {
          let result = {
            author: {
              id: i.author_id,
              avatar: i.author.avatar_url,
              loginname: i.author.loginname
            },
            id: i.id,
            title: i.title,
            visit_count: i.visit_count,
            reply_count: i.reply_count,
            date: i.create_at,
            count: numList
          };
          numList++;
          list.push(result);
        });
        setTitle([...title, ...list]);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const asyncrequestIntialTopic = async () => {
    // console.log("initial loading");
    await sendHttp();
  };
  //console.log(count);
  // async function setNum(num) {
  //   await setCount(num);
  // }
  const loadMoreRows = async () => {
    if (isLoading) return;
    // console.log("Loading more...");
    setLoading(true);
    setPage(page + 1);
    await sendHttp();
    setLoading(false);
  };
  const listHeight = 600;
  const rowHeight = 40;
  const rowWidth = 1200;
  const remoteRowCount = 500;
  const renderRow = ({ index, key, style }) => {
    const record = title[index];
    //console.log("style:", style);
    return record ? (
      <Topics style={style} key={key} data={record} />
    ) : (
      <div key={key} style={style}>
        Loading...
      </div>
    );
  };
  useEffect(() => {
    asyncrequestIntialTopic();
    return () => {
      source.cancel("cancel request");
    };
  }, []);
  // const test = () => {
  //   setTitle([...title, { new: "test" }]);
  // };

  return (
    <React.Fragment>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!title[index]} //有没有加载出来
        loadMoreRows={loadMoreRows}
        rowCount={remoteRowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={remoteRowCount}
            rowRenderer={renderRow}
            style={{ margin: "0 auto" }}
          />
        )}
      </InfiniteLoader>

      {/* <div onClick={loadMoreRows}>{console.log("re-render")}</div> */}
    </React.Fragment>
  );
};
export default memo(ListShow);
