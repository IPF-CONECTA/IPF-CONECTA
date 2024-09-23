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
export const getDate = (dt) => {
    let date = DateTime.fromISO(dt);
    return date.toFormat('dd LLL yyyy, HH:mm')
}