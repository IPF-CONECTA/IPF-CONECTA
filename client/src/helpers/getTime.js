import moment from 'moment';
import 'moment/locale/es';
import { DateTime, Settings } from "luxon";
Settings.defaultLocale = 'es';

moment.updateLocale('es', {
    relativeTime: {
        future: 'en %s',
        past: '%s',
        s: 'unos segundos',
        m: 'un minuto',
        mm: '%dm',
        h: 'una hora',
        hh: '%dh',
        d: 'ayer',
        dd: '%dd',
        M: 'un mes',
        MM: '%dm',
        y: 'un año',
        yy: '%da'
    }
});

export const getTime = (date) => {
    return moment(date).fromNow();
}
export const getDateWithHour = (dt) => {
    let date = DateTime.fromISO(dt);
    return date.toFormat('dd LLL yyyy, HH:mm')
}

export const getHour = (dt) => {
    let date = DateTime.fromISO(dt);
    return date.toFormat('HH:mm');
}
export const getDateMonth = (dt) => {
    let date = DateTime.fromISO(dt);
    return date.toFormat('LLL. yyyy')
}

export const getFullDate = (dt) => {
    let date = DateTime.fromISO(dt);
    return date.toFormat('dd LLL yyyy')
}

export const getTimeQuantity = (startDate, endDate) => {
    let start = DateTime.fromISO(startDate);
    endDate = endDate ? endDate : DateTime.now().toISODate();
    let end = DateTime.fromISO(endDate);
    let diff = end.diff(start, ['years', 'months', 'days']);
    let years = diff.years;
    let months = diff.months;
    let result = '';
    if (years > 0) {
        result += years + ' años';
    }
    if (months > 0) {
        result += ' y ' + months + ' meses';
    }

    return result;
}