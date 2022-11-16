import Sequelize from 'sequelize';
import User from './models/User.js';
import { Round } from '../../helpers/utils/index.js';

export default class Database {
  constructor(client) {
    this.client = client;
    this.sequelize = new Sequelize({
      host: 'localhost',
      dialect: 'sqlite',
      logging: false,
      storage: './src/providers/sqlite/database.sqlite',
    });

    this.users = User(this.sequelize);
  }

  async modify(user, amount) {
    try {
      const _user = await this.users.findOne({ where: { user } });
      if(!_user) return await this.users.create({ user, balance: amount });
      
      _user.balance = Round(_user.balance + amount, 9);
      _user.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async setBalance(user, amount) {
    try {
      const _user = await this.users.findOne({ where: { user } });
      if(!_user) return await this.users.create({ user, balance: amount });
      
      _user.balance = Round(amount, 9);
      _user.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  // too lazy to rewrite that function but it works for now, might be rewrote in the next few days.
  async transfer(operator, target, amount) {
    try {
      if (amount < 0.01) throw new Error('Amount is too low!');
      if (operator === target) throw new Error('Transfer to self!');
      let _operator = await this.users.findOne({ where: { user: operator } });
      if (!_operator.balance) throw new Error('Balance does not exist!');
      if (_operator.balance < amount) throw new Error('Not enough money to transfer!');
      await this.modify(operator, -amount); //Subtract from operator
      await this.modify(this.client.user.id, amount - Round(amount / 1.03, 5)); //Send taxes to bot
      amount = Round(amount / 1.03, 5); //Remove currency via taxes
      await this.modify(target, amount); 
    } catch (e) {
      throw new Error(e);
    }
  }
}