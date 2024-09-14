const axios = require('axios');
const { weatherApiKey } = require('../config.json');

module.exports = {
  name: 'havadurumu',
  description: 'Belirtilen konumun hava durumunu gösterir.',
  execute: async (message, args) => {
    const location = args.join(' ');

    if (!location) {
      return message.channel.send('Lütfen bir konum belirtin.');
    }

    try {
      const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: weatherApiKey,
          q: location,
          lang: 'tr',
          format: 'json'
        }
      });

      if (response.data.error) {
        return message.channel.send(`**${location}** için hava durumu bilgisi bulunamadı.`);
      }

      const weatherData = response.data.current;
      const locationName = response.data.location.name;
      const country = response.data.location.country;
      const condition = weatherData.condition.text;
      const temperature = weatherData.temp_c;
      const feelsLike = weatherData.feelslike_c;

      const embed = {
        color: 0xFFFF00,
        title: `${locationName} için Hava Durumu`,
        description: `**${condition}**\nSıcaklık: ${temperature}°C\nHissedilen Sıcaklık: ${feelsLike}°C`,
        footer: {
          text: 'Hava Durumu Bilgisi',
          icon_url: message.client.user.displayAvatarURL()
        }
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Hava durumu alınırken bir hata oluştu:', error);
      message.channel.send('Hava durumu bilgisi alınırken bir hata oluştu, lütfen tekrar deneyin.');
    }
  }
};
