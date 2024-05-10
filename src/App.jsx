import { useState, useEffect } from "react";
import left_arrow from "./assets/leftArrow.svg";
import right_arrow from "./assets/rightArrow.svg";
import { days, months } from "./data.js";
import "./index.css";

function App() {
  const [todaysDate, SetTodaysDate] = useState(new Date());

  const daydInMonths = () => {
    const daysArray = [];

    const firstDate = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      1
    );
    const lastDate = new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth() + 1,
      0
    );

    for (let i = 0; i < firstDate.getDay(); i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= lastDate.getDate(); i++) {
      daysArray.push(
        new Date(todaysDate.getFullYear(), todaysDate.getMonth(), i)
      );
    }

    return daysArray;
  };

  useEffect(() => {
    daydInMonths();
  });

  function handleMonthChange(e) {
    const newMonth = parseInt(e.target.value, 10);
    SetTodaysDate(new Date(todaysDate.getFullYear(), newMonth, 1));
  }

  function handleYearChange(e) {
    const newYear = parseInt(e.target.value, 10);
    SetTodaysDate(new Date(newYear, todaysDate.getMonth(), 1));
  }

  function isTodaysDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  return (
    <>
      <div className="calender">
        <div className="header">
          <button
            onClick={() => {
              SetTodaysDate(
                new Date(todaysDate.getFullYear(), todaysDate.getMonth() - 1, 1)
              );
            }}
          >
            <img src={left_arrow} />
          </button>
          <select value={todaysDate.getMonth()} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select value={todaysDate.getFullYear()} onChange={handleYearChange}>
            {Array.from(
              { length: 10 },
              (_, i) => todaysDate.getFullYear() - 5 + i
            ).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={() => {
              SetTodaysDate(
                new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 1)
              );
            }}
          >
            <img src={right_arrow} />
          </button>
        </div>
        <div className="daysOfWeek">
          {days.map((day) => (
            <div key={day}> {day} </div>
          ))}
        </div>
        <div className="days">
          {daydInMonths().map((day, index) => (
            <div
              key={index}
              className={
                day
                  ? isTodaysDate(day, new Date())
                    ? "day current"
                    : "day"
                  : "empty"
              }
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
