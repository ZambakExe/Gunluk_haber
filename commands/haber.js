const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../config.json');

module.exports = {
  name: 'haber',
  description: 'Güncel haberleri gösterir',
  async execute(message, args) {
    const apiKey = config.newsApiKey;
    const categories = {
      spor: 'spor',
      genel: 'genel',
      teknoloji: 'teknoloji',
      sağlık: 'sağlık',
      bilim: 'bilim',
      eğlence: 'eğlence',
      iş: 'iş',
    };

    // Eğer kategori belirtilmediyse varsayılan kategori genel olacak
    const category = args[0] ? categories[args[0].toLowerCase()] : 'genel';

    if (!category) {
      message.channel.send('Geçersiz bir kategori girdiniz. Lütfen şu kategorilerden birini kullanın: spor, genel, teknoloji, sağlık, bilim, eğlence, iş.');
      return;
    }

    try {
      const url = `https://newsapi.org/v2/everything?q=${category}&language=tr&apiKey=${apiKey}&pageSize=5`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.articles.length === 0) {
        message.channel.send('Bu kategoriye ait haber bulunamadı.');
        return;
      }

      const embed = new EmbedBuilder()
        .setColor('#ff9900')
        .setTitle(`${category.toUpperCase()} Kategorisi Haberleri`)
        .setDescription('En son haberler:');

      data.articles.forEach((article, index) => {
        embed.addFields(
          {
            name: `${index + 1}. ${article.title} - ${article.source.name}`,
            value: `[Haberi Oku](${article.url})`
          }
        );
      });

      embed.setFooter({
        text: `Kaynak: NewsAPI • ${new Date().toLocaleString()}`,
        iconURL: 'https://newsapi.org/images/n-logo-border.png' // Buraya logonuzun URL'sini ekleyin
      });

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error('NewsAPI hatası:', error);
      message.channel.send('Haberleri getirirken bir hata oluştu.');
    }
  }
};
