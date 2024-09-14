const axios = require('axios');

module.exports = {
  name: 'resim',
  description: 'Rastgele bir resim gönderir.',
  execute: async (message) => {
    try {
      const response = await axios.get('https://picsum.photos/1000/1000', {
        responseType: 'arraybuffer'
      });
      const buffer = Buffer.from(response.data, 'binary');

      message.channel.send({
        files: [{ attachment: buffer, name: 'random.jpg' }]
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      message.channel.send('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  }
};
