export default class Interaction {
  constructor(
    client,
    {
      name = null,
      type = 1,
      description = type ? 1 : 'No description provided' || '',
      options = [],
      defaultMemberPermissions = null,
      enabled = true,
      ownerOnly = false,
      isDeferred = false,
      isEphemeral = false,
    }
  ) {
    this.client = client;
    this.help = {
      name,
      type,
      description,
      options,
    };
    this.configuration = {
      enabled,
      defaultMemberPermissions,
      ownerOnly,
      isDeferred,
      isEphemeral,
    };
  }
}
