const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = config.prefix;

client.once('ready', () => {
  console.log('Bot is ready!');

});

client.on('messageCreate', async (message) => {

  client.user.setActivity('bir film', { type: 'WATCHING' });
  console.log(`${client.user.tag} şu an izliyor modunda!`);

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Komutu çalıştırırken bir hata oluştu.');
  }
});


client.login(config.token);


