const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Rastgele veya belirtilen bir subreddit ve kategoriden (Hot, New, Top, Rising) meme gönderir.',
  execute: async (message, args) => {
    if (args.length < 2) {
      message.channel.send('Lütfen bir subreddit ve kategori (**hot, new, top, rising**) belirtin. Örnek: `!meme dankmemes hot`');
      return;
    }

    const subreddit = args[0];
    const category = args[1].toLowerCase();

    const validCategories = ['hot', 'new', 'top', 'rising'];
    if (!validCategories.includes(category)) {
      message.channel.send('Geçersiz kategori. Lütfen hot, new, top veya rising kategorilerinden birini seçin.');
      return;
    }

    const url = `https://meme-api.com/gimme/${subreddit}`;

    try {
      const response = await axios.get(url);
      const memeUrl = response.data.url;
      const memeTitle = response.data.title;
      const memeSubreddit = response.data.subreddit;

      const getRandomColor = () => {
        return Math.floor(Math.random() * 16777215); // 16777215 (0xFFFFFF) is the maximum value for a 24-bit color
      };

      const embed = {
        color: getRandomColor(),
        title: memeTitle,
        image: {
          url: memeUrl,
        },
        footer: {
          text: `Kaynak: ${memeSubreddit}`,
          icon_url: message.client.user.displayAvatarURL(),
        },
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Meme alınırken bir hata oluştu:', error);
      message.channel.send('Bir hata oluştu, lütfen tekrar deneyin. Belki de subreddit veya kategori bulunamadı.');
    }
  },
};