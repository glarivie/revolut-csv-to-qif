const isEmpty = require('lodash.isempty')
const get = require('lodash.get')
const { EOL } = require('os')

const handleTransaction = require('./number')
const handleDate = require('./date')

const convert = buffer => {
  const columns = buffer[0].split(';')

  const data = buffer
    .slice(1)
    .filter(line => !isEmpty(line))
    .map(line =>
      line
        .split(';')
        .reduce((acc, curr, index) => ({
          ...acc,
          [columns[index].trim()]: curr.trim(),
        }), {}),
    )
    .map(operation => {
      const date = handleDate(operation)
      const transaction = handleTransaction(operation)
      const label = get(operation, 'Reference', '')

      return [
        `D${date}`,
        `T${transaction}`,
        `P${label}`,
        '^',
      ].join(EOL)
    })

  return data
}

module.exports = convert
