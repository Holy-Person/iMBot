const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("penis").setDescription("Calculate your penis size."),
  async execute(interaction) {
    const seed = parseInt(interaction.member.id.charAt(0));
    const reply = `3${"=".repeat(seed)}D`;
    return interaction.reply(reply);
  }
};
