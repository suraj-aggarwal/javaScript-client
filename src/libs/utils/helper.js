import * as moment from 'moment';

export const getDateFormat = (value) => (
  moment(value).format('dddd,MMMM Do YYYY, h:mm:ss a')
);
