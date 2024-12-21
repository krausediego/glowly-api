import { formatInTimeZone } from 'date-fns-tz';

export const formatDateTz = (date: string | Date): string => {
  return formatInTimeZone(date, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
};
