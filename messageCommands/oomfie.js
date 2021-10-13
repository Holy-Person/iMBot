module.exports = {
  method: function (message, Bot) {
    // const variants = ['oomfie', 'coomfie', 'comfie'];
    if (message.content.includes('mfie')) //better than trying a bunch of variants like above
    {
      let reply;
      if (Math.floor((Math.random() * 20) + 1) == 2) // 1 in 20 chance
        reply = 'coomfie'
      else 
        reply = 'oomfie'

      return message.channel.send(`so true ${reply}`);
    }

    return;
  }
};