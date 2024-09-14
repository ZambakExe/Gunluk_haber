const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Botun pingini kontrol eder.',
  execute: async (message) => {
    const embed = new EmbedBuilder()
      .setColor('#FF0000') // Başlangıç rengini kırmızı olarak ayarladık.
      .setTitle('Ping Kontrolü')
      .setDescription('Botun pingini ölçüyor...')
      .setTimestamp()
      .setFooter({ text: 'Ping Ölçümü', iconURL: message.client.user.displayAvatarURL() });

    const sent = await message.channel.send({ embeds: [embed] });
    const ping = sent.createdTimestamp - message.createdTimestamp;

    // Ping değerine göre renk ve açıklama ayarlaması yapıyoruz
    const color = ping > 350 ? '#FF0000' : '#00FF00';
    const description = ping > 350 ? `Ping: ${ping} ms\nPing çok yüksek!` : `Ping: ${ping} ms\nPing normal`;

    embed.setDescription(description)
      .setColor(color) // Rengi güncelliyoruz
      .setFooter({ text: 'Ping Ölçümü Tamamlandı', iconURL: message.client.user.displayAvatarURL() });

    sent.edit({ embeds: [embed] });
  }
};
