/* eslint-disable no-console */

import chalk from 'chalk';
import { inspect } from 'util';

export default class Logger {
  static get date() {
    return `[${this.format(new Date(Date.now()))}]`;
  }

  static dateTimePad(value, digits) {
    let number = value;
    while (number.toString().length < digits) {
      number = '0' + number;
    }
    return number;
  }

  static format(time) {
    return (
      time.getFullYear() +
      '-' +
      this.dateTimePad(time.getMonth() + 1, 2) +
      '-' +
      this.dateTimePad(time.getDate(), 2) +
      ' ' +
      this.dateTimePad(time.getHours(), 2) +
      ':' +
      this.dateTimePad(time.getMinutes(), 2) +
      ':' +
      this.dateTimePad(time.getSeconds(), 2) +
      '.' +
      this.dateTimePad(time.getMilliseconds(), 3)
    );
  }

  static _formMessage(...body) {
    const data = [];
    for (const message of body) {
      if (typeof message === 'object') data.push(inspect(message));
      else data.push(message);
    }
    return data.join(' ');
  }

  static info(...body) {
    console.log(`${this.date} ${chalk.bold.white('[ INFO ] ') + this._formMessage(...body)}`);
  }

  static success(title, ...body) {
    console.log(`${this.date} ${chalk.bold.green(`[ SUCCESS ] ${title} `) + this._formMessage(...body)}`);
  }

  static warn(title, ...body) {
    console.warn(`${this.date} ${chalk.bold.yellow(`[ WARN ] ${title} `) + this._formMessage(...body)}`);
  }

  static error(title, ...body) {
    console.error(
      `${this.date} ${chalk.bold.red(title ? `[ ERROR ] ${title} ` : '[ ERROR ] ') + this._formMessage(...body)}`
    );
  }

  static errorInteraction(interaction, ...body) {
    console.error(
      `${this.date} ${chalk.bold.red(`[ INTERACTION ] [ ${interaction.help.name} ] `) + this._formMessage(...body)}`
    );
  }

  static debug(...body) {
    console.debug(`${this.date} ${chalk.bold.magenta('[ DEBUG ] ') + this._formMessage(...body)}`);
  }

  static interaction(interaction, ...body) {
    console.log(
      `${this.date} ${chalk.bold.green(`[ INTERACTION ] [ ${interaction.help.name} ] `) + this._formMessage(...body)}`
    );
  }

  static ready(...body) {
    console.log(`${this.date} ${chalk.bold.green('[ READY ] ') + this._formMessage(...body)}`);
  }
}
