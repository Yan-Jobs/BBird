const BaseCommand = require("../../base/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class Clear extends BaseCommand {
  constructor() {
    super({
      name: "clear",
      enabled: true
    });
  }
  async run(client, interaction) {
    if (!client.player.getQueue(interaction.guild.id))
      return interaction.reply(`:x: | Aucune musique en cours de lecture !`);
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: ":x: | Tu n'es pas dans un vocal...",
        empheral: true
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: ":x: | Tu n'es pas dans mon vocal..",
        empheral: true
      });
    const queue = client.player.getQueue(interaction.guild.id);
    queue.clear();
    const embed = new MessageEmbed()
      .setAuthor(
        "Demandé par " +
          interaction.user.username +
          "#" +
          interaction.user.discriminator,
        interaction.user.displayAvatarURL()
      )
      .setTitle(":white_check_mark: | La file d'attente a bien été effacée !")
      .setTimestamp()
      .setFooter("Fait avec 💖 par Yan Jobs#0001 pour Sohran")
      .setColor("#feab0b");
    interaction.reply({
      embeds: [embed]
    });
  }
};
