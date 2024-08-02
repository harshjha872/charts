import moment from "moment";

export default function getDatesBetween(startDate: string, endDate: string): Array<string> {
    const dates = [];
    let currentDate = moment(startDate);
    let endDateMoment = moment(endDate);

    while (currentDate <= endDateMoment) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
    }

    return dates;
}
