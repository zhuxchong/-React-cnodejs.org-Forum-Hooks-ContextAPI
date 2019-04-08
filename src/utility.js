import moment from "moment";
import axios from "axios";
export const getDiff = date => {
  const now = moment();
  const postTime = date;
  return now.diff(postTime, "days"); // 7
};
export const httpRequest = async url => {
  let result;
  await axios
    .get(url)
    .then(res => {
      result = res;
      //console.log(result);
    })
    .catch(e => console.log(e));
  return result;
};
export const httpPostRequest = async (url, obj) => {
  let result;
  await axios
    .post(url, obj)
    .then(res => {
      result = res;
      //console.log(result);
    })
    .catch(e => console.log(e));
  return result;
};
