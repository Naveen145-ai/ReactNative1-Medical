import moment from "moment"

export const FormatDate = (timestamp) => {
    return new Date(timestamp)
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
