const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'yardım',
  description: 'Yardım menüsünü gösterir.',
  execute: (message) => {
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('Yardım Menüsü')
      .setDescription('Kullanabileceğiniz komutlar:')
      .addFields(
        { name: '`!yardım`', value: 'Bu menüyü gösterir' },
        { name: '`!ping`', value: 'Botun pingini kontrol eder' },
        { name: '`!meme <subreddit> <kategori>`', value: 'Rastgele veya belirtilen bir subreddit ve kategoriden (hot, new, top, rising) meme gönderir.' },
        { name: '`!resim`', value: 'Rastgele bir resim gönderir' },
        { name: '`!haber <kategori>`', value: 'Belirtilen kategorideki haberleri gösterir (spor, teknoloji, iş, bilim) Eğer kategori yok diyorsa ingilizcesini yazın.' },
        { name: '`!havaDurumu <konum>`', value: 'Belirtilen konumun hava durumunu gösterir' },
        { name: '`!dolar`', value: 'Güncel Dolar/TL kurunu gösterir.' },
        { name: '`!server`', value: 'Botun kaç sunucuda aktif olduğunu gösterir' }
      )
      .setTimestamp()
      .setFooter({ text: 'Bot Yardım Menüsü', iconURL: message.client.user.displayAvatarURL() });

    message.channel.send({ embeds: [embed] });
  }
};
