const { parse, format } = require('date-fns')
const get = require('lodash.get')
const isEmpty = require('lodash.isempty')

const parseDate = date => {
  const today = new Date()
  const currentYear = format(today, 'YYYY')

  if (isEmpty(date))
    return today

  if (/20[0-2][1-9]/.test(date))
    return parse(date)

  return parse(`${date}, ${currentYear}`)
}


const handleDate = operation => {
  const date = get(operation, 'Completed Date', '')

  return format(parseDate(date), 'DD/MM/YYYY')
}

module.exports = handleDate
