// import Img from "../Assests/DALL·E 2023-06-22 08.54.27.png";

const Header = (props) => {
  return (
    <div className="app__navbar">
      <span className="leetmate">
        &nbsp;&nbsp;&nbsp;
        {/* <img src={Img} alt="logo" width="30" height="30" /> */}
        &nbsp; LEET GRAPHS
      </span>
      <p className="problemCount">
        &nbsp;&nbsp;&nbsp; User Count: {props.numberOfProblems}
        &nbsp;&nbsp;&nbsp;
      </p>
    </div>
  );
};
export default Header;
