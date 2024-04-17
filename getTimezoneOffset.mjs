export function getTimezoneOffset(date, destinationTimezoneName) {
    const offSetFormatter = new Intl.DateTimeFormat("nl", {hour:"numeric", timeZoneName:"shortOffset", timeZone: destinationTimezoneName});
    const offsetString = offSetFormatter.format(date).split("GMT")[1];
    if (offsetString.includes(":")) {
        const splitString = offsetString.split(":");
        const hourOffset = parseInt(splitString[0]);
        const minuteOffset = parseInt(splitString[1]);
      return {hourOffset, minuteOffset, totalOffset: hourOffset * 60 + (minuteOffset * (hourOffset > 0 ? 1 : -1))};
    }
    const hourOffset = parseInt(offsetString);
    return {hourOffset, minuteOffset: 0, totalOffset: hourOffset * 60};
}