const Config = require('./config.json');
const commonFunctions = require('./commonFunctions.js');

module.exports = {
  give: async function (Database, Amount, OperatorID, TargetID) {
    try {
      const NewUser = await Database.create({
        user: TargetID,
        balance: Amount,
      });

<<<<<<< Updated upstream
      return "create"; //Created database entry
=======
      return 0; //Created database entry
>>>>>>> Stashed changes
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const recievingUser = await Database.findOne({ where: { user: TargetID } });

        let newBalance = recievingUser.balance + Amount;

        const affectedEntries = await Database.update({ balance: newBalance }, { where: { user: TargetID } });

        if (affectedEntries > 0) {
<<<<<<< Updated upstream
          return "update"; //Updated entry.
=======
          return 1; //Updated entry.
>>>>>>> Stashed changes
        }

        return 2; //Other error, didn't update.
      }

      return 3; //Other error, didn't do anything.
    }
  },
<<<<<<< Updated upstream
  remove: async function (Database, Amount, Operator, Target) {
    //empty
  },
  transfer: async function (Database, Amount, Operator, Target) {
=======
  remove: async function (Database, Amount, OperatorID, TargetID) {
    //empty
  },
  transfer: async function (Database, Amount, OperatorID, TargetID) {
>>>>>>> Stashed changes
    //empty
  }
}