import moment from "moment";

export const FormatDate = (timestamp) => {
  return new Date(timestamp);
};

export const formatDateForText = (timestamp) => {
  if (!timestamp) return null;
  return moment(timestamp).format('ll');
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  console.log(timeString);
  return timeString;
};

// ✅ Corrected getDatesRange
export const getDatesRange = (startdate, endDate) => {
  const start = moment(new Date(startdate), 'MM/DD/YYYY');
  const end = moment(new Date(endDate), 'MM/DD/YYYY');

  const dates = [];

  while (start.isSameOrBefore(end)) {
    dates.push(start.format('MM/DD/YYYY'));  // use push
    start.add(1, 'days');
  }

  return dates;
};

// ✅ Corrected GetDateRangeToDisplay
export const GetDateRangeToDisplay = () => {
  const dateList = [];

  for (let i = 0; i <= 7; i++) {
    dateList.push({
      date: moment().add(i, 'days').format('DD'),           // 27
      day: moment().add(i, 'days').format('dd'),            // Tu
      formattedDate: moment().add(i, 'days').format('L')    // 06/27/2025
    });
  }

  return dateList;
};
