const { readFileSync } = require('fs')
const { resolve } = require('path')
const { EOL } = require('os')

const convert = require('../src/helpers/dif')

const { FILE } = process.env
const ENCODING = 'utf8'

describe('Convert CSV to DIF', () => {
  test('Should parsed correctly', () => {
    const buffer = readFileSync(resolve(FILE), ENCODING).split(EOL)
    const data = convert(buffer)

    data.forEach(operation => {
      const [date, transaction, label, eot] = operation.split(EOL)

      expect(date).toMatch(/D[0-3]\d\/[0-1]\d\/20[0-2][1-9]/)
      expect(transaction).toMatch(/T-?\d+.\d{2}/)
      expect(label).toMatch(/P.*/)
      expect(eot).toMatch(/\^/)
    })
  })
})
