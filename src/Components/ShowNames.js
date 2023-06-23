const ShowNames = (props) => {
    return {props.names.map((item) => (
        <a href={`https://leetcode.com/${item}`} target="_blank">
          <button className="displayNameButton">{item}</button>
        </a>
      ))}
}
export default ShowNames;