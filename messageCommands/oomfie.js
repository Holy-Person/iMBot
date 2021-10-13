var fs = require("fs");

module.exports = {
  method: function (message, _Bot, _args) {
    // const variants = ['oomfie', 'coomfie', 'comfie'];
    // better than trying a bunch of variants like above
    if (message.content.toLowerCase().includes("mfie")) {
      if (Math.floor(Math.random() * 50) == 0) {
        const gif = gifs[Math.floor(Math.random() * gifs.length)];
      } else {
        if (Math.floor(Math.random() * 20) == 0) {
          // 1 in 20 chance of replying with "coomfie" instead
          return message.channel.send("so true coomfie");
        }
        return message.channel.send("so true oomfie");
      }
    }
  },
};

const gifs = [
  `https://c.tenor.com/XpKARJ26mTgAAAAM/go-off-oomfie-oomf.gif`,
  `https://c.tenor.com/_Z8zq93TFgsAAAAM/oomfie-klee.gif`,
  `https://c.tenor.com/JkJ3FdFni1QAAAAM/oomfie-israel.gif`,
  `https://c.tenor.com/Nph0-ZXUXwwAAAAM/i-have-your-ip-adress-oomfie.gif`,
  `https://c.tenor.com/Z3FcD6KCEHUAAAAM/klee-genshin-impact.gif`,
  `https://c.tenor.com/ldmMqcGCD98AAAAM/oomf-oomfie.gif`,
  `https://c.tenor.com/rSQOvnaCExkAAAAM/klee-genshin.gif`,
  `https://c.tenor.com/ItY2In2vVGAAAAAM/go-oomfie-go-oomfie.gif`,
  `https://c.tenor.com/X2tzhGU8AdYAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/D11TsxJk6uQAAAAM/oomfie-oomf.gif`,
  `https://c.tenor.com/DflffDc1gK0AAAAM/oomfie-oomfie-fertile.gif`,
  `https://c.tenor.com/-q_I2c2klC4AAAAM/can-i-get-cute-tummy-pics-oomfie-oomfie.gif`,
  `https://c.tenor.com/DyPo-X3fQVsAAAAM/wake-up-wake.gif`,
  `https://c.tenor.com/IQp2arVyFjQAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/E_LNiC3V4zkAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/Y0-zXjk2vX0AAAAM/im-not-going-im-not-going-back-to-rehab.gif`,
  `https://c.tenor.com/LHzr5im3cS0AAAAM/oomfie-oomfie-dead.gif`,
  `https://c.tenor.com/YIUhpD1IfzcAAAAM/klee-oomfie.gif`,
  `https://c.tenor.com/x1F_9gJEb9MAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/IKsF31O0Dd4AAAAM/oomfie-based.gif`,
  `https://c.tenor.com/gGINwTQVzjkAAAAM/klee-klee-oomfie.gif`,
  `https://c.tenor.com/cXo8uxCSqXsAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/TmnHXbZPz0wAAAAM/weezer-oomfie.gif`,
  `https://c.tenor.com/tKpSNp4-_JQAAAAM/klee-genshin-impact.gif`,
  `https://c.tenor.com/ukVoGXW0c5gAAAAM/oomfie-klee.gif`,
  `https://c.tenor.com/6Jtc6xS5UnoAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/mvBraUAqcPkAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/-DZqOM4doo0AAAAM/klee-genshin.gif`,
  `https://c.tenor.com/PEaVKE4b6r4AAAAM/pt-cruiser-klee.gif`,
  `https://c.tenor.com/_pYfR1aqC3oAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/aXM5jslgf64AAAAM/oomfie-revisionism.gif`,
  `https://c.tenor.com/XKwfY_aqKzgAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/SI_YpGNCfuQAAAAM/blocked-twitter.gif`,
  `https://c.tenor.com/8AqEoEwc4BIAAAAM/oomfie-bladee-oomfie.gif`,
  `https://c.tenor.com/4v7yNa8Qx6UAAAAM/you-are-spitting-oomfie-oomfie.gif`,
  `https://c.tenor.com/Y7A7qcZczgYAAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/j6Ok8z-W-TkAAAAM/oomfie-denial.gif`,
  `https://c.tenor.com/7PyJAoxjX7gAAAAM/oomfie-oomfie-meetup.gif`,
  `https://c.tenor.com/3jIuvMH3G24AAAAM/klee-oomfie.gif`,
  `https://c.tenor.com/vyVoc65OT78AAAAM/oomfie-twitter.gif`,
  `https://c.tenor.com/N6ODZLyq2_AAAAAM/oomfie-blasting.gif`,
  `https://c.tenor.com/qagp755lYBgAAAAM/dont-care-oomfie.gif`,
  `https://c.tenor.com/COSzrstrthMAAAAM/couldnt-find-who-asked-oomfie.gif`,
  `https://c.tenor.com/RMrheqjeZVQAAAAM/aired-oomfie-aired.gif`,
  `https://c.tenor.com/Z15qFIIFLOgAAAAM/klee-klee-genshin.gif`,
  `https://c.tenor.com/LRVUjLBIV-cAAAAM/deleuze-klee.gif`,
  `https://c.tenor.com/zMzBNomP2GwAAAAM/oomfie-gamer.gif`,
  `https://c.tenor.com/r4w36r9-q88AAAAM/whip-and-nae-nae-whip.gif`,
  `https://c.tenor.com/6OYU5FVVucYAAAAM/oomfie-high.gif`,
];
