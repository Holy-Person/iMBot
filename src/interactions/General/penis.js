import Interaction from '../../base/Interaction.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Penis extends Interaction {
  constructor(client) {
    super(client, {
      name: 'penis',
      description: 'Calculate your penis size.',
      options: [
        {
          type: ApplicationCommandOptionType.Mentionable,
          name: 'user',
          description: 'user',
          required: false,
        },
      ],
      ownerOnly: false,
      isDeferred: false,
      isEphemeral: false,
    });
  }

  async run(interaction) {
    const seed = parseInt((interaction.options.getMentionable('user')?.user.id || interaction.member.id).charAt(0));
    return interaction.reply(`3${'='.repeat(seed)}D`);
  }
}
