const Config = require('./config.json');
const commonFunctions = require('./commonFunctions.js');

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
        const recievingUser = await Database.findOne({ where: { user: TargetID } });

        let newBalance = commonFunctions.betterRound(recievingUser.balance + Amount, 9);

        const affectedEntries = await Database.update({ balance: newBalance }, { where: { user: TargetID } });

        if (affectedEntries > 0) {
          return 1; //Updated entry.
        }

        return 2; //Other error, didn't update.
      }

      return 3; //Other error, didn't do anything.
    }
  },
  transfer: async function (Database, Amount, OperatorID, TargetID) {
    if (Amount < 0.01) { return 1 };
    if (OperatorID == TargetID) { return 2 };
    let operatorBalance = await this.find(Database, OperatorID);
    if (!operatorBalance) { return 3; }
    if (operatorBalance < Amount) { return 4; }
    await this.modify(Database, -Amount, OperatorID);
    Amount = commonFunctions.betterRound(Amount / 1.03, 5);
    await this.modify(Database, Amount, TargetID);
    return 0;
  },
  find: async function (Database, TargetID) {
    const FoundEntry = await Database.findOne({ where: { user: TargetID } });
    if (FoundEntry) { return FoundEntry.balance; } else { return false; }
  },
  daily: async function (Database, OperatorID) {
    //Config.currencyMultiplier
  }
}