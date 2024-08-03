"use client";

import data from "@/data.json";
import HorizontalChart from "@/components/charts/HorizontalChart";
import * as interfaces from "@/Helpers/interfaces/interface";
import { useMemo, useState, useCallback } from "react";
import Selector from "@/components/Select/Selector";
import Datepicker from "@/components/DatePicker/Datepicker";
import moment from "moment";
import getDatesBetween from "@/Helpers/getDatesBetween";
import LineChartLocal from "@/components/charts/LineChartLocal";

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
): Array<interfaces.inputData> => {
  let filteredData =
    age === "" ? parseData : parseData.filter((item) => item.Age === age);
  filteredData =
    gender === ""
      ? filteredData
      : filteredData.filter((item) => item.Gender === gender);
  filteredData =
    arrayOfDates.length === 0
      ? filteredData
      : filteredData.filter((item) => arrayOfDates.includes(item.Day));

  return filteredData;
};

export default function Dashboard() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [startAndEndDate, setStartandEndDate] = useState(["", ""] as [
    string,
    string
  ]);

  const [featureName, setFeatureName] = useState("");
  const [lineChartData, setLineChartData] = useState(
    [] as Array<interfaces.inputData>
  );

  const arrayOfDates: Array<string> = useMemo(
    () => getDatesBetween(startAndEndDate[0], startAndEndDate[1]),
    [startAndEndDate]
  );

  let chartDataNew = useMemo(
    () => calculateStats(age, gender, arrayOfDates),
    [age, gender, arrayOfDates]
  );

  const getLineChartData = useCallback(
    (lineData: Array<interfaces.inputData>, featureName: string) => {
      setFeatureName(featureName);
      setLineChartData(lineData);
    },
    []
  );

  return (
    <main>
      {/* <div className="w-full text-2xl my-4 px-4">
        Hi there, Data visualization goes here {age} {gender}
      </div> */}
      <div className="flex p-4 justify-start items-center flex-wrap ">
        <Datepicker setStartandEndDate={setStartandEndDate} />
        <Selector label="Age" filterParams={ageFilter} onChangeFunc={setAge} />
        <Selector
          label="Gender"
          filterParams={genderFilter}
          onChangeFunc={setGender}
        />
      </div>
      <div className="flex justify-center items-center p-4 mt-12">
        <div className="w-full sm:flex">
          <HorizontalChart
            yAxisKeyName="featureName"
            xAxisKeyName="value"
            chartData={chartDataNew}
            getDataForLineChart={getLineChartData}
            arrayOfDates={arrayOfDates}
          />
          {lineChartData.length > 0 && (
            <LineChartLocal
              xAxisKeyName="Day"
              yAxisKeyName={featureName}
              chartData={lineChartData}
            />
          )}
        </div>
      </div>
    </main>
  );
}
