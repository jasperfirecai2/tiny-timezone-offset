export function getTimezoneOffset(date, destinationTimezoneName) {
    const offSetFormatter = new Intl.DateTimeFormat("nl", {hour:"numeric", timeZoneName:"shortOffset", timeZone: destinationTimezoneName});
    const offsetString = offSetFormatter.format(date).split("GMT")[1];
    if (offsetString.includes(":")) {
        const splitString = offsetString.split(":");
        const hourOffset = parseInt(splitString[0]) * -1;
        const minuteOffset = parseInt(splitString[1]);
        let totalOffset = 0;
        // note: there exists currently no timezone that has a minute offset but no hour offset
        // if one were to come into existence, a new case needs to be created
        if (hourOffset > 0) {
          totalOffset = hourOffset * 60 + minuteOffset;
        } else if (hourOffset < 0) {
          totalOffset = hourOffset * 60 - minuteOffset;
        }
      return {hourOffset, minuteOffset: minuteOffset * -1, totalOffset};
    }
    const hourOffset = parseInt(offsetString);
    return {hourOffset, minuteOffset: 0, totalOffset: hourOffset * 60};
}