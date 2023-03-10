import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "primereact/chart";
import * as GLOBAL from './../../Common/consts';
import "./Home.css";

const Home = () => {
  const Global = GLOBAL.GLOBAL_STATISTICS;
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `Statistics`;
    navigate(path);
  };


  const [posts, setPosts] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    fetch(`https://api.covid19api.com/summary`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ file: Home.js:23 ~ .then ~ data:", data, data.success)
        data.success != undefined ? setPosts(data.Global) : setPosts(Global);
      })
      .catch((err) => {
        console.log("🚀 ~ file: Home.js:27 ~ useEffect ~ err:", err)
        setPosts(Global);
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Coronavirus Cases", "Recovered Cases", "Death Cases"],
      datasets: [
        {
          data: [Global.TotalConfirmed, Global.TotalRecovered, Global.TotalDeaths],
          backgroundColor: [
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div>
      <div className="app-container-statistics">
        <div className="app-container-statistics-section">
          <div className="app-container-statistics__label">
            Coronavirus Cases:
          </div>
          <div className="app-container-statistics__value  app-container-statistics__value--total">
            {posts?.TotalConfirmed?.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}
          </div>
          <button
            className="app-container-statistics__button"
            onClick={routeChange}
          >
            View by country
          </button>
        </div>
        <div className="app-container-statistics-section">
          <div className="app-container-statistics__label">
            Recovered Cases:
          </div>
          <div className="app-container-statistics__value app-container-statistics__value--recovered">
            {posts?.TotalRecovered?.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}
          </div>
        </div>
        <div className="app-container-statistics-section">
          <div className="app-container-statistics__label">Death Cases:</div>
          <div className="app-container-statistics__value  app-container-statistics__value--death">
            {posts?.TotalDeaths?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
      </div>
      <div className="card">
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          className="card_chart"
        />
      </div>
    </div>
  );
};
export default Home;
