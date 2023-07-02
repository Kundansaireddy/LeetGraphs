import "./App.css";
import React, { useState } from "react";
import Header from "./Components/Header";
import ErrorMessage from "./Components/ErrorMessage";
import NoCharacter from "./Components/NoCharacter";
import { CChart } from "@coreui/react-chartjs";
const API_ENDPOINT = "https://leet-graph-api.onrender.com/";

const App = () => {
  const [userName, setUserName] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [userCompleteData, setUserCompleteData] = useState([]);
  const [dataNames, setDataNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = `${API_ENDPOINT}${userName}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.userContestRankingHistory;
      const attendedContests = data.filter(
        (item) =>
          (parseInt(item.contest.title.slice(-3)) > 300 &&
            parseInt(item.contest.title.slice(-3)) < 400) ||
          (item.contest.title.startsWith("Bi") &&
            parseInt(item.contest.title.slice(-2)) > 82)
      );

      const namesAttendedContests = attendedContests.map(
        (item) => item.contest.title
      );
      // console.log(namesAttendedContests);
      setDataNames(namesAttendedContests);
      const rankingData = attendedContests.map((item) => item.rating);
      // console.log(rankingData);
      setUserCompleteData((prevElements) => [
        ...prevElements,
        { userName, namesAttendedContests, rankingData },
      ]);
      if (userName.length > 0 && !userIds.includes(userName.toLowerCase())) {
        setUserIds((prevState) => [...prevState, userName.toLowerCase()]);
      }
      setIsLoading(false);
      setUserName("");
    } catch (error) {
      setCartIsShown(true);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userIds.includes(userName) === false) {
      handleFormSubmit(event);
    } else {
      setUserName("");
    }
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
    setUserName("");
  };

  const deleteHandler = async (event, item) => {
    event.preventDefault();
    const newIds = userIds.filter((value) => value !== item);
    setUserIds(newIds);
    const newUserData = userCompleteData.filter(
      (value) => value.userName !== item
    );
    setUserCompleteData(newUserData);
    if (newIds.length === 0) {
      setUserCompleteData([]);
    }
  };

  const isSubmitDisabled = userName.trim().length === 0;
  const borderColors = [
    "#0079FF",
    "#00DFA2",
    "#F6FA70",
    "#FF0060",
    "#191825",
    "#FF8400",
    "4F200D",
  ];

  return (
    <div className="app">
      {cartIsShown && (
        <ErrorMessage onClose={hideCartHandler} shownName={userName} />
      )}
      <Header numberOfProblems={userIds.length} />
      <div className="app__content">
        <div className="app__sidebar">
          <form onSubmit={handleSubmit} className="app__form">
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Enter Leetcode ID"
              className="app__input"
            />
            {isSubmitDisabled && <NoCharacter />}
            <button
              type="submit"
              className={`${
                isSubmitDisabled ? "app__button_disabled" : "app__button"
              }`}
              disabled={isSubmitDisabled}
            >
              Add Friend
            </button>
          </form>
          {isLoading && <p>Loading data ...</p>}

          {userIds.map((item) => (
            <div>
              <a
                href={`https://leetcode.com/${item}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="displayNameButton">{item}</button>
              </a>
              <button
                className="displayNameButtonNext"
                onClick={(event) => deleteHandler(event, item)}
              >
                {" "}
                X{" "}
              </button>
            </div>
          ))}
        </div>
        <div className="app__problem-list">
          {userCompleteData.length > 0 && (
            <div className="app__above_message">
              <b>
                {" "}
                Provided below is the graph of ranking vs contests of all users:
              </b>
            </div>
          )}
          {userCompleteData.length > 0 && (
            <div>
              <CChart
                type="line"
                data={{
                  labels: dataNames,
                  datasets: userCompleteData.map((data, index) => ({
                    label: data.userName,
                    backgroundColor: `rgba(220, 220, 220, 0.2)`,
                    borderColor: borderColors[index % borderColors.length],
                    pointRadius: 1,
                    data: data.rankingData,
                  })),
                }}
                options={{
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
              <div className="errorShow">
                *Click on the users to remove thier rating flow
              </div>
            </div>
          )}
          {userCompleteData.length === 0 && (
            <p className="app__message">Your Graphs list will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
