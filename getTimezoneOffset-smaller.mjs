export function getTimezoneOffset(date, destinationTimezoneName) {
  const offsetString = new Intl.DateTimeFormat("nl", {hour:"numeric", timeZoneName:"shortOffset", timeZone: destinationTimezoneName}).format(date).split("GMT")[1];
  const splitString = offsetString.split(":");
  const hourOffset = parseInt(splitString[0]);
  const minuteOffset = parseInt(splitString[1] ?? 0);
  return {hourOffset, minuteOffset, totalOffset: hourOffset * 60 + minuteOffset};
}