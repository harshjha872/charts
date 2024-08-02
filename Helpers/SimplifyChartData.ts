import * as interfaces from "./interfaces/interface";
;

export default function SimplifyChartData(obj: interfaces.inputData): interfaces.featureData {
    let temp: any = {...obj}
    let { Day, Gender, Age } = obj
    delete temp.Age 
    delete temp.Day 
    delete temp.Gender

    let keys = Object.keys(temp)

    let finalChartData = [] as Array<interfaces.chartData>

    keys.forEach((feature: string) => {
        let newObj = {} as interfaces.chartData;
        newObj.featureName = feature
        //@ts-ignore
        newObj.value = obj[feature]
        finalChartData.push(newObj)
    })

    return {
        Day, Gender, Age, chartData: [...finalChartData]
    }
}