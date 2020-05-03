import moment from 'moment'

export const formatNumberK = (ups: number): string => {
  return ups < 1000 ? `${ups}` : (ups/1000).toFixed(1) + 'k'
}

export const calculatePoints = (ups: number, downs?: number): string => {
  if (downs) {
    return formatNumberK(ups - downs)
  }
  return formatNumberK(ups)
}

export const getTimeFromNow = (utc: number): string => {
  const dateTime = moment(utc)
  const now = moment()
  const minutes = now.diff(dateTime, 'minutes')
  if (minutes < 60) {
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`
  }
  const hours = now.diff(dateTime, 'hours')
  if (hours < 24) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`
  }
  const days = now.diff(dateTime, 'days')
  if (days <= 365) { //365 days is apparently 0 years from now in moment
    return days === 1 ? `${days} day ago` : `${days} days ago`
  }
  const years = now.diff(dateTime, 'years')
  return years === 1 ? `${years} year ago` : `${years} years ago`
}