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

const fsLog = (scope, msg) => {
	msg = chalk.stripColor(msg)
	stream.write(`(${moment().format('DD-MM-YYYY HH:MM')}) [${scope}] ${msg}\n`)
}

module.exports = {
	chalk: chalk,
	debug: (msg) => {
		console.log(chalk.bold(scope.toLowerCase()) + ' ' + msg)
	},
	// short for emphasize
	e: (msg) => {
		return chalk.bold(msg)
	},
	error: (scope, msg) => {
		console.log(chalk.bold.red(scope.toLowerCase()) + ' ' + msg)
		fsLog(scope, msg)
	},
	fatal: (scope, msg) => {
		console.log(chalk.bold.white.bgRed(scope.toLowerCase()) + ' ' + msg)
		fsLog(scope, msg)
	},
	info: (scope, msg) => {
		console.log(chalk.bold.blue(scope.toLowerCase()) + ' ' + msg)
		fsLog(scope, msg)
	},
	inspect: (object) => {
		console.dir(object, { color: true })
	},
	success: (scope, msg) => {
		console.log(chalk.bold.green(scope.toLowerCase()) + ' ' + msg)
		fsLog(scope, msg)
	}
}
