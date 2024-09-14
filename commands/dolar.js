const axios = require('axios');
const { exchangeRateApiKey } = require('../config.json');

module.exports = {
  name: 'dolar',
  description: 'Güncel Dolar/TL kurunu gösterir.',
  execute: async (message, args) => {
    const url = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`;

    try {
      const response = await axios.get(url);
      const usdToTry = response.data.conversion_rates.TRY;

      // Çubuk grafiği oluşturmak için quickchart.io kullanarak URL oluşturma
      const chartConfig = {
        type: 'bar', // Bar grafiği olarak ayarlandı
        data: {
          labels: ['Anlık Dolar Kuru'], // X ekseni tek bir etiket (anlık kur)
          datasets: [{
            label: 'Dolar/TL',
            data: [usdToTry], // Y ekseninde sadece tek bir dolar kuru değeri
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // Y ekseni sıfırdan başlayacak
            }
          }
        }
      };

      const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;

      const embed = {
        color: 0x0099ff,
        title: 'Güncel Dolar/TL Kuru',
        description: `1 USD = ${usdToTry} TRY`,
        image: {
          url: chartUrl,
        },
        footer: {
          text: 'Döviz kuru bilgileri ExchangeRate API tarafından sağlanmaktadır.',
        },
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Döviz kuru alınırken bir hata oluştu:', error);
      message.channel.send('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  },
};
