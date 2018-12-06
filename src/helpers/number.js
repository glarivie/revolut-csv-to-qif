const get = require('lodash.get')
const isEmpty = require('lodash.isempty')

const intlFormat = (n = '') => n.replace(',', '.')

const toNumber = str => parseFloat(intlFormat(str)).toFixed(2)

const handleTransaction = operation => {
  const paidOut = get(operation, 'Paid Out (EUR)')
  const paidIn = get(operation, 'Paid In (EUR)')

  if (isEmpty(paidOut))
    return toNumber(paidIn)

  return toNumber(`-${paidOut}`)
}

module.exports = handleTransaction
