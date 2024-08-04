"use client";

import data from "@/data.json";
import HorizontalChart from "@/components/charts/HorizontalChart";
import * as interfaces from "@/Helpers/interfaces/interface";
import { useMemo, useState, useCallback, useEffect } from "react";
import Selector from "@/components/Select/Selector";
import Datepicker from "@/components/DatePicker/Datepicker";
import moment from "moment";
import getDatesBetween from "@/Helpers/getDatesBetween";
import LineChartLocal from "@/components/charts/LineChartLocal";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";

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

const calcLineData = (data: Array<interfaces.inputData>) => {
  let obj = {} as any;

  data.forEach((item) => {
    if (item.Day in obj) {
      obj[item.Day].A += +item.A;
      obj[item.Day].B += +item.B;
      obj[item.Day].C += +item.C;
      obj[item.Day].D += +item.D;
      obj[item.Day].E += +item.E;
      obj[item.Day].F += +item.F;
    } else {
      obj[item.Day] = {
        ...item,
        A: +item.A,
        B: +item.B,
        C: +item.C,
        D: +item.D,
        E: +item.E,
        F: +item.F,
      };
    }
  });

  let dates = Object.keys(obj);

  return dates.map((date) => obj[date]);
};

function deleteAllCookies() {
  deleteCookie("age");
  deleteCookie("gender");
  deleteCookie("daterange");
  deleteCookie("lineChartFeatureName");
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let ageUrl = searchParams.get("age");
  let genderUrl = searchParams.get("gender");
  let dateRangeUrl = searchParams.get("daterange");
  let lineChartFeatureNameUrl = searchParams.get("lineChartFeatureName");

  if (!ageUrl && !genderUrl && !dateRangeUrl && !lineChartFeatureNameUrl) {
    const cookies = getCookies;

    ageUrl = getCookie("age") || "";
    genderUrl = getCookie("gender") || "";
    lineChartFeatureNameUrl = getCookie("lineChartFeatureName") || "";
    dateRangeUrl = getCookie("daterange") || "";

    const params = new URLSearchParams(searchParams.toString());
    if (ageUrl) params.set("age", ageUrl.toString());
    if (genderUrl) params.set("gender", genderUrl.toString());
    if (lineChartFeatureNameUrl)
      params.set("lineChartFeatureName", lineChartFeatureNameUrl.toString());
    if (dateRangeUrl[0]) params.set("daterange", dateRangeUrl.toString());

    router.push(pathname + "?" + params.toString());
  }

  const [age, setAge] = useState(ageUrl ? ageUrl : "");
  const [gender, setGender] = useState(genderUrl ? genderUrl : "");
  const [startAndEndDate, setStartandEndDate] = useState(
    dateRangeUrl ? dateRangeUrl.split(",") : ["", ""]
  );

  const arrayOfDates: Array<string> = useMemo(
    () => getDatesBetween(startAndEndDate[0], startAndEndDate[1]),
    [startAndEndDate]
  );

  let chartDataNew = useMemo(
    () => calculateStats(age, gender, arrayOfDates),
    [age, gender, arrayOfDates]
  );

  const lineChartData = useMemo(
    () => calcLineData(chartDataNew),
    [chartDataNew]
  );

  const [featureName, setFeatureName] = useState(
    lineChartFeatureNameUrl ? lineChartFeatureNameUrl : ""
  );

  return (
    isMounted && (
      <main>
        <div className="flex p-4 justify-start items-center flex-wrap ">
          <Datepicker
            setStartandEndDate={setStartandEndDate}
            defaultValue={dateRangeUrl ? startAndEndDate : ["", ""]}
          />
          <Selector
            label="Age"
            filterParams={ageFilter}
            onChangeFunc={setAge}
            defaultValue={ageUrl ? age : ""}
          />
          <Selector
            label="Gender"
            filterParams={genderFilter}
            onChangeFunc={setGender}
            defaultValue={genderUrl ? gender : ""}
          />
          <Button
            onClick={() => {
              setAge("");
              setGender("");
              setStartandEndDate(["", ""]);
              setFeatureName("");
              deleteAllCookies();
              location.replace("/dashboard");
            }}
          >
            Reset
          </Button>
        </div>
        <div className="flex justify-center items-center p-4 mt-12">
          <div className="w-full sm:flex">
            <HorizontalChart
              yAxisKeyName="featureName"
              xAxisKeyName="value"
              chartData={chartDataNew}
              arrayOfDates={arrayOfDates}
              setFeatureName={setFeatureName}
            />

            <LineChartLocal
              xAxisKeyName="Day"
              yAxisKeyName={featureName}
              chartData={lineChartData}
            />
          </div>
        </div>
      </main>
    )
  );
}
