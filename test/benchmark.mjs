import {Suite} from 'bench-node';
import getTimezoneOffset from 'get-timezone-offset';
import { getTimezoneOffset as getSmallerTimezoneOffset } from '../dist/main.js';
import { getTimezoneOffset as getANSITImezoneOffset } from '../dist/ansi.js';
const suite = new Suite();

suite.add('using regex magic', {minTime: 1, maxTime: 5}, function () {
    const now = new Date();
    const totalOffset = getTimezoneOffset('Europe/Amsterdam', now);
    return totalOffset;
})

suite.add('using string splitting', {minTime: 1, maxTime: 5}, function () {
    const now = new Date();
    const {totalOffset} = getSmallerTimezoneOffset(now, "Europe/Amsterdam");
    return totalOffset;
})


suite.add('using string splitting in ANSI output format', {minTime: 1, maxTime: 5}, function () {
    const now = new Date();
    const {totalOffset} = getANSITImezoneOffset(now, "Europe/Amsterdam");
    return totalOffset;
})

const now = new Date();
const {totalOffset} = getSmallerTimezoneOffset(now, "Europe/Amsterdam");
const {totalOffset: ansiTotalOffset} = getANSITImezoneOffset(now, "Europe/Amsterdam");
console.log(`regex result: ${getTimezoneOffset('Europe/Amsterdam', now)}`, `string split result: ${totalOffset}`, `ansi string split result: ${ansiTotalOffset}`);

suite.run();