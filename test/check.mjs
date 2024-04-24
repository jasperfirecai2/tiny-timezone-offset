import { getTimezoneOffset as getANSIOffset } from "../dist/ansi.js";
import { getTimezoneOffset as getSourceOffset } from "../src/main.js";
import { getTimezoneOffset } from "../dist/main.js";

const timezone = "Pacific/Chatham";
const now = new Date();
console.log("Timezone: ", timezone)
console.log("format |", "hours |", "minutes |", "total")
const {hourOffset, minuteOffset, totalOffset} = getTimezoneOffset(now, timezone);
console.log("POSIX", hourOffset, minuteOffset, totalOffset);

const {hourOffset: sourceHours, minuteOffset: sourceMinutes, totalOffset: sourceTotal} = getSourceOffset(now, timezone);
console.log("POSIX - source", sourceHours, sourceMinutes, sourceTotal);

const {hourOffset: ANSIHours, minuteOffset: ANSIMinutes, totalOffset: ANSITotal} = getANSIOffset(now, timezone);
console.log("ANSI", ANSIHours, ANSIMinutes, ANSITotal);

console.log("refer to https://en.wikipedia.org/wiki/List_of_tz_database_time_zones to check")