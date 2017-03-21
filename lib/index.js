const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment')

const DIR = path.resolve(__dirname, '../logs/')

if (!fs.existsSync(DIR)) fs.mkdirSync(DIR)

// get root dir name
let NAME = path.dirname(require.main.filename).split(path.sep).pop()

const stream = fs.createWriteStream(DIR + `/${NAME}.log`, {
	flags: 'a'
})

const fsLog = (type, scope, msg) => {
	msg = chalk.stripColor(msg)
	stream.write(`(${moment().format('DD-MM-YYYY HH:MM')}) ` +
	`[${type.toUpperCase()}] [${scope}] ${msg}\n`)
}

stream.write('\n') // a cute little new line to separate old logs with new logs

const levels = {}
const arr = [
	['error', 'red'],
	['fatal', 'bgRed'],
	['info', 'blue'],
	['success', 'green'],
	['warn', 'yellow'],
	['trace', 'white']
]

for (const level of arr) {
	const name = level[0]
	const color = level[1]
	levels[name] = (scope, msg) => {
		console.log(chalk.bold[color](scope.toLowerCase()) + ' ' + msg)
		fsLog(name, scope, msg)
	}
}

const utils = {
	chalk: chalk,
	// short for emphasize
	e: (msg) => {
		return chalk.bold(msg)
	},
	inspect: (object) => {
		console.dir(object, { color: true })
	}
}

module.exports = (msg) => {
	const n = process.env.NODE_ENV || ''
	if (n.toLowerCase() !== 'production')
		console.log(chalk.bgBlack(chalk.bold('debug') + ' ' + msg))
}

module.exports = Object.assign(module.exports, levels, utils)
