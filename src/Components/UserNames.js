import { Fragment } from "react";

const UserNames = (props) => {
  <Fragment>
    {props.userIds.map((item) => (
      <a href={`https://leetcode.com/${item}`}>
        <button className="displayNameButton">{item}</button>
      </a>
    ))}
  </Fragment>;
};
export default UserNames;
