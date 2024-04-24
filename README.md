# tiny-timezone-offset

Get the timezone offset from UTC to desired timezone in js.
Tiny (~500 Bytes) and no dependencies[^1]

See also [get-timezone-offset](https://www.npmjs.com/package/get-timezone-offset) by [mobz](https://www.npmjs.com/~mobz) (not affiliated).

## Usage

### Default

```js
    import { getTimezoneOffset } from 'tiny-timezone-offset';
    const now = new Date(); 
    // Should be the date you wish to check the offset for. If this date is during DST, it will respect it.
    const { houroffset, minuteOffset, totalOffset } = getTimezoneOffset(now, "Europe/Amsterdam");
    // During daylight savings time, this should return { -2, 0, -120 }

```

This is in line with builtin Date.prototype.getTimezoneOffset() which gives you the timezone offset in 'minutes needed to add to return to UTC.'
Date.prototype.getTimezoneOffset() does this for the machine's local timezone only.

### Using the relative offset based on ISO 8601/ANSI standards

```js
    import { getTimezoneOffset } from 'tiny-timezone-offset/ANSI';
    const now = new Date(); 
    // Should be the date you wish to check the offset for. If this date is during DST, it will respect it.
    const { houroffset, minuteOffset, totalOffset } = getTimezoneOffset(now, "Europe/Amsterdam");
    // During daylight savings time, this should return { 2, 0, 120 }

```

This returns the timezone offset in 'minutes past UTC'.

### Differences

With the default method, one should ADD the offset to a UTC date to get the timezoned date in UTC.

With the ANSI method, one should SUBTRACT the offset from a UTC date to get the timezoned date in UTC.

i.e. a time of 10:00 in a timezone 2 hours ahead of UTC will be 08:00 in UTC.

If the offset given is -120 mins (like the default method): 10:00 + (-120 minutes) = 08:00. if the offset given is 120 mins (like the ANSI method) 10:00 - (120 minutes) = 08:00.

## Troubleshooting

[^1]: If you are running getTimezoneOffset on the server and using alpine or other ultra minimal docker image without a timezone database, you need to install the `tzdata` package. Most docker images, including the ["slim" images publishd by node](https://hub.docker.com/_/node/tags?name=slim) already include `tzdata`.

Results for locations that experience daylight saving change throughout the year
Results for locations that [https://data.iana.org/time-zones/tzdb/NEWS](have moved timezone) may vary as the tz database is modified. This sometimes includes retrospective changes.

## How it works

getTimezoneOffset works by using the global `Intl` object, using the tz database of the underlying operating system. By formatting a date to a string a certain way with a given desired timezone name, it can find the timezone offset in the string and return it numerically.

Internationalization was introduced in 2012; Engine support is tracked [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#browser_compatibility), but boils down to:

* Node: v4+
* Bun, Deno and other javascript runtimes
* All browsers

## Why use this over get-timezone-offset ?

* Flexibility
  * Being able to get only the hour or only the minute offset can reduce complexity.
* ANSI version available
  * If your code is more logical or more readable with a positive output for timezones ahead of UTC, this package might help.
* Code readability
  * In my personal opinion, the source code of get-timezone-offset is not very clear to read.
* File size
  * Both repositories are already incredibly small, but tiny-timezone-offset is almost 400 Bytes smaller!
* Written for ESM
  * ESM is intended to replace CommonJS in the js ecosystem. This package is fully written in ESM and ready to be used with it

## When NOT to use this over get-timezone-offset ?

* Backwards compatibility
  * get-timezone-offset was written _and tested_ to work in any browser and node versions of 4 and above. I have not written tiny-timezone-offset with that in mind. Please check if get-timezone-offset can fulfill your needs if backwards compat is a big deal to your project.
* Performance
  * In a majority of my own benchmarks, get-timezone-offset was about ~10% faster than tiny-timezone-offset. I could possibly improve performance by using regular expressions, but as it stands, I use normal string operations. Please run the benchmark yourself to compare and pick what's best for you if performance matters.
