const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'server',
  description: 'Botun kaç sunucuda aktif olduğunu gösterir.',
  execute: async (message) => {
    const serverCount = message.client.guilds.cache.size;
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('Sunucu Bilgisi')
      .setDescription(`Şu anda ${serverCount} sunucuda aktifim!`)
      .setTimestamp()
      .setFooter({ text: 'Bot Bilgisi', iconURL: message.client.user.displayAvatarURL() });

    message.channel.send({ embeds: [embed] });
  }
};