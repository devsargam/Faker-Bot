require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const getCommands = require("../getCommands");
const getEvents = require("../getEvents");

class ExtendedClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    });
    this.commands = new Collection();
    this.loadCommands();
    this.loadEvents();
  }

  loadEvents() {
    getEvents().forEach((event) => {
      this.on(event.name, event.handler);
    });
  }

  loadCommands() {
    getCommands().forEach((command) => {
      this.commands.set(command.data.name, command);
    });
  }
}

module.exports = ExtendedClient;
