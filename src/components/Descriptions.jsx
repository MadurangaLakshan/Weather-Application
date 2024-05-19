import React from "react";
import "../index.css";

import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import { BiHappyAlt } from "react-icons/bi";

const Descriptions = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      title: "min",
      icon: <FaArrowDown />,
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },

    {
      id: 2,
      title: "max",
      icon: <FaArrowUp />,
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },

    {
      id: 3,
      title: "feels-like",
      icon: <BiHappyAlt />,
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },

    {
      id: 4,
      title: "Pressure",
      icon: <MdCompress />,
      data: weather.pressure.toFixed(),
      unit: "hPa",
    },

    {
      id: 5,
      title: "Humidity",
      icon: <MdOutlineWaterDrop />,
      data: weather.humidity.toFixed(),
      unit: "%",
    },

    {
      id: 6,
      title: "wind speed",
      icon: <FaWind />,
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className="section section__description">
      {cards.map(({ id, title, icon, data, unit }) => (
        <div key={id} className="card">
          <div className="description__card-icon">
            {icon}
            <small>{title}</small>
            <h2>{`${data} ${unit}`}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;
