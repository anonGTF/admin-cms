import { format, isToday, isYesterday, parse } from 'date-fns';

export const formatDate = (date: Date, strFormat: string, onToday?: string, onYesterday?: string): string => {
  if (onToday !== undefined && isToday(date)) {
    return format(date, onToday)
  } else if (onYesterday !== undefined && isYesterday(date)) {
    return format(date, onYesterday)
  } else {
    return format(date, strFormat)
  }
}

export const parseDate = (dateStr: string, strFormat: string): Date => parse(dateStr, strFormat, new Date())

export const formatRupiah = (value: number): string => 
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value)

export const truncateString = (value: string, maxLength: number): string => {
  let truncatedString = value.slice(0, maxLength);
  if (value.length > maxLength) {
    truncatedString += "...";
  }
  return truncatedString
}

export const getTitledString = (input: string): string => {
  const words = input.split("-")
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const result = capitalizedWords.join(" ")
  return result
}

export const toHypenString = (input: string): string =>  input.toLowerCase().replaceAll(" ", "-")