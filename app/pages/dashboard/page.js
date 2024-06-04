"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CiDollar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaShareNodes } from "react-icons/fa6";
import CustomCard from "@/app/components/dashboard/CustomCard";
const Dashboard = () => {
  const columnOptions = {
    title: {
      text: "My chart",
    },
    chart: {
      width: 600,
      height: 300,
      type: "column",
    },
    xAxis: {
      allowDecimals: false,
      accessibility: {
        rangeDescription: "Range: 2010 to 2014.",
      },
    },
    yAxis: {
      title: {
        text: "Nuclear weapon states",
      },
    },
    tooltip: {
      pointFormat:
        "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>" +
        "warheads in {point.x}",
    },
    plotOptions: {
      area: {
        pointStart: 2020,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "USA",
        data: [5, 22, 67, 89, 19],
      },
      {
        name: "USSR/Russia",
        data: [17, 23, 77, 19, 90],
      },
    ],
  };
  const areaOptions = {
    title: {
      text: "My chart",
    },
    chart: {
    //   width: 600,
    //   height: 300,
      type: "area",
    },
    xAxis: {
      allowDecimals: false,
      accessibility: {
        rangeDescription: "Range: 2010 to 2014.",
      },
    },
    yAxis: {
      title: {
        text: "Nuclear weapon states",
      },
    },
    tooltip: {
      pointFormat:
        "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>" +
        "warheads in {point.x}",
    },
    plotOptions: {
      area: {
        pointStart: 2020,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "USA",
        data: [5, 22, 67, 89, 19],
      },
      {
        name: "USSR/Russia",
        data: [17, 23, 77, 19, 90],
      },
    ],
  };
  const CardData = [
    {
      title: "Earning",
      icon: <CiDollar/>,
      symbol: "&#36;",
      CardText: "967",
    },
    {
      title: "Share",
      icon: <FaShareNodes/>,
      symbol: "",
      CardText: "6739",
    },
    {
      title: "Likes",
      icon: <AiFillLike/>,
      symbol: "",
      CardText: "9827",
    },
    {
      title: "Rating",
      icon: <FaStar/>,
      symbol: "",
      CardText: "8.7",
    },
  ];
  const pieOptions = {
    // Pie chart options
    chart: {
      type: "pie",
    //   width: 400,
    //   height: 300,
    },
    title: {
      text: "Developer ",
    },
    series: [
      {
        name: "Categories",
        colorByPoint: true,
        data: [
          {
            name: "Category 1",
            y: 20,
          },
          {
            name: "Category 2",
            y: 30,
          },
          {
            name: "Category 3",
            y: 50,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <div className="flex flex-wrap justify-evenly">
      {CardData.map((cardItem, index) => (
        <div key={index} className="w-1/2 md:w-1/5 m-3">
          <CustomCard
            title={cardItem.title}
            icon={cardItem.icon}
            currencySymbol={cardItem.symbol}
            CardText={cardItem.CardText}
          />
        </div>
      ))}
      </div>

      <div className="flex flex-wrap justify-evenly">
        {/* Column charts */}
        <div className="w-full lg:w-1/2 m-3">
          <div className="flex flex-wrap">
            <div className="w-full border border-gray-300 rounded-lg shadow-md">
              <HighchartsReact highcharts={Highcharts} options={columnOptions} />
            </div>
            <div className="w-full border border-gray-300 rounded-lg shadow-md mt-4">
              <HighchartsReact highcharts={Highcharts} options={areaOptions} />
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="w-full lg:w-1/3 m-3 border border-gray-300 rounded-lg shadow-md">
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
