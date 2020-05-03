import moment from 'moment'
import {formatNumberK, calculatePoints, getTimeFromNow} from '../../src/utils/formatter'

describe('format numbers if thousands needed', () => {
  it('less than a thousand', () => {
    expect(formatNumberK(5)).toEqual('5')
  })
  it('equals than a thousand', () => {
    expect(formatNumberK(1000)).toEqual('1.0k')
  })
  it('greater than a thousand', () => {
    expect(formatNumberK(994732)).toEqual('994.7k')
  })

  it('calculates points with up and down', () => {
    expect(calculatePoints(12300, 897)).toEqual('11.4k')
  })
  it('calculates points with up only', () => {
    expect(calculatePoints(12300)).toEqual('12.3k')
  })
  it('calculates small numbers of points', () => {
    expect(calculatePoints(10, 3)).toEqual('7')
  })
  
})

describe('get the time from post to now', () => {
  //minutes
  it('gets a number in minutes less than 60', () => {
    const minutesAgo  = moment().subtract(7, 'minutes')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('7 minutes ago')
  })
  it('gets 1 minute', () => {
    const minutesAgo  = moment().subtract(1, 'minutes')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('1 minute ago')
  })
  it('gets a number in minutes near 60 ', () => {
    const minutesAgo  = moment().subtract(59, 'minutes')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('59 minutes ago')
  })
  // hours
  it('gets a number in hours near 60 minutes', () => {
    const minutesAgo  = moment().subtract(60, 'minutes')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('1 hour ago')
  })
  it('gets a number in hours near 60 minutes', () => {
    const minutesAgo  = moment().subtract(65, 'minutes')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('1 hour ago')
  })
  it('gets a number in hours ', () => {
    const minutesAgo  = moment().subtract(5, 'hours')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('5 hours ago')
  })
  it('gets a number in hours near 24 ', () => {
    const minutesAgo  = moment().subtract(23, 'hours')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('23 hours ago')
  })
  //days
  it('gets a number in days near 24 hours', () => {
    const minutesAgo  = moment().subtract(24, 'hours')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('1 day ago')
  })
  it('gets a number in days near 24 hours', () => {
    const minutesAgo  = moment().subtract(27, 'hours')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('1 day ago')
  })
  it('gets a number in days ', () => {
    const minutesAgo  = moment().subtract(8, 'days')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('8 days ago')
  })
  it('gets a number in days near 365', () => {
    const minutesAgo  = moment().subtract(364, 'days')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('364 days ago')
  })
  // years
  it('gets a number in days near 365 days ', () => {
    const minutesAgo  = moment().subtract(365, 'days')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('365 days ago')
  })
  it('gets a number in years near 365 days ', () => {
    const minutesAgo  = moment().subtract(366, 'days')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('1 year ago')
  })
  it('gets a number in years', () => {
    const minutesAgo  = moment().subtract(2, 'years')
    minutesAgo.valueOf()
    expect(getTimeFromNow(minutesAgo.valueOf())).toEqual('2 years ago')
  })

})