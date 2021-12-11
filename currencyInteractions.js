const Config = require('./config.json');
const CommonFunctions = require('./commonFunctions.js');

module.exports = {
  modify: async function (Database, Amount, TargetID) {
    try {
      const NewUser = await Database.create({
        user: TargetID,
        balance: Amount,
      });

      return 0; //Created database entry
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const RecievingUser = await Database.findOne({ where: { user: TargetID } });

        let newBalance = CommonFunctions.betterRound(RecievingUser.balance + Amount, 9);

        const AffectedEntries = await Database.update({ balance: newBalance }, { where: { user: TargetID } });

        if (AffectedEntries > 0) {
          return 1; //Updated entry.
        }

        return 2; //Other error, didn't update.
      }

      return 3; //Other error, didn't do anything.
    }
  },
  transfer: async function (Database, Amount, OperatorID, TargetID) {
    if (Amount < 0.01) { return 1 }; //Not enought to transfer
    if (OperatorID == TargetID) { return 2 }; //Transfer to self
    let operatorBalance = await this.find(Database, OperatorID);
    if (!operatorBalance) { return 3; } //Balance of operator non-existant
    if (operatorBalance < Amount) { return 4; } //Trying to transfer more than operator has
    await this.modify(Database, -Amount, OperatorID); //Subtract from operator
    await this.modify(Database, Amount - CommonFunctions.betterRound(Amount / 1.03, 5), Config.clientID); //Send taxes to bot
    Amount = CommonFunctions.betterRound(Amount / 1.03, 5); //Remove currency via taxes
    await this.modify(Database, Amount, TargetID); //Send currency to target
    return 0; //Finished
  },
  find: async function (Database, TargetID) {
    const FoundEntry = await Database.findOne({ where: { user: TargetID } });
    if (FoundEntry) { return FoundEntry.balance; } else { return false; }
  },
  daily: async function (Database, OperatorID) {
    //Config.currencyMultiplier
  }
}