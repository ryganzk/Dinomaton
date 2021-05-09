const chalk = require("chalk");
const moment = require("moment");

//Logs the type of execution performed by the bot(default type: log)
exports.log = (content, type = 'log') => {
    const timestamp = `[${moment().format("DD-MM-YYYY H:m:s")}]:`;
    switch (type) {
        case "log": {
            return console.log(`${timestamp} ${chalk.gray(type.toUpperCase())} ${content}`);
        }
        case "cmd": {
            return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} ${content}`);
        }
        case "warn": {
            return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content}`);
        }
        case "error": {
            return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content}`);
        }
        case "event": {
            return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content}`);
        }
        case 'ready': {
            return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
        }
        default: throw new TypeError("UNACCEPTED LOGGER TYPE: FIX MY CODE ADMIN!")
    }
}

exports.cmd = (...args) => this.log(...args, 'cmd');

exports.warn = (...args) => this.log(...args, 'warn');

exports.error = (...args) => this.log(...args, 'error');

exports.event = (...args) => this.log(...args, 'event');

exports.ready = (...args) => this.log(...args, 'ready');
