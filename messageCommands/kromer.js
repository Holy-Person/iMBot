const commonFunctions = require('../commonFunctions.js');
const sqlite = require('sqlite3');
module.exports = {
  method: function (message, Bot, args) {

    if (args.length == 0) return message.channel.send('Invalid command!');
    let db = new sqlite.Database('kromer.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

    const user = commonFunctions.getUserFromMention(args[1], Bot); // gets user ID from ping
    if (!user) return message.channel.send(`Undefined user.`);

    const amount = parseInt(args[2]);
    if (isNaN(amount)) return message.channel.send('Invalid amount!');

    switch (args[0]) {
      case 'add':
        return message.channel.send(modify(db, message, user.id, amount));
      case 'remove':
        return message.channel.send(modify(db, message, user.id, amount * -1));
      default:
        return message.channel.send('Invalid command!')
    }

    // let reply;

    // if (args.length < 2) {
    //   return message.channel.send(
    //     "Usage is: `iM!kromer [add/remove] [user ping] [amount of kromer]`"
    //   );
    // }

    // const user = commonFunctions.getUserFromMention(args[1], Bot); // gets user ID from ping
    // if(!user) return message.channel.send(`Undefined user.`);
    // // we save the ID instead of user for the database

    // const amount = parseFloat(args[2]);

    // if (isNaN(amount))
    //   return message.channel.send(
    //     "https://tenor.com/view/oomfie-twitter-mya-birdy-moots-gif-21657254"
    //   );
    // // die oomfie gif

    // if (args[0] === "add") {
    //   reply = `Added ${amount} kromer to ${user}`;
    // } else if (args[0] === "remove") {
    //   reply = `Removed ${amount} kromer from ${user}`;
    // } else {
    //   return message.channel.send("invalid command");
    //   // here we return directly to stop
    //   // execution if the command is bad
    // }

    // return message.channel.send(reply);
  },
};

function modify(db, message, userid, amount) {
  if (!process.env.ADMIN_USERS.split(",").includes(message.author.id)) {
    return `Sorry ${message.author.username}, you're not allowed to use that command.`;
  }

  let currentAmount;


  // this whole mess is trying to read the kromer amount from the given userid,
  // add the parameter amount on top of it, and write it back from the given id
  // and ofcourse, it 🌈 does not work!!!🌈

  // databases are hell.

  db.get(`SELECT * FROM kromer WHERE userid = ?`, [userid], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if (row === undefined) {
      let insertdata = db.prepare(`INSERT INTO kromer VALUES(?,?)`);
      insertdata.run(userid, amount);
      db.close();
      return;
    }
    else currentAmount = row.amount;
  })

  let query = db.prepare(`UPDATE kromer SET amount = ? WHERE userid = ?`);
  query.run(currentAmount + amount, userid);
  db.close();
}