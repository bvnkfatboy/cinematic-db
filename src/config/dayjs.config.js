import dayjs from 'dayjs';
import localeTh from 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
// import localeEn from "dayjs/locale/en";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(buddhistEra);
dayjs.extend(updateLocale);
dayjs.extend(quarterOfYear);
dayjs.locale(
  {
    ...localeTh,
    formats: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/BBBB',
      LL: 'D MMMM BBBB',
      LLL: 'D MMMM BBBB เวลา H:mm',
      LLLL: 'วันddddที่ D MMMM BBBB เวลา H:mm',
    },
  },
  null,
  true,
);
