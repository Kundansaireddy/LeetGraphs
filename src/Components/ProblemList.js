import { Fragment } from "react";
const ProblemList = (props) => {
  return (
    <Fragment>
      {props.userData.length > 0 ? (
        <ul>
          {props.userData.map((item, index) => (
            <div>
              <li key={index}>
                <a
                  href={`https://leetcode.com/problems/${item[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item[0]}
                </a>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p className="app__message">Your problems list will appear here</p>
      )}
    </Fragment>
  );
};
export default ProblemList;
