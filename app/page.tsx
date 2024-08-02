"use client";

import data from "@/data.json";
import HorizontalChart from "../components/charts/HorizontalChart";
import SimplifyChartData from "@/Helpers/SimplifyChartData";
import * as interfaces from "@/Helpers/interfaces/interface";
import { useMemo, useState } from "react";
import Selector from "@/components/Select/Selector";
import Datepicker from "@/components/DatePicker/Datepicker";
import moment from "moment";
import getDatesBetween from "@/Helpers/getDatesBetween";

let parseData: Array<interfaces.inputData> = JSON.parse(
  JSON.stringify(
    data.map((item) => {
      return {
        ...item,
        Day: moment(item.Day, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };
    })
  )
);

const ageFilter = [
  {
    displayValue: "15 to 25",
    value: "15-25",
  },
  {
    displayValue: "greater than 25",
    value: ">25",
  },
];

const genderFilter = [
  {
    displayValue: "Male",
    value: "Male",
  },
  {
    displayValue: "Female",
    value: "Female",
  },
];

const calculateStats = (
  age: string,
  gender: string,
  arrayOfDates: Array<string>
): interfaces.featureData => {
  if (age === "" && gender === "" && arrayOfDates.length === 0)
    return { Age: age, Day: "", Gender: gender, chartData: [] };

  let filteredData;

  if (age && !gender)
    filteredData = parseData.filter((item) => item.Age === age);
  else if (!age && gender)
    filteredData = parseData.filter((item) => item.Gender === gender);
  else
    filteredData = parseData.filter(
      (item) => item.Gender === gender && item.Age === age
    );

  let totalData: interfaces.inputData = {
    Age: age,
    Day: "",
    Gender: gender,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  filteredData.forEach((item) => {
    totalData.A = +totalData.A + +item.A;
    totalData.B = +totalData.B + +item.B;
    totalData.C = +totalData.C + +item.C;
    totalData.D = +totalData.D + +item.D;
    totalData.E = +totalData.E + +item.E;
    totalData.F = +totalData.F + +item.F;
  });

  return SimplifyChartData(totalData);
};

export default function Home() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [startAndEndDate, setStartandEndDate] = useState(["", ""]);

  const arrayOfDates = useMemo(
    () => getDatesBetween(startAndEndDate[0], startAndEndDate[1]),
    [startAndEndDate]
  );

  let chartDataNew = calculateStats(age, gender, arrayOfDates);

  return (
    <main>
      <div className="w-full text-2xl my-4 px-4">
        Hi there, Data visualization goes here {age} {gender}
      </div>
      <div className="flex p-4 justify-start items-center flex-wrap ">
        <Selector label="Age" filterParams={ageFilter} onChangeFunc={setAge} />
        <Selector
          label="Gender"
          filterParams={genderFilter}
          onChangeFunc={setGender}
        />
        <Datepicker setStartandEndDate={setStartandEndDate} />
      </div>
      <div className="flex justify-center items-center p-4 mt-12">
        <div className="w-[600px]">
          <HorizontalChart
            yAxisKeyName="featureName"
            xAxisKeyName="value"
            chartData={chartDataNew.chartData}
          />
        </div>
      </div>
    </main>
  );
}
