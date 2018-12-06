const { readFileSync, writeFileSync } = require('fs')
const { format } = require('date-fns')
const { resolve } = require('path')
const { EOL } = require('os')

const convert = require('./helpers/dif')

const ENCODING = 'utf8'

const file = resolve(process.argv[2])
const buffer = readFileSync(file, ENCODING).split(EOL)
const data = convert(buffer)

writeFileSync(
  resolve(
    process.cwd(),
    `Revolut-Statement-${format(new Date(), 'DD-MM-YYY')}.qif`,
  ),
  ['!Type:Bank'].concat(data).join(EOL),
  { encoding: ENCODING },
)
