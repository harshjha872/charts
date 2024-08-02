export interface inputData {
    Day: string;
    Age: string;
    Gender: string;
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
    F: Number
}

export interface featureData {
    Day: string,
    Age: string,
    Gender: string
    chartData: Array<chartData>
}

export interface chartData {
    featureName: string,
    value: Number
}