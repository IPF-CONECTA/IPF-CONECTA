import moment from 'moment';
import 'moment/locale/es';

moment.updateLocale('es', {
    relativeTime: {
        future: 'en %s',
        past: '%s',
        s: 'unos segundos',
        m: 'un minuto',
        mm: '%d m',
        h: 'una hora',
        hh: '%d h',
        d: 'ayer',
        dd: '%d d',
        M: 'un mes',
        MM: '%d m',
        y: 'un año',
        yy: '%d a'
    }
});

export const getTime = (date) => {
    return moment(date).fromNow();
}